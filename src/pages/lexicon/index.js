import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'LEXICON']}>
    <Lexicon />
  </Layout>
)
