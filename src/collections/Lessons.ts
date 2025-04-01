import { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nazwa',
      type: 'text',
      required: true,
    },
    {
      name: 'inMail',
      label: 'W mailu',
      type: 'text',
      required: true,
    },
  ],
}
