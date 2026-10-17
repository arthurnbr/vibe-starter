import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { subDays } from "date-fns"
import { tasks, TASK_PRIORITIES, TASK_STATUSES } from "./schema"

// Standalone script: does not import ./index (which is server-only).
const db = drizzle(new Database("data/app.db"))

const titles = [
  "Write onboarding guide", "Fix login redirect", "Design pricing page", "Migrate CI to GitHub Actions",
  "Audit accessibility", "Add CSV export", "Refactor billing service", "Set up error tracking",
  "Interview candidates", "Plan Q3 roadmap", "Update dependencies", "Benchmark search API",
]

db.delete(tasks).run()
db.insert(tasks)
  .values(
    titles.map((title, i) => ({
      title,
      status: TASK_STATUSES[i % TASK_STATUSES.length],
      priority: TASK_PRIORITIES[(i * 7) % TASK_PRIORITIES.length],
      estimateHours: (i % 5) + 1,
      createdAt: subDays(new Date(), i * 2),
    })),
  )
  .run()

console.log(`Seeded ${titles.length} tasks`)
