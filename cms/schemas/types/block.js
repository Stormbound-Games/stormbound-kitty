import React from 'react'
import link from './link'
import cardLink from './cardLink'

const Sparkly = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

const getBlock = ({ withHeadings = false } = {}) => ({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    withHeadings && { title: 'Heading 2', value: 'h2' },
    withHeadings && { title: 'Heading 3', value: 'h3' },
  ].filter(Boolean),
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Code', value: 'code' },
      {
        title: 'Sparkles',
        value: 'sparkles',
        blockEditor: {
          icon: () => '✨',
          render: Sparkly,
        },
      },
    ],
    annotations: [link, cardLink],
  },
})

export default getBlock
