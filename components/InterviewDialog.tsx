'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import InterviewForm from "./InterviewForm"
import { getCurrentUser } from "@/lib/actions/auth.action"
import { useState } from "react"
import { set } from "zod"

export default function InterviewDialog() {
  const [open, setOpen] = useState(false)
  const closeDialoge= () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button variant="outline" className="text-xl p-8" >Create an Interview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader className="">
          <DialogTitle className="text-2xl">Create a personalized interview.</DialogTitle>
        </DialogHeader>
              
        <InterviewForm onSave={closeDialoge} />
              

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}