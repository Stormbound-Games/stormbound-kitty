import { MdQuestionAnswer } from 'react-icons/md'
import getBlock from '../richText/block'

export const question = {
  title: 'FAQ Question',
  name: 'question',
  type: 'document',
  icon: MdQuestionAnswer,
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
        source: (doc, { parent }) => {
          return (
            parent.question ??
            doc.entries?.find(entry => entry._key === parent._key).question ??
            null
          )
        },
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Answer',
      name: 'answer',
      type: 'array',
      of: [getBlock()],
    },
  ],
}

const faqSection = {
  title: 'FAQ Section',
  name: 'faqSection',
  type: 'document',
  icon: MdQuestionAnswer,
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
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      entries: 'entries',
    },
    prepare({ title, entries = [] }) {
      return {
        title,
        subtitle:
          entries.length + ' question' + (entries.length === 1 ? '' : 's'),
      }
    },
  },
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}

export default faqSection
