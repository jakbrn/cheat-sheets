'use client'

import { Button } from '../ui/button'
import { Mail } from 'lucide-react'
import { Lesson, Sheet } from '@/payload-types'

export default function SendMail({ sheet }: { sheet: Sheet & { lesson: Lesson } }) {
  return (
    <a
      href={`mailto:krzysztof@technischools.com?subject=%C5%9Aci%C4%85ga%20technologiczna%20-%20${sheet.lesson.name}&body=Poni%C5%BCej%20link%20oraz%20kod%20%C5%BAr%C3%B3d%C5%82owy%20%C5%9Bci%C4%85gi%20na%20sprawdzian%20z%20${sheet.lesson.inMail}%0D%0A%0D%0ALink%3A%20https%3A%2F%2Fsciaga.chub.pl%2Fsheets%2F${sheet.lesson.id}%0D%0AKod%20%C5%BAr%C3%B3d%C5%82owy%3A%20https%3A%2F%2Fgithub.com%2Fboxiercarpet%2Ftechni-cheat-sheets%0D%0A`}
    >
      <Button variant="outline" size="icon">
        <Mail size={20} />
      </Button>
    </a>
  )
}
