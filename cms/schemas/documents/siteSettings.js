import { MdSettings } from 'react-icons/md'
import getBlock from '../richText/block'

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
