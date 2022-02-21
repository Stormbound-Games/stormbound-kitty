import member from './types/member'
import date from './types/date'

const tournament = {
  title: 'Tournament',
  name: 'tournament',
  type: 'document',
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
    {
      title: 'Hosts',
      name: 'hosts',
      type: 'array',
      of: [member],
      validation: Rule => Rule.required(),
    },
    {
      title: 'Podium',
      name: 'podium',
      type: 'array',
      of: [
        {
          title: 'Team',
          name: 'team',
          type: 'object',
          fields: [
            {
              title: 'Players',
              name: 'players',
              type: 'array',
              of: [member],
            },
          ],
          validation: Rule => Rule.required(),
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
            {
              title: 'Deck ID',
              name: 'id',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Authors',
              name: 'authors',
              type: 'array',
              of: [{ type: 'string', validation: Rule => Rule.required() }],
            },
          ],
        },
      ],
    },
    date,
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
  ],
}

export default tournament
