import { TaskBatchSheet } from "@/features/tasks/task-batch-sheet"

export default function TaskBatchPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Saisie rapide</h1>
        <p className="text-muted-foreground">Plusieurs tâches d&apos;un coup, enregistrées en une seule transaction.</p>
      </div>
      <TaskBatchSheet />
    </>
  )
}
