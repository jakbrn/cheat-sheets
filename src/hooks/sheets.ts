import { Sheet } from '@/payload-types'
import { useQuery } from '@tanstack/react-query'

export function useSheets(lessonId?: string | null) {
  return useQuery({
    queryKey: ['sheets', lessonId],
    enabled: !!lessonId,
    queryFn: async (): Promise<Sheet[]> => {
      const response = await fetch(`/api/sheets?lessonId=${lessonId}`)
      const data = await response.json()
      return data.docs
    },
  })
}

export function useSheet(id: string) {
  return useQuery({
    queryKey: ['sheet', id],
    queryFn: async (): Promise<Sheet> => {
      const response = await fetch(`/api/sheets/${id}`)
      const data = await response.json()
      return data
    },
  })
}
