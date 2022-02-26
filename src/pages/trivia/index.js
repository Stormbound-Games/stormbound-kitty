import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import QUESTIONS from '~/helpers/getRandomQuestion/questions'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const questions = QUESTIONS.map(question =>
    typeof question === 'function' ? question() : question
  )

  return { props: { cards, navigation, questions } }
}

const TriviaPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'TRIVIA']}
    navigation={navigation}
    cards={cards}
  >
    <Trivia {...props} />
  </Layout>
)

export default TriviaPage
