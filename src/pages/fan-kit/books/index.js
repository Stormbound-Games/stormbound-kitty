import PageFanKitBooks from '~/components/PageFanKitBooks'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = await getBooks({ isPreview })

  return {
    props: {
      settings,
      books: books.map(book => ({
        id: book.id,
        name: book.name,
        image: book.image,
      })),
      breadcrumbs: ['GAME', 'INFORMATION', 'FAN_KIT'],
    },
  }
}

export default PageFanKitBooks
