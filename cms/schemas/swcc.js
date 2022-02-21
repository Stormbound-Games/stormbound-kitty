import member from './types/member'

const week = {
  title: 'SWCC week',
  name: 'week',
  type: 'object',
  fields: [
    {
      title: 'Id',
      name: 'id',
      type: 'number',
      validation: Rule => Rule.required(),
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
        member,
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
  fields: [
    {
      title: 'Number',
      name: 'number',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    { title: 'Weeks', name: 'weeks', type: 'array', of: [week] },
  ],
  preview: {
    select: {
      number: 'number',
    },
    prepare({ number }) {
      return {
        title: 'SWCC season ' + number,
      }
    },
  },
}

export default swcc
