'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { useUser } from '@/hooks/user'
import { Skeleton } from '../ui/skeleton'
import GenerateDialog from './generate-dialog'
import { useState } from 'react'

export default function GenerateButton() {
  const user = useUser()
  const [open, setOpen] = useState(false)

  if (user.isLoading) return <Skeleton className="w-24 h-9" />

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!user.data}>
          <Sparkles />
          Generuj
        </Button>
      </DialogTrigger>
      <GenerateDialog onOpenChange={setOpen} />
    </Dialog>
  )
}
