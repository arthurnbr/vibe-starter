import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { listTasks } from "@/features/tasks/queries"
import { TaskFilters } from "@/features/tasks/task-filters"
import { TaskFormDialog } from "@/features/tasks/task-form-dialog"
import { TaskTable } from "@/features/tasks/task-table"
import { taskFilters } from "@/features/tasks/validation"

export default async function TasksPage({ searchParams }: PageProps<"/tasks">) {
  const params = await searchParams
  const filters = taskFilters.parse(params)
  const tasks = listTasks(filters)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tâches</h1>
        {/* key: remount when the palette/"n" shortcut navigates to ?new=1 so the dialog opens. */}
        <TaskFormDialog key={params.new === "1" ? "new" : "idle"} defaultOpen={params.new === "1"} trigger={<Button><PlusIcon />Nouvelle tâche</Button>} />
      </div>
      <TaskFilters />
      <TaskTable tasks={tasks} />
    </>
  )
}
