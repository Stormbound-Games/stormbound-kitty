import PageDynamic from '~/components/PageDynamic'
import getPage from '~/api/pages/getPage'
import getPages from '~/api/pages/getPages'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  const pages = await getPages()
  const paths = pages.map(page => ({ params: { slug: page.slug } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const page = await getPage({ slug: params.slug, isPreview })

  if (!page) {
    return { notFound: true }
  }

  return { props: { ...page, settings } }
}

export default PageDynamic
