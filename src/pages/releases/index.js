import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import getReleases from '~/api/releases/getReleases'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const releases = await getReleases({ isPreview })
  const cardIds = releases.map(release => release.cardId)

  return {
    props: {
      cards: cards.filter(card => cardIds.includes(card.id)),
      navigation,
      releases,
    },
  }
}

const ReleasesPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'RELEASES']} navigation={navigation}>
    <Releases {...props} />
  </Layout>
)

export default ReleasesPage
