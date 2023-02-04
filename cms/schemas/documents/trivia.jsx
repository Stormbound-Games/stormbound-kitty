import { MdVideogameAsset } from 'react-icons/md'

const story = {
  title: 'Trivia',
  name: 'trivia',
  type: 'document',
  icon: MdVideogameAsset,
  __experimental_search: [],
  fields: [
    {
      title: 'Question',
      name: 'question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Answer',
      name: 'answer',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Other options',
      name: 'options',
      type: 'array',
      of: [{ type: 'string', validation: Rule => Rule.required() }],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
    },
    prepare({ question, answer }) {
      return {
        title: question || 'Missing question',
        subtitle: answer || 'Missing answer',
      }
    },
  },
}

export default story
