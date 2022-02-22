import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getNews = async ({ isPreview } = {}) => {
  const news = await getEntries({
    conditions: ['_type == "news"'],
    options: { order: '_createdAt desc', isPreview },
  })

  return news.map(clean)
}

export default getNews
