import React from 'react'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Page from '~/components/Page'
import Loader from '~/components/Loader'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import capitalize from '~/helpers/capitalize'
import indexArray from '~/helpers/indexArray'
import useLazyLoad from '~/hooks/useLazyLoad'
import useViewportSize from '~/hooks/useViewportSize'

export default React.memo(function FanKitAvatars(props) {
  const { viewportWidth } = useViewportSize()
  const columns = viewportWidth >= 700 ? 8 : 2
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const AVATARS_INDEX = indexArray(props.avatars)
  const activeAvatar = AVATARS_INDEX[active]
  const {
    loading,
    items: displayedItems,
    ref,
  } = useLazyLoad(props.avatars, columns * 2)
  const items = chunk(displayedItems, columns)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Avatars Fan-Kit'
      description='Find all the avatars assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
    >
      <FanKitDownloadDialog
        displayImage={false}
        name={activeAvatar ? activeAvatar.name : undefined}
        image={activeAvatar ? activeAvatar.image : undefined}
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {items.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Row.Column
              width={'1/' + columns}
              key={row[index] ? row[index].id : index}
            >
              {row[index] && (
                <FanKitItem
                  {...row[index]}
                  image={row[index].image}
                  key={row[index].id}
                  setActive={setActive}
                  width={114}
                  height={Math.round(
                    row[index].dimensions.height *
                      (114 / row[index].dimensions.width)
                  )}
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
