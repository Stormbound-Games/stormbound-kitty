import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const LexiconPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'LEXICON']}
    navigation={navigation}
    cards={cards}
  >
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
