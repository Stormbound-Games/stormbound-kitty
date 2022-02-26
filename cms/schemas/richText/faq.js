import React from 'react'
import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { question } from '../documents/faq'

const faq = {
  title: 'FAQ',
  name: 'faq',
  type: 'object',
  icon: MdOutlineQuestionAnswer,
  fields: [
    {
      title: 'Entries',
      name: 'entries',
      type: 'array',
      of: [question],
      validation: Rule => Rule.min(1),
    },
  ],
  preview: {
    select: { entries: 'entries' },
    prepare({ entries = [] }) {
      return {
        title: 'FAQ',
        subtitle:
          entries.length + ' question' + (entries.length === 1 ? '' : 's'),
        extendedPreview: (
          <ul style={{ fontSize: '80%', paddingLeft: '4em', margin: 0 }}>
            {entries.map(entry => (
              <li key={entry.question}>{entry.question}</li>
            ))}
          </ul>
        ),
        media: <MdOutlineQuestionAnswer />,
      }
    },
  },
}

export default faq
