import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const seasons = await getSWCCSeasons({ isPreview })

  return {
    props: { cards, navigation, seasons },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const CardContestPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'CARD_CONTEST']}
    navigation={navigation}
    cards={cards}
  >
    <CardBuilderContest {...props} />
  </Layout>
)

export default CardContestPage
