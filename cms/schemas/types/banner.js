const banner = {
  title: 'Banner',
  name: 'background',
  type: 'image',
  description:
    'A landscape image that will be displayed at the top of the page behind the title (typically 5:1).',
  options: {
    accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  },
  fields: [
    {
      title: 'Banner format',
      name: 'ratio',
      type: 'number',
      description:
        'The ratio in % between the width and the height of the banner area (e.g. 50% means height = width / 2). Defaults to 20%.',
      validation: Rule => Rule.min(20).max(60),
    },
  ],
}

export default banner
