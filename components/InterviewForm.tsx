'use client'
import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateQuestion } from '@/lib/server.action';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { toast } from 'sonner';





const Max_size = 5 * 1024 * 1024; // 5mb

const interviewSchema = z.object({
    file: z.instanceof(File, { message: "Input a proper file" })
        .refine(file => file.size <= Max_size, { message: "File size should be less than 5mb" })
        .refine(file => file.type === "application/pdf", { message: "Only pdf is allowed" }),
    role : z.string().min(3, {message: "Minimum 3 charaters are required"}),
    type: z.enum(["Technical", "Behavioral", "Mixed"]),
    amount: z.number()
        .min(1, "At least 1 question.")
        .max(8, "Maximum 8 questions allowed."),
    level: z.enum(["easy", "medium", "hard"]),
})

type InterviewFormData = z.infer<typeof interviewSchema>;




const InterviewForm = ({onSave} : { onSave : () => void}) => {
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<InterviewFormData>({
        resolver: zodResolver(interviewSchema),
        defaultValues: {
        type: "Technical",
        role: "",
        amount: 5,
        level: "medium",
        }, 
    })
  
  const onSubmit = async (values: InterviewFormData) => {
        const user = await getCurrentUser()
        const { file, role, type, level, amount } = values;
        let resume = ""
        const formdata = new FormData();
        formdata.append("FILE", file);
        try {
            const response = await fetch("/api/parse", {
                method: "POST",
                body: formdata,
            });
            if (!response.ok) {
              throw new Error("Failed to upload file");
              toast.error("Failed to parse the Resume")
            }
          resume = await response.text()
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type,role,  level , amount, resume, user}),
            });
            if (!response.ok) {
                throw new Error("Failed to upload file");
                  toast.error("Failed to Create an Interview")
            }
        } catch (error) {
            console.log(error);
    }
    console.log(user)
        onSave();
        toast.success("Interview Created Successfully");
    };

  return (
    <div className="max-w-lg mx-auto p-6  rounded-2xl shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Resume Upload */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setFile(file);
                      // @ts-ignore
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder="Technical" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Questions */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={8}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Difficulty */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Start Interview 🚀
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default InterviewForm


