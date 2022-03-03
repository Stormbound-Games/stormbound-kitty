import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import getGuide from '~/api/guides/getGuide'
import getGuides from '~/api/guides/getGuides'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  const guides = await getGuides()

  return {
    paths: guides.map(guide => ({ params: { slug: guide.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const guide = await getGuide({ slug: params.slug, isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { cards, settings, ...guide },
    revalidate: 60 * 60 * 24,
  }
}

const GuidePage = ({ settings, content, cards, ...props }) => (
  <Layout active={['GUIDES', props.category, props.id]} settings={settings}>
    <Guide {...props}>
      <BlocksRenderer value={content} />
    </Guide>
  </Layout>
)

export default GuidePage
