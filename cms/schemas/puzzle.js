import member from './types/member'
import date from './types/date'

const puzzle = {
  title: 'Puzzle',
  name: 'puzzle',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Lethal', value: 'LETHAL' },
          { title: 'Survive', value: 'SURVIVE' },
          { title: 'Baselock', value: 'BASELOCK' },
          { title: 'Board clear', value: 'BOARDCLEAR' },
          { title: 'VIP', value: 'VIP' },
          { title: 'Target', value: 'TARGET' },
        ],
      },
    },
    {
      title: 'Difficulty',
      name: 'difficulty',
      type: 'number',
      validation: Rule => Rule.required(),
      options: { list: [1, 2, 3] },
    },
    member,
    {
      title: 'Board ID',
      name: 'board',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Restrictions',
      name: 'restrictions',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Level 1', value: 'LEVEL_1' },
              { title: 'Level 5', value: 'LEVEL_5' },
              { title: 'Friendly RNG', value: 'RNG_FRIENDLY' },
              { title: 'Anti RNG', value: 'ANTI_RNG' },
              { title: 'Preset', value: 'PRESET' },
              { title: 'Detailed', value: 'DETAILED' },
              { title: 'Faction', value: 'FACTION' },
              { title: 'Custom Board', value: 'CUSTOM_BOARD' },
            ],
          },
        },
      ],
    },
    date,
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: Rule => Rule.required(),
    },
  ],
}

export default puzzle
