import {
  orderableDocumentListDeskItem,
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { MdOutlineLabel } from 'react-icons/md'

const deckTag = {
  title: 'Deck tags',
  name: 'deckTag',
  type: 'document',
  icon: MdOutlineLabel,
  __experimental_search: [],
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
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    orderRankField({ type: 'deckTag' }),
  ],
  ordering: [orderRankOrdering],
  preview: {
    select: { name: 'name', slug: 'slug.current' },
    prepare({ name, slug }) {
      return { title: name, subtitle: slug }
    },
  },
}

export default deckTag

export const deckTagOrder = (S, context) =>
  orderableDocumentListDeskItem({
    type: 'deckTag',
    title: 'Deck tag order',
    S,
    context,
  })
