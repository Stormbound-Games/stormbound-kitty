import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
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
    },
  }
}

const FanKitBooksPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKitBooks {...props} />
  </Layout>
)

export default FanKitBooksPage
