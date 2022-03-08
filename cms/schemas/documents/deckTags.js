import { MdOutlineLabel } from 'react-icons/md'

const deckTags = {
  title: 'Deck tags',
  name: 'deckTag',
  type: 'document',
  icon: MdOutlineLabel,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: { name: 'name', slug: 'slug.current' },
    prepare({ name, slug }) {
      return { title: name, subtitle: slug }
    },
  },
}

export default deckTags
