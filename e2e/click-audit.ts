import { expect, type Page } from "@playwright/test"

// Everything a user would try to click in <main>. Charts included: users click bars.
const CLICKABLE = [
  "main a[href]",
  "main button:not([disabled])",
  "main [role=button]",
  "main [role=link]",
  "main .recharts-bar-rectangle",
  "main .recharts-sector",
  "main [data-clickable]",
].join(", ")

type Outcome = { label: string; effect: string }

/**
 * Clicks every visible clickable element of a page, one by one, on a fresh load, with a real mouse click at its
 * centre right after load, with no prior mouse movement (what a phone tap or a fast user does).
 * Fails if
 *  - a click changes nothing (no navigation, no dialog/menu/popover, no toast, no DOM change): a dead click;
 *  - several *different* elements of the same group (bars of one chart, cards of one row of KPIs) all lead to the
 *    *same* URL: a misrouted click, typical of chart handlers that read "the hovered item" instead of the clicked one.
 * Elements that look interactive (cursor: pointer) but are not controls are reported too (soft).
 */
// Charts render after hydration and re-create their nodes while animating: wait until the controls stop changing.
async function settle(page: Page, path: string) {
  await page.goto(path)
  await page.locator("main h1").waitFor()
  await page.waitForFunction(
    (selector) => {
      const w = window as unknown as { __auditCount?: number; __auditStable?: number }
      const count = document.querySelectorAll(selector).length
      w.__auditStable = count === w.__auditCount ? (w.__auditStable ?? 0) + 1 : 0
      w.__auditCount = count
      return w.__auditStable >= 3
    },
    CLICKABLE,
    { polling: 150 },
  )
}

export async function auditClicks(page: Page, path: string, opts: { skip?: RegExp } = {}) {
  await settle(page, path)
  // One representative per kind: table rows repeat the same controls (edit/delete × N), the first is enough.
  const targets = await page.locator(CLICKABLE).evaluateAll((nodes) => {
    const seen = new Set<string>()
    return nodes.flatMap((n, index) => {
      const r = n.getBoundingClientRect()
      if (!r.width || !r.height) return []
      const label = ((n as HTMLElement).innerText || n.getAttribute("aria-label") || "").trim()
      const kind = n.closest("tbody tr") ? `${n.tagName}|row|${label.replace(/\S+$/, "")}` : `${n.tagName}|${n.getAttribute("href") ?? ""}|${label}|${index}`
      if (seen.has(kind)) return []
      seen.add(kind)
      // Siblings under the same chart / container form a group whose destinations must differ.
      const group = n.closest(".recharts-wrapper") ? `chart:${[...document.querySelectorAll(".recharts-wrapper")].indexOf(n.closest(".recharts-wrapper")!)}` : null
      return [{ index, group, label: (label || n.getAttribute("class") || n.tagName).replace(/\s+/g, " ").slice(0, 60) }]
    })
  })
  const dead: Outcome[] = []
  const ok: Outcome[] = []
  const destinations: Record<string, Outcome[]> = {}

  for (const { index, group, label } of targets) {
    if (opts.skip?.test(label)) continue
    await settle(page, path)
    const el = page.locator(CLICKABLE).nth(index)
    // Already-selected toggles and "current page" links are expected to do nothing.
    const current = await el.evaluate(
      (n) => n.getAttribute("aria-current") || n.getAttribute("aria-pressed") === "true" || n.getAttribute("aria-selected") === "true" || n.getAttribute("data-state") === "on" || n.getAttribute("data-active") === "true",
    )
    if (current) continue
    await el.scrollIntoViewIfNeeded()
    const box = await el.boundingBox()
    if (!box) continue
    const before = { url: page.url(), html: await page.locator("body").innerHTML() }
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(500)
    const overlay = await page.locator("[role=dialog], [role=alertdialog], [role=menu], [role=listbox], [data-sonner-toast]").count()
    const changed = page.url() !== before.url || overlay > 0 || (await page.locator("body").innerHTML()) !== before.html
    const outcome = { label, effect: page.url() !== before.url ? `→ ${new URL(page.url()).pathname}${new URL(page.url()).search}` : overlay ? "overlay" : changed ? "dom" : "NOTHING" }
    ;(changed ? ok : dead).push(outcome)
    if (group && outcome.effect.startsWith("→")) (destinations[group] ??= []).push(outcome)
  }

  const misrouted = Object.values(destinations).filter((items) => items.length > 1 && new Set(items.map((i) => i.effect)).size === 1)

  // Looks clickable but is not reachable as a control (e.g. a card with cursor-pointer and no link).
  await page.goto(path)
  const fake = await page.evaluate((selector) => {
    const real = new Set(document.querySelectorAll(selector))
    return [...document.querySelectorAll("main *")]
      .filter((n) => getComputedStyle(n).cursor === "pointer" && ![...real].some((r) => r === n || r.contains(n) || n.contains(r)))
      .map((n) => (n as HTMLElement).innerText?.trim().slice(0, 60) || n.tagName)
  }, CLICKABLE)

  expect.soft(fake, `looks clickable but is not a control on ${path}`).toEqual([])
  expect(misrouted, `several elements of one chart lead to the same place on ${path}`).toEqual([])
  expect(dead, `dead clicks on ${path} (worked: ${ok.length})`).toEqual([])
  return ok
}
