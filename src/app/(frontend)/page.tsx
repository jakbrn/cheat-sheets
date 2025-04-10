'use client'

import GenerateButton from '@/components/home/generate-button'
import SheetComponent from '@/components/home/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useLessons } from '@/hooks/lessons'
import { useSheets } from '@/hooks/sheets'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center h-screen p-4 md:py-20">
      <div className="flex flex-col w-[800px] max-w-full gap-4">
        <div className="font-bold text-3xl uppercase text-center my-6 md:my-0">Lista ściąg</div>
        <div className="flex justify-between">
          <Suspense>
            <LessonSelect />
          </Suspense>
          <GenerateButton />
        </div>
        <Suspense>
          <SheetsList />
        </Suspense>
      </div>
    </div>
  )
}

function LessonSelect() {
  const router = useRouter()
  const lessons = useLessons()
  const searchParams = useSearchParams()
  const selectedLesson = searchParams.get('lessonId')

  return lessons.data ? (
    <Select
      value={selectedLesson || ''}
      onValueChange={(value) => router.replace(`/?lessonId=${value}`)}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Przedmiot" />
      </SelectTrigger>
      <SelectContent>
        {lessons.data.map((field) => (
          <SelectItem key={field.name} value={field.id}>
            {field.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <Skeleton className="w-[140px] h-9" />
  )
}

function SheetsList() {
  const searchParams = useSearchParams()
  const selectedLesson = searchParams.get('lessonId')
  const sheets = useSheets(selectedLesson)

  if (!selectedLesson)
    return (
      <div className="flex flex-col items-center border w-full p-4 rounded-lg text-foreground bg-background">
        Nie wybrano przedmiotu
      </div>
    )
  if (!sheets.data) return <Skeleton className="w-full h-16" />

  return sheets.data.length == 0 ? (
    <div className="flex flex-col items-center border w-full p-4 rounded-lg text-foreground bg-background">
      Brak ściąg dla tego przedmiotu
    </div>
  ) : (
    sheets.data.map((sheet) => <SheetComponent key={sheet.id} sheet={sheet} />)
  )
}
