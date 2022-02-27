import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  // Functions cannot be serialized, so they need to be called here.
  const questions = getTriviaQuestions(cards).map(question =>
    typeof question === 'function' ? question() : question
  )

  return { props: { cards, navigation, questions } }
}

const TriviaPage = ({ navigation, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'TRIVIA']} navigation={navigation}>
    <Trivia {...props} />
  </Layout>
)

export default TriviaPage
