import { getEntries } from '~/helpers/sanity'

const FIELDS = `
_createdAt,
intro,
description,
link
`

const getNews = async ({ isPreview } = {}) => {
  const news = await getEntries({
    conditions: ['_type == "news"'],
    fields: FIELDS,
    options: { order: '_createdAt desc', isPreview },
  })

  return news
}

export default getNews
