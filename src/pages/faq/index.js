import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/api/faq/getFAQ'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      data: await getFAQ({ isPreview }),
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FAQPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} navigation={navigation}>
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
