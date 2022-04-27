import { getEntries } from '~/helpers/sanity'

const FIELDS = `
_createdAt,
intro,
description,
link
`

const getNews = async ({ isPreview, limit } = {}) => {
  const news = await getEntries({
    conditions: ['_type == "news"'],
    fields: FIELDS,
    options: {
      order: '_createdAt desc',
      isPreview,
      slice: limit ? `0...${limit}` : undefined,
    },
  })

  return news
}

export default getNews
