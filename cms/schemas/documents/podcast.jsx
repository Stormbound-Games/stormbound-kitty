import { MdPodcasts } from 'react-icons/md'
import React from 'react'
import user from '../types/user'
import date from '../types/date'
import { formatDate } from '#helpers/formatDate'

const podcast = {
  title: 'Brewed Sages podcasts',
  name: 'podcast',
  type: 'document',
  icon: MdPodcasts,
  __experimental_search: [],
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
      description:
        'Typically the duration of the episode, such as “45 minutes and 12 seconds”.',
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Hosts',
      name: 'users',
      type: 'array',
      of: [{ ...user, title: 'Host' }],
      validation: Rule => Rule.min(1),
    },
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      description: 'Typically a link to podbean.',
      validation: Rule => Rule.required().uri({ scheme: ['https'] }),
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      validation: Rule => Rule.required().max(250),
    },
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({ title, date }) {
      return {
        title: title || 'Missing title',
        subtitle: formatDate(date) || 'Missing date',
        media: (
          <img
            src='https://cdn.sanity.io/images/5hlpazgd/production/530b731e3badad728e3afef6b7b7bd26cd9acb1a-508x508.png?auto=format&w=70&q=90'
            alt=''
          />
        ),
      }
    },
  },
}

export default podcast
