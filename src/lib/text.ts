// Search key: lowercase, no accents, single spaces. SQLite lower() ignores "É", so never search with lower(name).
// It is also registered as the SQL function search_key() (src/db/index.ts):
//   like(sql`search_key(${customers.name})`, `%${searchKey(q)}%`)
// Use the same key for uniqueness ("Escabeau 3 PLANS" = "escabeau 3 plans").
export const searchKey = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim()

// French users type "12,5". Use in zod: z.preprocess(frenchNumber, z.number()...), with a text input
// (inputMode="decimal"), never type="number". Not a number → left as is, so zod says "nombre attendu".
export const frenchNumber = (v: unknown) => {
  if (typeof v !== "string" || v.trim() === "") return v
  const n = Number(v.replace(/\s/g, "").replace(",", "."))
  return Number.isNaN(n) ? v : n
}
