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
  title: 'Story',
  name: 'story',
  type: 'document',
  icon: MdEditNote,
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
    user,
    { ...cardRef, name: 'cardRef' },
    {
      title: 'Card data',
      name: 'card',
      description:
        'Additional JSON blob to override the card data with (handy for sagas).',
      ...json,
    },
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
    {
      title: 'Saga',
      name: 'saga',
      type: 'string',
      options: {
        list: [
          { title: 'Eastern Heat', value: 'eastern-heat' },
          { title: 'March of Fauns', value: 'march-of-fauns' },
        ],
      },
    },
    date,
    {
      title: 'Content',
      name: 'body',
      type: 'array',
      of: [getBlock({ withHeadings: true, withNotice: true })],
      validation: Rule => Rule.required(),
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
      author: 'author',
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
          (author || 'missing member') +
          ' in ' +
          (formatDate(date) || 'missing date'),
        media: image ? (
          <img src={image + '?auto=format&w=70'} alt='' />
        ) : undefined,
      }
    },
  },
}

export default story
