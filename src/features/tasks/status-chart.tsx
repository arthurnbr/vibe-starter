"use client"

import { useRouter } from "next/navigation"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { Task } from "@/db/schema"

const config = {
  count: { label: "Tâches", color: "var(--chart-1)" },
  hours: { label: "Heures", color: "var(--chart-3)" },
} satisfies ChartConfig

// Click a bar → drill into the filtered list. The handler sits on each <Bar>, not on <BarChart>: the chart-level
// onClick reads the *hovered* index, which is empty on touch screens and on a click without prior mouse move.
export function StatusChart({ data }: { data: { status: Task["status"]; label: string; count: number; hours: number }[] }) {
  const router = useRouter()
  const open = (_: unknown, index: number) => router.push(`/tasks?status=${data[index].status}`)
  return (
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} className="cursor-pointer" onClick={open} />
        <Bar dataKey="hours" fill="var(--color-hours)" radius={4} className="cursor-pointer" onClick={open} />
      </BarChart>
    </ChartContainer>
  )
}
