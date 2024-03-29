import React from 'react'
import { MdOutlineCompareArrows, MdOutlineUndo } from 'react-icons/md'
import cardRef from '../types/cardRef'
import date from '../types/date'
import { formatDate } from '#helpers/formatDate'
import capitalize from '#helpers/capitalize'

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
  title: 'Card changes',
  name: 'changelog',
  type: 'document',
  icon: MdOutlineCompareArrows,
  __experimental_search: [],
  fields: [
    cardRef,
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
      description: (
        <>
          The former stats <strong>before</strong> that change was applied.
        </>
      ),
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
    {
      title: 'Card name, Asc',
      name: 'cardNameAsc',
      by: [{ field: 'card->name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      type: 'type',
      date: 'date',
      image: 'card.image.asset.url',
      name: 'card.name',
    },
    prepare({ name, type, date, image }) {
      return {
        title: name || 'Missing card',
        subtitle: [
          formatDate(date) || 'Missing date',
          type ? capitalize(type.toLowerCase()) : '',
        ].join(' · '),
        media: image ? (
          <img src={image + '?auto=format&w=70&q=90'} alt='' />
        ) : null,
      }
    },
  },
}

export default changelog
