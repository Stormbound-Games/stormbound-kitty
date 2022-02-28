import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/api/faq/getFAQ'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const data = await getFAQ({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, data, navigation },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FAQPage = ({ navigation, cards, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} navigation={navigation}>
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
