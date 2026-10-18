import Link from "next/link"
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
    return { status, label: statusLabel[status], count: row?.count ?? 0, hours: row?.hours ?? 0 }
  })
  const kpis = [
    { label: "Tâches", value: formatNumber(stats.total), href: "/tasks" },
    { label: "Heures restantes", value: `${formatNumber(stats.openHours)} h`, href: "/tasks?status=open" },
    { label: "Terminées", value: formatNumber(chartData[2].count), href: "/tasks?status=done" },
  ]

  return (
    <>
      <h1 className="text-2xl font-semibold">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="rounded-xl transition-shadow hover:shadow-md">
            <Card>
              <CardHeader>
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">{kpi.value}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Répartition par statut</CardTitle>
          <CardDescription>Cliquer sur une barre ouvre la liste filtrée.</CardDescription>
        </CardHeader>
        <CardContent>
          <StatusChart data={chartData} />
        </CardContent>
      </Card>
    </>
  )
}
