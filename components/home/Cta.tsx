import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to elevate your documentation?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Start building your new documentation site today. It's fast, flexible, and developer-friendly.
        </p>
        <Button asChild size="lg">
          <Link href="/sign-up">Create your docs site</Link>
        </Button>
      </div>
    </section>
  )
}
