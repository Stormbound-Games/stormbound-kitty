const news = {
  title: 'News',
  name: 'news',
  type: 'document',
  fields: [
    {
      title: 'Intro',
      name: 'intro',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Link',
      name: 'link',
      type: 'string',
      validation: Rule =>
        Rule.required().custom(
          value =>
            value.startsWith('/') || 'Should be a path starting with a slash.'
        ),
    },
  ],
  preview: {
    select: {
      intro: 'intro',
      link: 'link',
    },
    prepare({ intro, link }) {
      return {
        title: intro,
        subtitle: link,
      }
    },
  },
}

export default news
