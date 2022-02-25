import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import getGuide from '~/api/guides/getGuide'
import getGuides from '~/api/guides/getGuides'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  const guides = await getGuides()

  return {
    paths: guides.map(guide => ({ params: { slug: guide.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const guide = await getGuide({ slug: params.slug, isPreview })

  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      ...guide,
    },
  }
}

const GuidePage = ({ navigation, content, ...props }) => {
  return (
    <Layout
      active={['GUIDES', props.category, props.id]}
      navigation={navigation}
    >
      <Guide {...props}>
        <BlocksRenderer value={content} />
      </Guide>
    </Layout>
  )
}

export default GuidePage
