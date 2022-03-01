import { MdAutoFixNormal } from 'react-icons/md'
import user from '../types/user'

const week = {
  title: 'SWCC week',
  name: 'week',
  type: 'object',
  fields: [
    {
      title: 'Week number',
      name: 'id',
      type: 'number',
      validation: Rule => Rule.required().positive().min(1),
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Winner',
      name: 'winner',
      type: 'object',
      fields: [
        user,
        {
          title: 'Card ID',
          name: 'id',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          title: 'Second card ID',
          name: 'id2',
          type: 'string',
        },
      ],
    },
  ],
}

const swcc = {
  title: 'SWCC Season',
  name: 'swcc',
  type: 'document',
  icon: MdAutoFixNormal,
  fields: [
    {
      title: 'Season number',
      name: 'number',
      type: 'number',
      validation: Rule => Rule.required().positive().min(1),
    },
    {
      title: 'Weeks',
      name: 'weeks',
      type: 'array',
      of: [week],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      number: 'number',
    },
    prepare({ number }) {
      return {
        title: number ? 'SWCC season ' + number : 'SWCC season',
      }
    },
  },
}

export default swcc
