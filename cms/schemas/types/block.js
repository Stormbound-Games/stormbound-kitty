import link from './link'
import cardLink from './cardLink'

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
    ],
    annotations: [link, cardLink],
  },
})

export default getBlock
