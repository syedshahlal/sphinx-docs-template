"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Build & Document Your SaaS, Faster.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              A fully-polished, production-ready documentation site that feels like Sphinx, but with modern aesthetics.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/docs/getting-started">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Image
              src="/placeholder.svg?width=600&height=400"
              alt="SaaS Platform Dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
