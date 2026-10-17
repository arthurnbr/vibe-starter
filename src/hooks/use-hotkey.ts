"use client"

import { useEffect, useRef } from "react"

// Keys: "mod+k" (Ctrl/Cmd), "n", or a two-key sequence "g d". Plain keys are ignored while typing in a field.
export function useHotkeys(bindings: Record<string, () => void>) {
  const saved = useRef(bindings)
  useEffect(() => {
    saved.current = bindings
  })

  useEffect(() => {
    let pending = ""
    let timer: number | undefined

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      const mod = event.metaKey || event.ctrlKey
      if (event.altKey || (typing && !mod)) return
      const key = (mod ? "mod+" : "") + event.key.toLowerCase()
      const combo = pending ? `${pending} ${key}` : key
      const handler = saved.current[combo]
      if (handler) {
        event.preventDefault()
        pending = ""
        handler()
        return
      }
      const isPrefix = Object.keys(saved.current).some((c) => c.startsWith(`${combo} `))
      pending = isPrefix ? combo : ""
      clearTimeout(timer)
      if (isPrefix) timer = window.setTimeout(() => (pending = ""), 800)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      clearTimeout(timer)
    }
  }, [])
}
