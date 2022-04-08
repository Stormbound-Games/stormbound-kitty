import React from 'react'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Loader from '~/components/Loader'
import Page from '~/components/Page'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import indexArray from '~/helpers/indexArray'
import useLazyLoad from '~/hooks/useLazyLoad'

const resolveAsset = (wallpaper, index) => {
  const { width, height, aspectRatio } = wallpaper.dimensions

  return {
    name: `Stormbound mobile wallpaper ${index + 1}`,
    id: wallpaper.id,
    image: wallpaper.image,
    aspectRatio: aspectRatio,
    width: 350,
    height: Math.round(height * (350 / width)),
  }
}

export default React.memo(function PageFanKitWallpapersMobile(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const mobileWallpapers = props.wallpapers.map(resolveAsset)
  const WALLPAPERS_INDEX = indexArray(mobileWallpapers)
  const activeWallpaper = WALLPAPERS_INDEX[active]
  const { loading, items, ref } = useLazyLoad(mobileWallpapers, 3)
  const rows = chunk(items, 3)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Mobile Wallpapers'
      description='Find all the mobile wallpapers from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
    >
      <FanKitDownloadDialog
        displayImage={false}
        name={activeWallpaper ? activeWallpaper.name : undefined}
        image={activeWallpaper ? activeWallpaper.image : undefined}
        dialogRef={instance => {
          dialogRef.current = instance

          if (dialogRef.current) {
            dialogRef.current.on('hide', () => setActive(null))
          }
        }}
        close={() => dialogRef.current.hide()}
      />

      {rows.map((row, rowIndex) => (
        <Row isDesktopOnly key={rowIndex}>
          {Array.from({ length: 3 })
            .map((_, index) => row[index])
            .map((item, index) => (
              <Row.Column key={item?.id ?? index} width='1/3'>
                {item && <FanKitItem {...item} setActive={setActive} />}
              </Row.Column>
            ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />
    </Page>
  )
})
