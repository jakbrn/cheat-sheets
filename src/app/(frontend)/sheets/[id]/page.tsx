import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@payload-config'
import GoBack from '@/components/sheets/go-back'
import SendMail from '@/components/sheets/send-mail'
import { Lesson, Sheet } from '@/payload-types'

export default async function SheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })
  const sheet = (await payload.findByID({
    collection: 'sheets',
    id,
    depth: 2,
  })) as Sheet & { lesson: Lesson }

  return (
    <div className="flex flex-col items-center h-screen py-20">
      <div className="flex flex-col w-[800px] gap-4">
        <div className="font-bold text-3xl uppercase text-center">{sheet.topic}</div>
        <div className="flex justify-between">
          <GoBack />
          <SendMail sheet={sheet} />
        </div>
        <div className="flex flex-col items-center border w-full p-4 rounded-lg text-foreground bg-background">
          <RichText data={sheet.content} />
        </div>
      </div>
    </div>
  )
}
