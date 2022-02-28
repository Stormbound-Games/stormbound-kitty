import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const LexiconPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} navigation={navigation}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
