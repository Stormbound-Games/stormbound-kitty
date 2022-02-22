import member from './types/member'
import date from './types/date'

const guide = {
  title: 'Guide',
  name: 'guide',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Identifier',
      name: 'id',
      description:
        'The identifier is used to map this guide’s metadata to the actual content.',
      type: 'string',
      validation: Rule => Rule.required().uppercase(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: { list: ['ESSENTIALS', 'PLAYSTYLE', 'BRAWL_MODE', 'IN_DEPTH'] },
      validation: Rule => Rule.required().uppercase(),
    },
    date,
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    {
      title: 'Faction',
      name: 'faction',
      type: 'string',
      options: {
        list: ['neutral', 'ironclad', 'shadowfen', 'winter', 'swarm'],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Card ID',
      name: 'cardId',
      type: 'string',
      validation: Rule => Rule.required().uppercase(),
    },
    {
      title: 'Banner',
      name: 'background',
      type: 'image',
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Skip navigation',
      name: 'skipNav',
      type: 'boolean',
      description: 'Whether the guide should not appear in the navigation.',
      initialValue: false,
    },
  ],
}

export default guide
