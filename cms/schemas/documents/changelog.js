import React from 'react'
import { MdOutlineCompareArrows, MdOutlineUndo } from 'react-icons/md'
import cardId from '../types/cardId'
import date from '../types/date'
import getRawCardData from '~/helpers/getRawCardData'
import { formatDate } from '~/helpers/formatDate'

const change = {
  title: 'Change',
  name: 'change',
  type: 'object',
  icon: MdOutlineUndo,
  fields: [
    {
      title: 'Stat',
      name: 'stat',
      type: 'string',
      options: { list: ['strength', 'mana', 'ability', 'movement'] },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Previous value',
      name: 'value',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: { stat: 'stat', value: 'value' },
    prepare({ stat, value }) {
      return { title: stat, subtitle: value }
    },
  },
}

const changelog = {
  title: 'Changelog',
  name: 'changelog',
  type: 'document',
  icon: MdOutlineCompareArrows,
  fields: [
    { ...cardId, name: 'id', validation: Rule => Rule.required() },
    {
      ...date,
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: { list: ['BUFF', 'NERF', 'MIXED', 'INFO'] },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Previous stats',
      name: 'from',
      type: 'array',
      of: [change],
      description: 'The former stats *before* that change was applied.',
      validation: Rule =>
        Rule.custom((entry, { document }) => {
          if (document.type === 'INFO') return true
          if (!entry || entry.length === 0) return 'Required'
          const stats = entry.map(({ stat }) => stat)
          if (stats.length > new Set(stats).size) return 'Duplicate stat'
          return true
        }),
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
      id: 'id',
      description: 'description',
      type: 'type',
      date: 'date',
    },
    prepare({ id, description, type, date }) {
      const { name } = getRawCardData(id)

      return {
        title:
          (name || 'Missing card') +
          ' in ' +
          (formatDate(date) || 'missing date') +
          (type ? ` (${type})` : ''),
        subtitle: description,
        media: <MdOutlineCompareArrows />,
      }
    },
  },
}

export default changelog
