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
      validation: Rule => Rule.required(),
    },
  ],
}

export default news
