import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import CHANGELOG from '~/data/changelog'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), changelog: CHANGELOG } }
}

const CardChangelogPage = props => (
  <Layout
    active={['GAME', 'UPDATES', 'CARD_CHANGELOG']}
    navigation={props.navigation}
  >
    <CardChangelog changelog={props.changelog} />
  </Layout>
)

export default CardChangelogPage
