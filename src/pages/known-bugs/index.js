import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const KnownBugsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'KNOWN_BUGS']}
    navigation={navigation}
    cards={cards}
  >
    <KnownBugs {...props} />
  </Layout>
)

export default KnownBugsPage
