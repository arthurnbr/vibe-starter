"use client"

import { useRouter } from "next/navigation"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { Task } from "@/db/schema"

const config = {
  count: { label: "Tâches", color: "var(--chart-1)" },
  hours: { label: "Heures", color: "var(--chart-3)" },
} satisfies ChartConfig

// Click a bar → drill into the filtered list. Every chart should lead somewhere.
export function StatusChart({ data }: { data: { status: Task["status"]; label: string; count: number; hours: number }[] }) {
  const router = useRouter()
  return (
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart
        data={data}
        accessibilityLayer
        className="cursor-pointer"
        onClick={(state) => {
          const status = data[Number(state?.activeTooltipIndex)]?.status
          if (status) router.push(`/tasks?status=${status}`)
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
