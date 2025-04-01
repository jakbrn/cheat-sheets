import { User } from '@/payload-types'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const response = await fetch('/api/users/me')
      const data = await response.json()
      return data.user
    },
  })
}
