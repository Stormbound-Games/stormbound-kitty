import { MdEditNote } from 'react-icons/md'
import React from 'react'
import user from '../types/user'
import date from '../types/date'
import json from '../types/json'
import cardRef from '../types/cardRef'
import getBlock from '../richText/block'
import { STORY_CATEGORIES } from '~/constants/stories'
import { formatDate } from '~/helpers/formatDate'

const story = {
  title: 'Stories',
  name: 'story',
  type: 'document',
  icon: MdEditNote,
  fieldsets: [
    {
      name: 'saga',
      title: 'Saga',
      options: { collapsible: true, collapsed: true },
    },
  ],
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
    { ...user, title: 'Author' },
    { ...cardRef, name: 'cardRef' },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: Object.entries(STORY_CATEGORIES).map(([category, data]) => ({
          title: data.shortName,
          value: category,
        })),
      },
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Content',
      name: 'body',
      type: 'array',
      of: [getBlock({ withHeadings: true, withNotice: true })],
      validation: Rule => Rule.required(),
    },
    {
      title: 'Saga',
      name: 'saga',
      type: 'string',
      fieldset: 'saga',
      options: {
        list: [
          { title: 'Eastern Heat', value: 'eastern-heat' },
          { title: 'March of Fauns', value: 'march-of-fauns' },
        ],
      },
    },
    {
      title: 'Card data',
      name: 'card',
      fieldset: 'saga',
      description:
        'Additional JSON blob to override the card data with (handy for sagas).',
      ...json,
    },
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      author: 'user.name',
      title: 'title',
      date: 'date',
      card: 'card',
      image: 'cardRef.image.asset.url',
    },
    prepare({ author, title, date, image }) {
      return {
        title: title || 'Missing title',
        subtitle:
          'By ' +
          (author || 'missing author') +
          ' in ' +
          (formatDate(date) || 'missing date'),
        media: image ? (
          <img src={image + '?auto=format&w=70&q=90'} alt='' />
        ) : undefined,
      }
    },
  },
}

export default story
