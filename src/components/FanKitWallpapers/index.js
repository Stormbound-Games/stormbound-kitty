import React from 'react'
import Column from '../Column'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import indexArray from '../../helpers/indexArray'

const resolveAsset = idPrefix => (wallpaper, index) => ({
  name: `Stormbound ${idPrefix.toLowerCase()} wallpaper ${index + 1}`,
  id: idPrefix + '_WALLPAPER_' + index,
  image: '/assets/images/wallpapers/lite/' + wallpaper + '.png',
})

const desktopWallpapers = Array.from(
  { length: 7 },
  (_, i) => 'wp-d-' + (i + 1)
).map(resolveAsset('DESKTOP'))
const mobileWallpapers = Array.from(
  { length: 8 },
  (_, i) => 'wp-m-' + (i + 1)
).map(resolveAsset('MOBILE'))

const WALLPAPERS_INDEX = indexArray([...desktopWallpapers, ...mobileWallpapers])

export default React.memo(function FanKitBooks(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeWallpaper = WALLPAPERS_INDEX[active]

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <>
      <HeaderBanner title='Wallpapers' />

      <FanKitDownloadDialog
        displayImage={false}
        name={activeWallpaper ? activeWallpaper.name : undefined}
        image={
          activeWallpaper
            ? activeWallpaper.image.replace('/lite/', '/full/')
            : undefined
        }
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {chunk(desktopWallpapers, 2).map((row, index) => (
        <Row desktopOnly key={index}>
          <Column>
            {row[0] && (
              <FanKitItem {...row[0]} setActive={setActive} withAvif />
            )}
          </Column>
          <Column>
            {row[1] && (
              <FanKitItem {...row[1]} setActive={setActive} withAvif />
            )}
          </Column>
        </Row>
      ))}

      {chunk(mobileWallpapers, 3).map((row, index) => (
        <Row desktopOnly key={index}>
          <Column width='1/3'>
            {row[0] && (
              <FanKitItem {...row[0]} setActive={setActive} withAvif />
            )}
          </Column>
          <Column width='1/3'>
            {row[1] && (
              <FanKitItem {...row[1]} setActive={setActive} withAvif />
            )}
          </Column>
          <Column width='1/3'>
            {row[2] && (
              <FanKitItem {...row[2]} setActive={setActive} withAvif />
            )}
          </Column>
        </Row>
      ))}

      <PageMeta
        title='Wallpapers – Fan-Kit'
        description='Find all the wallpapers from Stormbound used on Stormbound-Kitty, courtesy of Paladin Studios and Sheepyard'
      />
    </>
  )
})
