// Form identity for idempotent submits. crypto.randomUUID() only exists in secure contexts (HTTPS or localhost):
// opened by LAN or Tailscale IP over HTTP it is undefined and the page crashes. getRandomValues works everywhere.
export function newRequestId(): string {
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40 // RFC 4122 version 4
  b[8] = (b[8] & 0x3f) | 0x80 // variant
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("")
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}
