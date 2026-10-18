"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="font-heading text-3xl font-semibold">Quelque chose a échoué</h1>
      <p className="text-muted-foreground">Rien n&apos;a été perdu. Réessayez ; si le problème persiste, rechargez la page.</p>
      <Button onClick={reset}>Réessayer</Button>
    </div>
  )
}
