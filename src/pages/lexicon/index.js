import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const LexiconPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'LEXICON']}
    navigation={props.navigation}
  >
    <Lexicon />
  </Layout>
)

export default LexiconPage
