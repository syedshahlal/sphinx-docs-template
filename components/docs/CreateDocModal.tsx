"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

interface CreateDocModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CreateDocModal({ isOpen, setIsOpen }: CreateDocModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Document created successfully!")
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DialogContent className="sm:max-w-[425px]">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <DialogHeader>
                  <DialogTitle>Create new document</DialogTitle>
                  <DialogDescription>Choose a name and location for your new document.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" defaultValue="New Document" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="getting-started">Getting Started</SelectItem>
                        <SelectItem value="api-reference">API Reference</SelectItem>
                        <SelectItem value="guides">Guides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>
                    Create Document
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
