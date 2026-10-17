import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TASK_STATUSES } from "@/db/schema"
import { statusLabel } from "@/features/tasks/labels"
import { getTaskStats } from "@/features/tasks/queries"
import { StatusChart } from "@/features/tasks/status-chart"
import { formatNumber } from "@/lib/format"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const stats = getTaskStats()
  const chartData = TASK_STATUSES.map((status) => {
    const row = stats.byStatus.find((r) => r.status === status)
    return { label: statusLabel[status], count: row?.count ?? 0, hours: row?.hours ?? 0 }
  })
  const kpis = [
    { label: "Tâches", value: formatNumber(stats.total) },
    { label: "Heures restantes", value: `${formatNumber(stats.openHours)} h` },
    { label: "Terminées", value: formatNumber(chartData[2].count) },
  ]

  return (
    <>
      <h1 className="text-2xl font-semibold">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Répartition par statut</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusChart data={chartData} />
        </CardContent>
      </Card>
    </>
  )
}
