import React from 'react'
import member from './types/member'
import date from './types/date'
import formatDate from './helpers/formatDate'

const podcast = {
  title: 'Podcast episode',
  name: 'podcast',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Meta',
      name: 'meta',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Hosts',
      name: 'hosts',
      type: 'array',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      description: 'Typically a link to podbean.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      validation: Rule => Rule.required().max(250),
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({ title, date }) {
      return {
        title: title,
        subtitle: formatDate(date),
        media: (
          <img
            src='https://stormbound-kitty.com/assets/images/cards/brewed_sages.png'
            alt=''
          />
        ),
      }
    },
  },
}

export default podcast
