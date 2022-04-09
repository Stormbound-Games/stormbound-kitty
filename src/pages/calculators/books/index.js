import PageBooksCalculator from '~/components/PageBooksCalculator'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = await getBooks({ isPreview })

  return {
    props: {
      settings,
      books,
      breadcrumbs: ['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR'],
    },
  }
}

export default PageBooksCalculator
