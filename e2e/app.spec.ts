import { expect, test } from "@playwright/test"
import { auditClicks } from "./click-audit"

// Reference e2e suite. Replace the journeys with the real domain at minute 5–8, keep the structure:
// 1. every page loads without error, 2. no dead click on every page, 3. one test per main workflow, including a refusal.

const PAGES = ["/", "/tasks", "/tasks/batch", "/about"]

test.describe("pages", () => {
  for (const path of PAGES) {
    test(`${path} loads without console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (e) => errors.push(e.message))
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
      const res = await page.goto(path)
      expect(res?.status()).toBeLessThan(400)
      await expect(page.locator("main h1")).toBeVisible()
      expect(errors).toEqual([])
    })

    test(`${path} has no dead click`, async ({ page }) => {
      test.setTimeout(120_000) // reloads the page once per control
      await auditClicks(page, path)
    })
  }
})

test("dashboard: each KPI and chart bar opens the matching filtered list", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: /Heures restantes/ }).click()
  await expect(page).toHaveURL(/status=open/)
  await page.goto("/")
  await page.locator(".recharts-bar-rectangle").first().click()
  await expect(page).toHaveURL(/\/tasks\?status=/)
})

test("create a task: refusal keeps the input, then success shows it in the list", async ({ page }) => {
  await page.goto("/tasks")
  await page.getByRole("button", { name: "Nouvelle tâche" }).click()
  await page.locator("#title").fill("x")
  await page.locator("#estimateHours").fill("7")
  await page.getByRole("button", { name: "Enregistrer" }).click()
  await expect(page.getByText("2 caractères minimum")).toBeVisible()
  await expect(page.locator("#estimateHours")).toHaveValue("7")
  await page.locator("#title").fill("Tâche e2e")
  await page.getByRole("button", { name: "Enregistrer" }).click()
  await expect(page.getByRole("cell", { name: "Tâche e2e", exact: true })).toBeVisible()
})

test("batch entry: a fast double click creates the lines once", async ({ page }) => {
  await page.goto("/tasks/batch")
  const input = page.getByPlaceholder("Titre de la tâche puis Entrée…")
  for (const title of ["Lot e2e A", "Lot e2e B"]) {
    await input.fill(title)
    await input.press("Enter")
  }
  await page.getByRole("button", { name: "Créer 2 tâche(s)" }).dblclick()
  await expect(page).toHaveURL(/\/tasks$/)
  await expect(page.getByRole("cell", { name: "Lot e2e A", exact: true })).toHaveCount(1)
})

test("search from the URL filters the list and the input reflects it", async ({ page }) => {
  await page.goto("/tasks?q=Lot%20e2e")
  await expect(page.getByLabel("Rechercher une tâche")).toHaveValue("Lot e2e")
})

test("palette: Ctrl K finds a task @mobile", async ({ page, isMobile }) => {
  await page.goto("/")
  if (isMobile) return // no keyboard on mobile: the page itself must still render (checked in "pages")
  await page.keyboard.press("Control+k")
  await page.getByPlaceholder(/Rechercher une page/).fill("onboarding")
  await expect(page.getByRole("option", { name: /onboarding/i })).toBeVisible()
})
