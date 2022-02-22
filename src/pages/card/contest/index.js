import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      seasons: await getSWCCSeasons({ isPreview }),
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
