import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const LexiconPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} navigation={navigation}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
