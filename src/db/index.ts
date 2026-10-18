import "server-only"
import { mkdirSync } from "node:fs"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { searchKey } from "@/lib/text"
import * as schema from "./schema"

mkdirSync("data", { recursive: true })
const sqlite = new Database("data/app.db")
sqlite.pragma("journal_mode = WAL")
sqlite.pragma("foreign_keys = ON")
// Accent- and case-insensitive search in SQL: like(sql`search_key(${t.name})`, `%${searchKey(q)}%`).
sqlite.function("search_key", { deterministic: true }, (s) => (typeof s === "string" ? searchKey(s) : s))

export const db = drizzle(sqlite, { schema })
