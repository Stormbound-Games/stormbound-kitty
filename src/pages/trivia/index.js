import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getTriviaQuestions from '~/helpers/getTriviaQuestions'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  // Functions cannot be serialized, so they need to be called here.
  const questions = getTriviaQuestions(cards).map(question =>
    typeof question === 'function' ? question() : question
  )

  return { props: { settings, questions } }
}

const TriviaPage = ({ settings, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'TRIVIA']} settings={settings}>
    <Trivia {...props} />
  </Layout>
)

export default TriviaPage
