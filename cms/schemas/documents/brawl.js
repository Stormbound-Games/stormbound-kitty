import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import cardRef from '../types/cardRef'

const brawl = {
  title: 'Brawl',
  name: 'brawl',
  type: 'document',
  icon: MdOutlineLocalFireDepartment,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Identifier',
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required().uppercase(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'id' },
      validation: Rule => Rule.required(),
    },
    cardRef,
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
  ],
}

export default brawl
