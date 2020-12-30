import React from 'react'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import HeaderBanner from '../HeaderBanner'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Row from '../Row'
import { BOOKS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import chunk from '../../helpers/chunk'
import indexArray from '../../helpers/indexArray'
import useLazyLoad from '../../hooks/useLazyLoad'

const books = [...Object.keys(BOOKS), 'ELDER'].map(book => ({
  name: capitalise(book.toLowerCase()) + ' book',
  id: book,
  image: '/assets/images/books/book-' + book.toLowerCase() + '.png',
}))

const BOOKS_INDEX = indexArray(books)

export default React.memo(function FanKitBooks(props) {
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeBook = BOOKS_INDEX[active]
  const { loading, items: displayedItems, ref } = useLazyLoad(
    books,
    columns * 2
  )
  const items = chunk(displayedItems, columns)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <>
      <HeaderBanner title='Books Fan-Kit' />

      <FanKitDownloadDialog
        displayImage={false}
        name={activeBook ? activeBook.name : undefined}
        image={activeBook ? activeBook.image : undefined}
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {items.map((row, rowIndex) => (
        <Row desktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Row.Column
              width={'1/' + columns}
              key={row[index] ? row[index].id : index}
            >
              {row[index] && (
                <FanKitItem
                  {...row[index]}
                  key={row[index].id}
                  setActive={setActive}
                  width='300px'
                  height='300px'
                  withAvif
                />
              )}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Books – Fan-Kit'
        description='Find all the books assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      />
    </>
  )
})
