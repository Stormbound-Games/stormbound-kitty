import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import QUESTIONS from '~/helpers/getRandomQuestion/questions'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
      questions: QUESTIONS.map(question =>
        typeof question === 'function' ? question() : question
      ),
    },
  }
}

const TriviaPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'TRIVIA']} navigation={navigation}>
    <Trivia {...props} />
  </Layout>
)

export default TriviaPage
