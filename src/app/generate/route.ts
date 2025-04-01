import config from '@payload-config'
import { getPayload } from 'payload'
import OpenAI from 'openai'
import { headers as nextHeaders } from 'next/headers'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

export const POST = async (req: Request) => {
  const { lessonId, topic, additional } = await req.json()
  const payload = await getPayload({ config })
  const headers = await nextHeaders()
  const auth = await payload.auth({ headers })

  if (!auth.permissions.collections?.sheets.create) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = new OpenAI()

  const data = await client.responses.create({
    model: 'gpt-4o-mini',
    input:
      'Wygeneruj jednostronną ściąge na temat: ' +
      topic +
      (additional.length > 0
        ? ` Dodatkowo, uwzględnij następujące informacje: ${additional}.`
        : '') +
      ' Sformatuj tekst w markdownie oraz nie dodawaj żadnych komentarzy ani nagłówka tematu.',
  })

  const content = JSON.parse(
    JSON.stringify(
      convertMarkdownToLexical({
        editorConfig: await editorConfigFactory.default({
          config: payload.config,
        }),
        markdown: `${data.output_text}`,
      }),
    ),
  )

  const sheet = await payload.create({
    collection: 'sheets',
    data: {
      content,
      topic: topic,
      lesson: lessonId,
    },
  })

  return Response.json(sheet)
}
