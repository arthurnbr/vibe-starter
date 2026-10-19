import "server-only"
import { mkdirSync } from "node:fs"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { searchKey } from "@/lib/text"
import * as schema from "./schema"

mkdirSync("data", { recursive: true })
// DB_FILE lets `npm run invariants` point the real write code at a throwaway copy, never at the demo database.
const sqlite = new Database(process.env.DB_FILE ?? "data/app.db")
sqlite.pragma("journal_mode = WAL")
sqlite.pragma("foreign_keys = ON")
// Accent- and case-insensitive search in SQL: like(sql`search_key(${t.name})`, `%${searchKey(q)}%`).
sqlite.function("search_key", { deterministic: true }, (s) => (typeof s === "string" ? searchKey(s) : s))

export const db = drizzle(sqlite, { schema })
