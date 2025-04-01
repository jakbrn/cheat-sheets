import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Sheets: CollectionConfig = {
  slug: 'sheets',
  admin: {
    useAsTitle: 'topic',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topic',
      label: 'Temat',
      type: 'text',
      required: true,
    },
    {
      name: 'lesson',
      label: 'Lekcja',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'content',
      label: 'Treść',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },
  ],
}
