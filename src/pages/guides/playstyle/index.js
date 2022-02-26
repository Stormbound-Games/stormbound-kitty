import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'
import { CATEGORIES } from '~/constants/guides'
import getGuidesFromCategory from '~/api/guides/getGuidesFromCategory'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'PLAYSTYLE'
  const cards = CARDS
  const category = { ...CATEGORIES[name], id: name }
  const guides = await getGuidesFromCategory({ category: name, isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, category, guides, navigation },
  }
}

const GuidesPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GUIDES', props.category.id]}
    navigation={navigation}
    cards={cards}
  >
    <Guides {...props} />
  </Layout>
)

export default GuidesPage
