import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import getGuide from '~/api/guides/getGuide'
import getGuides from '~/api/guides/getGuides'
import getNavigation from '~/helpers/getNavigation'
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
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, navigation, ...guide },
    revalidate: 60 * 60 * 24,
  }
}

const GuidePage = ({ navigation, content, cards, ...props }) => (
  <Layout active={['GUIDES', props.category, props.id]} navigation={navigation}>
    <Guide {...props}>
      <BlocksRenderer value={content} />
    </Guide>
  </Layout>
)

export default GuidePage
