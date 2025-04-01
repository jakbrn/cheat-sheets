import { Lesson } from '@/payload-types'
import { useQuery } from '@tanstack/react-query'

export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async (): Promise<Lesson[]> => {
      const response = await fetch('/api/lessons')
      const data = await response.json()
      return data.docs
    },
  })
}
