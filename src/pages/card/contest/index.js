import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const seasons = await getSWCCSeasons({ isPreview })

  return {
    props: {
      // The only card data that’s needed on this page are the images (for cards
      // using official images), as well as the ids to index the cards array.
      cards: cards.map(card => ({ id: card.id, image: card.image })),
      navigation,
      seasons,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const CardContestPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'CARD_CONTEST']}
    navigation={navigation}
  >
    <CardBuilderContest {...props} />
  </Layout>
)

export default CardContestPage
