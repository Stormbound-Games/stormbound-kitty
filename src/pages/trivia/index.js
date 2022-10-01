import PageTrivia from '#components/PageTrivia'
import getSiteSettings from '#api/misc/getSiteSettings'
import getQuestions from '#api/trivia/getQuestions'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const questions = await getQuestions({ isPreview, cards: settings.cards })

  return {
    props: {
      settings,
      questions,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'TRIVIA'],
    },
  }
}

export default PageTrivia
