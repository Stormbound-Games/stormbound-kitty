import cardLink from './richText/cardLink'
import link from './richText/link'

const question = {
  title: 'FAQ Question',
  name: 'question',
  type: 'document',
  fields: [
    {
      title: 'Question',
      name: 'question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'id',
      type: 'slug',
      options: {
        source: (doc, { parent }) =>
          doc.entries.find(entry => entry._key === parent._key).question,
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Answer',
      name: 'answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [link, cardLink],
          },
        },
      ],
    },
  ],
}

const faqSection = {
  title: 'FAQ Section',
  name: 'faqSection',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'id',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Entries',
      name: 'entries',
      type: 'array',
      of: [question],
      validation: Rule => Rule.min(1),
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      validation: Rule => Rule.min(0).integer().positive(),
    },
  ],
}

export default faqSection
