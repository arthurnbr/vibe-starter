// Search key: lowercase, no accents, single spaces. SQLite lower() ignores "É", so never search with lower(name).
// It is also registered as the SQL function search_key() (src/db/index.ts):
//   like(sql`search_key(${customers.name})`, `%${searchKey(q)}%`)
// Use the same key for uniqueness ("Escabeau 3 PLANS" = "escabeau 3 plans").
// Ligatures do not decompose with NFD: "Bœuf" must match "boeuf".
const LIGATURES: Record<string, string> = { œ: "oe", Œ: "oe", æ: "ae", Æ: "ae", ß: "ss" }
export const searchKey = (s: string) =>
  s.replace(/[œŒæÆß]/g, (c) => LIGATURES[c]).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim()

// French users type "12,5". Use in zod: z.preprocess(frenchNumber, z.number()...), with a text input
// (inputMode="decimal"), never type="number". Not a number → left as is, so zod says "nombre attendu".
export const frenchNumber = (v: unknown) => {
  if (typeof v !== "string" || v.trim() === "") return v
  const n = Number(v.replace(/\s/g, "").replace(",", "."))
  return Number.isNaN(n) ? v : n
}
