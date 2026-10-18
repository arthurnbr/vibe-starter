import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="font-heading text-3xl font-semibold">Page introuvable</h1>
      <p className="text-muted-foreground">Ce lien ne mène nulle part, ou l&apos;élément a été supprimé.</p>
      <Button asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  )
}
