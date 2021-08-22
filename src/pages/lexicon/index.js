import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const LexiconPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} navigation={navigation}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
