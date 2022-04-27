import Home from '~/components/Home'
import getNews from '~/api/news/getNews'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const news = await getNews({ isPreview, limit: 7 })

  return { props: { news, settings, breadcrumbs: ['HOME', 'HOME', 'NEWS'] } }
}

export default Home
