import member from './types/member'
import json from './types/json'

const story = {
  title: 'Story',
  name: 'story',
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
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    member,
    {
      title: 'Card ID',
      name: 'cardId',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Lore', value: 'lore' },
          { title: 'Neutral', value: 'neutral' },
          { title: 'Ironclad', value: 'ironclad' },
          { title: 'Swarm', value: 'swarm' },
          { title: 'Winter', value: 'winter' },
          { title: 'Shadowfen', value: 'shadowfen' },
          { title: 'Eastern Heat', value: 'eastern-heat' },
          { title: 'March of Fauns', value: 'march-of-fauns' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Saga',
      name: 'saga',
      type: 'string',
    },
    {
      title: 'Card data',
      name: 'card',
      ...json,
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: { dateFormat: 'MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'text',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      author: 'author',
      title: 'title',
      date: 'date',
    },
    prepare({ author, title, date }) {
      const formatter = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
      })
      const parts = formatter.formatToParts(new Date(date))
      const month = parts[0].value
      const year = parts[2].value

      return {
        title: title,
        subtitle: 'By ' + author + ' in ' + month + ' ' + year,
      }
    },
  },
}

export default story
