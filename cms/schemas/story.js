import React from 'react'
import member from './types/member'
import date from './types/date'
import json from './types/json'
import cardId from './types/cardId'
import formatDate from './helpers/formatDate'
import cards from '../../src/data/cards.json'

const getCardData = id => cards.find(card => card.id === id)

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
    cardId,
    {
      title: 'Card data',
      name: 'card',
      description: 'Additional JSON blob to override the card data with.',
      ...json,
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
      name: 'content',
      type: 'text',
      description:
        'Wrapping text with asterisks (*) will emphasize it, and triple dashes (---) will render horizontal separators.',
      validation: Rule => Rule.required(),
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
      const card = getCardData(cardId)

      return {
        title: title,
        subtitle: 'By ' + author + ' in ' + formatDate(date),
        media: card ? (
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
