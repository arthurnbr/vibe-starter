import { format } from "date-fns"
import { PencilIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Task } from "@/db/schema"
import { DeleteTaskButton } from "./delete-task-button"
import { priorityLabel, statusLabel } from "./labels"
import { TaskFormDialog } from "./task-form-dialog"

export function TaskTable({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0)
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>Aucune tâche</EmptyTitle>
          <EmptyDescription>Modifiez les filtres ou créez une tâche.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Priorité</TableHead>
            <TableHead className="text-right">Estimation</TableHead>
            <TableHead>Créée le</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell><Badge variant="outline">{statusLabel[task.status]}</Badge></TableCell>
              <TableCell>
                <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>{priorityLabel[task.priority]}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{task.estimateHours} h</TableCell>
              <TableCell className="text-muted-foreground">{format(task.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-right">
                <TaskFormDialog
                  task={task}
                  trigger={<Button variant="ghost" size="icon" aria-label={`Modifier ${task.title}`}><PencilIcon /></Button>}
                />
                <DeleteTaskButton id={task.id} title={task.title} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
