import React from 'react'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Page from '~/components/Page'
import Loader from '~/components/Loader'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import indexArray from '~/helpers/indexArray'
import useLazyLoad from '~/hooks/useLazyLoad'

export default React.memo(function PageFanKitBooks(props) {
  const columns = 4
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const index = indexArray(props.books)
  const activeBook = index[active]
  const {
    loading,
    items: displayedItems,
    ref,
  } = useLazyLoad(props.books, columns * 2)
  const items = chunk(displayedItems, columns)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Books Fan-Kit'
      description='Find all the books assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
    >
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
        <Row isDesktopOnly key={rowIndex}>
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
                  width={280}
                  height={300}
                  lazy
                />
              )}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />
    </Page>
  )
})
