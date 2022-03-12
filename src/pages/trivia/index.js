import React from 'react'
import Trivia from '~/components/Trivia'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getTriviaQuestions from '~/helpers/getTriviaQuestions'
import getBrawls from '~/api/brawls/getBrawls'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const brawls = (await getBrawls({ isPreview })).map(brawl => ({
    name: brawl.name,
  }))
  // Functions cannot be serialized, so they need to be called here.
  const questions = getTriviaQuestions(settings.cards, brawls).map(question =>
    typeof question === 'function' ? question() : question
  )

  return { props: { settings, questions } }
}

const TriviaPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'TRIVIA']} settings={settings}>
    <Trivia {...props} />
  </Layout>
)

export default TriviaPage
