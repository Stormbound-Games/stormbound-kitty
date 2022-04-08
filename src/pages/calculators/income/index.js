import IncomeCalculator from '~/components/IncomeCalculator'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = await getBooks({ isPreview })

  return {
    props: {
      settings,
      books,
      breadcrumbs: ['TOOLS', 'CALCULATORS', 'INCOME_CALCULATOR'],
    },
  }
}

export default IncomeCalculator
