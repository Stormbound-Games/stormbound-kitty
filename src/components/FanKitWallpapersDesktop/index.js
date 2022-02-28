import React from 'react'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Loader from '~/components/Loader'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import indexArray from '~/helpers/indexArray'
import useLazyLoad from '~/hooks/useLazyLoad'

const resolveAsset = (wallpaper, index) => {
  const { dimensions } = wallpaper.image.asset.metadata

  return {
    name: `Stormbound desktop wallpaper ${index + 1}`,
    id: 'DESKTOP_WALLPAPER_' + index,
    image: wallpaper.image.asset.url,
    aspectRatio: dimensions.aspectRatio,
    width: 1200,
    height: Math.round(dimensions.height * (1200 / dimensions.width)),
    withoutWebp: true,
  }
}

export default React.memo(function FanKitWallpapers(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const desktopWallpapers = props.wallpapers.map(resolveAsset)
  const WALLPAPERS_INDEX = indexArray(desktopWallpapers)
  const activeWallpaper = WALLPAPERS_INDEX[active]
  const { loading, items, ref } = useLazyLoad(desktopWallpapers, 1)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Desktop Wallpapers'
      description='Find all the desktop wallpapers from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
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
      {items.map(item => (
        <Spacing bottom='BASE' key={item.id}>
          <FanKitItem {...item} setActive={setActive} />
        </Spacing>
      ))}

      {loading && <Loader />}
      <div ref={ref} />
    </Page>
  )
})
