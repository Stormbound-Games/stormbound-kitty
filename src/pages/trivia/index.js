import PageTrivia from '~/components/PageTrivia'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getTriviaQuestions from '~/helpers/getTriviaQuestions'
import getBrawls from '~/api/brawls/getBrawls'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = (await getBooks({ isPreview })).map(book => ({
    name: book.name,
  }))
  const brawls = (await getBrawls({ isPreview })).map(brawl => ({
    name: brawl.name,
  }))
  // Functions cannot be serialized, so they need to be called here.
  const questions = getTriviaQuestions(settings.cards, brawls, books).map(
    question => (typeof question === 'function' ? question() : question)
  )

  return {
    props: {
      settings,
      questions,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'TRIVIA'],
    },
  }
}

export default PageTrivia
