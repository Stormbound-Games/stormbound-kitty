import { MdAutoAwesome } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import deckId from '../types/deckId'
import { formatDate } from '~/helpers/formatDate'

const tournament = {
  title: 'Tournaments',
  name: 'tournament',
  type: 'document',
  icon: MdAutoAwesome,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Tournament', value: 'TOURNAMENT' },
          { title: 'Joust', value: 'JOUST' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Hosts',
      name: 'users',
      type: 'array',
      of: [{ ...user, title: 'Host' }],
      validation: Rule => Rule.required(),
    },
    {
      title: 'Podium',
      name: 'podium',
      description:
        'The gold, silver and bronze places respectively (either individuals or teams).',
      type: 'array',
      of: [
        {
          title: 'Team',
          name: 'team',
          type: 'object',
          fields: [
            {
              title: 'Players',
              name: 'team',
              type: 'array',
              of: [{ ...user, title: 'Player' }],
            },
          ],
          validation: Rule => Rule.required(),
          preview: {
            select: {
              player1: 'team.0.name',
              player2: 'team.2.name',
              player3: 'team.3.name',
              player4: 'team.4.name',
            },
            prepare({ player1, player2, player3, player4 }) {
              return {
                title: [player1, player2, player3, player4]
                  .filter(Boolean)
                  .join(', '),
              }
            },
          },
        },
      ],
      validation: Rule => Rule.required().min(1).max(3),
    },
    {
      title: 'Decks',
      name: 'decks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { ...deckId, name: 'id' },
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
          ],
          preview: {
            select: {
              name: 'name',
              id: 'id',
            },
            prepare({ name, id }) {
              return {
                title: name || 'Unnamed deck',
                subtitle: id || 'Missing id',
              }
            },
          },
        },
      ],
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
      name: 'name',
      date: 'date',
    },
    prepare({ name, date }) {
      return {
        title: name || 'Missing name',
        subtitle: formatDate(date) || 'Missing date',
      }
    },
  },
}

export default tournament
