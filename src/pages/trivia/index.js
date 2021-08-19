import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import QUESTIONS from '~/helpers/getRandomQuestion/questions'

export async function getStaticProps() {
  return {
    props: {
      questions: QUESTIONS.map(question =>
        typeof question === 'function' ? question() : question
      ),
    },
  }
}

const TriviaPage = props => (
  <Layout active={['COMMUNITY', 'TRIVIA']}>
    <Trivia questions={props.questions} />
  </Layout>
)

export default TriviaPage
