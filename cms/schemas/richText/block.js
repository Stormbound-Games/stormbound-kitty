import React from 'react'
import cardLink from '../types/cardLink'
import link from '../types/link'

const Sparkly = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

const NoticeRenderer = props => (
  <p
    style={{ fontSize: '120%', borderLeft: '2px solid', paddingLeft: '0.5em' }}
  >
    {props.children}
  </p>
)

const getBlock = ({
  withHeadings = false,
  withNotice = false,
  withLists = true,
  withCardLink = true,
} = {}) => ({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    withHeadings && { title: 'Heading 2', value: 'h2' },
    withHeadings && { title: 'Heading 3', value: 'h3' },
    withNotice && {
      title: 'Notice',
      value: 'notice',
      blockEditor: { render: NoticeRenderer },
    },
  ].filter(Boolean),
  lists: withLists
    ? [
        { title: 'Numbered', value: 'number' },
        { title: 'Ordered', value: 'bullet' },
      ]
    : [],
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
      { title: 'Strike', value: 'strike-through' },
    ],
    annotations: [link, withCardLink ? cardLink : null].filter(Boolean),
  },
})

export default getBlock
