import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import getReleases from '~/api/releases/getReleases'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const releases = await getReleases({ isPreview })

  return { props: { cards, navigation, releases } }
}

const ReleasesPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'UPDATES', 'RELEASES']}
    navigation={navigation}
    cards={cards}
  >
    <Releases {...props} />
  </Layout>
)

export default ReleasesPage
