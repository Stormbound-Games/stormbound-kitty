import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'TRIVIA']}>
    <Trivia />
  </Layout>
)
