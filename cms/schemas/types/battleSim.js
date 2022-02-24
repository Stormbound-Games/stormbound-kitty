import cardLink from './cardLink'
import link from './link'

const battleSimEmbed = {
  title: 'Battle Sim',
  name: 'battleSim',
  type: 'object',
  fields: [
    {
      title: 'Board ID',
      name: 'board',
      type: 'string',
      description:
        'The ID of a battle sim as displayed in the URL (minus the domain name and the path).',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
            annotations: [link, cardLink],
          },
        },
      ],
    },
  ],
}

export default battleSimEmbed
