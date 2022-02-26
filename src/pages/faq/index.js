import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/api/faq/getFAQ'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const data = await getFAQ({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, data, navigation },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FAQPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['HOME', 'HOME', 'FAQ']}
    navigation={navigation}
    cards={cards}
  >
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
