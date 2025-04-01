'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'

export default function GoBack() {
  const router = useRouter()

  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ChevronLeft size={20} />
    </Button>
  )
}
