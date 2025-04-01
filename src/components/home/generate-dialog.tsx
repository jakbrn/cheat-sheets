'use client'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useLessons } from '@/hooks/lessons'
import { Input } from '../ui/input'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const formSchema = z.object({
  lesson: z.string().min(1),
  topic: z.string().min(1),
  additional: z.string(),
})

export default function GenerateDialog({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const lessons = useLessons()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lesson: '',
      topic: '',
      additional: '',
    },
  })

  useEffect(() => {
    if (searchParams.get('lessonId')) {
      form.setValue('lesson', searchParams.get('lessonId') || '')
    }
  }, [searchParams, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onOpenChange(false)

    const toastId = toast('Generowanie ściągi...', {
      duration: Infinity,
    })

    const resp = await fetch('/generate', {
      method: 'POST',
      body: JSON.stringify({
        lessonId: values.lesson,
        topic: values.topic,
        additional: values.additional,
      }),
    })

    if (!resp.ok) {
      toast.dismiss(toastId)
      toast.error('Nie udało się wygenerować ściągi')
      return
    }

    const data = await resp.json()
    toast.dismiss(toastId)
    toast.success('Ściąga została wygenerowana!', {
      action: {
        label: 'Zobacz',
        onClick: () => {
          router.push(`/sheets/${data.id}`)
        },
      },
    })

    queryClient.invalidateQueries({ queryKey: ['sheets', values.lesson] })
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Generowanie ściągi</DialogTitle>
            <DialogDescription>Podaj dane do wygenerowania ściągi</DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="lesson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Przedmiot</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lessons.data?.map((field) => (
                      <SelectItem key={field.name} value={field.id}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temat</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zagadnienia</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none h-52" />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              <Sparkles />
              Generuj
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
