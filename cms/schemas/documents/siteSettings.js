import { MdSettings } from 'react-icons/md'
import getBlock from '../richText/block'

const abbreviation = {
  title: 'Abbreviation',
  name: 'abbreviation',
  type: 'object',
  fields: [
    {
      title: 'Short version',
      name: 'short',
      type: 'string',
      validation: Rule =>
        Rule.required().custom(
          string =>
            !string.includes(' ') || 'Abbreviation cannot contain spaces.'
        ),
    },
    {
      title: 'Long version',
      name: 'long',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: { short: 'short', long: 'long' },
    prepare({ short, long }) {
      return { title: short, subtitle: long }
    },
  },
}

const siteSettings = {
  title: 'Site settings',
  name: 'siteSettings',
  type: 'document',
  icon: MdSettings,
  fields: [
    {
      title: 'Site banner',
      name: 'eyeCatcher',
      description:
        'An informative message displayed at the bottom of the page and remains until manually dismissed.',
      type: 'array',
      of: [getBlock({ withLists: false, withCardLink: false })],
    },
    {
      title: 'Abbreviations',
      name: 'abbreviations',
      type: 'array',
      of: [abbreviation],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
      }
    },
  },
}

export default siteSettings
