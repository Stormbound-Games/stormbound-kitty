import Guide from '~/components/Guide'
import getGuide from '~/api/guides/getGuide'
import getGuides from '~/api/guides/getGuides'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  const guides = await getGuides()

  return {
    paths: guides.map(guide => ({ params: { slug: guide.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const guide = await getGuide({ slug: params.slug, isPreview })

  if (!guide) {
    return { notFound: true }
  }

  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      settings,
      ...guide,
      breadcrumbs: ['GUIDES', guide.category, guide.id],
    },
  }
}

export default Guide
