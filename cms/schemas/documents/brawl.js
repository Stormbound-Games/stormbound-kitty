import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import cardRef from '../types/cardRef'
import isNotAdmin from '~/helpers/isNotAdmin'

// All fields are marked as readonly for non-admins because while the structure
// doesn’t show this type, references to this type can be open in a side-panel.
const brawl = {
  title: 'Brawls',
  name: 'brawl',
  type: 'document',
  icon: MdOutlineLocalFireDepartment,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
      readOnly: isNotAdmin,
    },
    {
      title: 'Identifier',
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required().uppercase(),
      readOnly: isNotAdmin,
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'id' },
      validation: Rule => Rule.required(),
      readOnly: isNotAdmin,
    },
    { ...cardRef, readOnly: isNotAdmin },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: Rule => Rule.required(),
      readOnly: isNotAdmin,
    },
  ],
  preview: {
    select: { description: 'description', name: 'name' },
    prepare({ name, description }) {
      return { title: name, subtitle: description }
    },
  },
}

export default brawl
