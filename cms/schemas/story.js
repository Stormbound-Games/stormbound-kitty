import { MdEditNote } from 'react-icons/md'
import React from 'react'
import member from './types/member'
import date from './types/date'
import json from './types/json'
import cardId from './types/cardId'
import getBlock from './types/block'
import formatDate from './helpers/formatDate'
import getRawCardData from '~/helpers/getRawCardData'
import { STORY_CATEGORIES } from '~/constants/stories'

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
    member,
    cardId,
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
      of: [getBlock({ witHeadings: true })],
      validation: Rule => Rule.required(),
    },
    {
      title: 'Content (legacy)',
      name: 'content',
      type: 'text',
      description:
        'Wrapping text with asterisks (*) will emphasize it, and triple dashes (---) will render horizontal separators.',
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
      cardId: 'cardId',
    },
    prepare({ author, title, date, cardId }) {
      const card = getRawCardData(cardId)

      return {
        title: title || 'Missing title',
        subtitle:
          'By ' +
          (author || 'missing member') +
          ' in ' +
          (formatDate(date) || 'missing date'),
        media: card.image ? (
          <img
            src={
              'https://stormbound-kitty.com/assets/images/cards/' + card.image
            }
            alt=''
          />
        ) : null,
      }
    },
  },
}

export default story
