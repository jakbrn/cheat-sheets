import { Sheet } from '@/payload-types'
import { Notebook, Pen, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { useUser } from '@/hooks/user'

export default function SheetComponent({ sheet }: { sheet: Sheet }) {
  const user = useUser()

  return (
    <div className="flex items-center border w-full pr-3 gap-4 rounded-lg text-foreground bg-background">
      <Link href={`/sheets/${sheet.id}`} className="flex-1 w-0 flex gap-4 items-center pl-6 py-4">
        <Notebook size={18} />
        <div className="flex-1 w-0">{sheet.topic}</div>
      </Link>
      {user.data && (
        <div className="flex">
          <Link href={`/sheets/${sheet.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pen />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś pewien?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ta operacja jest nieodwracalna i usunie ściąge z bazy danych.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction>Kontynuuj</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
