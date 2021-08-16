import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'

const TriviaPage = () => (
  <Layout active={['COMMUNITY', 'TRIVIA']}>
    <Trivia />
  </Layout>
)

export default TriviaPage
