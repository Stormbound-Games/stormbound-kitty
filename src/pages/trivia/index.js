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

const TriviaPage = props => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'TRIVIA']}
    navigation={props.navigation}
  >
    <Trivia questions={props.questions} />
  </Layout>
)

export default TriviaPage
