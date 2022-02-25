import React from 'react'
import { MdOutlineToc } from 'react-icons/md'

const tableOfContents = {
  title: 'Table of contents',
  name: 'tableOfContents',
  type: 'object',
  icon: MdOutlineToc,
  fields: [
    {
      title: 'Deep',
      name: 'deep',
      description: 'Whether all heading levels should be displayed.',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    prepare({ deep }) {
      return {
        title: 'Table of Contents',
        subtitle: deep ? 'All headings' : 'Top-level headings only',
        media: <MdOutlineToc />,
      }
    },
  },
}

export default tableOfContents
