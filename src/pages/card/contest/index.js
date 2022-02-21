import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
      seasons: await getSWCCSeasons(),
    },
  }
}

const CardContestPage = ({ navigation, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'CARD_CONTEST']}
    navigation={navigation}
  >
    <CardBuilderContest {...props} />
  </Layout>
)

export default CardContestPage
