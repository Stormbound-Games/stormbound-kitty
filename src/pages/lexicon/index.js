import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'

const LexiconPage = () => (
  <Layout active={['GAME', 'LEXICON']}>
    <Lexicon />
  </Layout>
)

export default LexiconPage
