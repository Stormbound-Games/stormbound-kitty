import React from 'react'
import FanKitDownloadDialog from '~/components/FanKitDownloadDialog'
import FanKitItem from '~/components/FanKitItem'
import Page from '~/components/Page'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import indexArray from '~/helpers/indexArray'

const DESKTOP_WIDTH = 550
const MOBILE_WIDTH = 350

const resolveAsset = (wallpaper, index) => {
  const width = wallpaper.device === 'DESKTOP' ? DESKTOP_WIDTH : MOBILE_WIDTH
  const { dimensions } = wallpaper.image.asset.metadata

  return {
    name: `Stormbound ${wallpaper.device.toLowerCase()} wallpaper ${index + 1}`,
    id: wallpaper.device + '_WALLPAPER_' + index,
    image: wallpaper.image.asset.url,
    aspectRatio: dimensions.aspectRatio,
    width: width,
    height: Math.round(dimensions.height * (width / dimensions.width)),
    withoutWebp: true,
    query: '?auto=format&w=' + width,
  }
}

export default React.memo(function FanKitWallpapers(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const desktopWallpapers = props.wallpapers
    .filter(wp => wp.device === 'DESKTOP')
    .map(resolveAsset)
  const mobileWallpapers = props.wallpapers
    .filter(wp => wp.device === 'MOBILE')
    .map(resolveAsset)
  const WALLPAPERS_INDEX = indexArray([
    ...desktopWallpapers,
    ...mobileWallpapers,
  ])
  const activeWallpaper = WALLPAPERS_INDEX[active]

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Wallpapers'
      description='Find all the wallpapers from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
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

      {chunk(desktopWallpapers, 2).map(row => (
        <Row isDesktopOnly key={row.map(wp => wp.id).join('+')}>
          <Row.Column>
            {row[0] && (
              <FanKitItem
                {...row[0]}
                image={row[0].image + row[0].query}
                setActive={setActive}
              />
            )}
          </Row.Column>
          <Row.Column>
            {row[1] && (
              <FanKitItem
                {...row[1]}
                image={row[1].image + row[1].query}
                setActive={setActive}
              />
            )}
          </Row.Column>
        </Row>
      ))}

      {chunk(mobileWallpapers, 3).map(row => (
        <Row isDesktopOnly key={row.map(wp => wp.id).join('+')}>
          <Row.Column width='1/3'>
            {row[0] && (
              <FanKitItem
                {...row[0]}
                image={row[0].image + row[0].query}
                setActive={setActive}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[1] && (
              <FanKitItem
                {...row[1]}
                image={row[1].image + row[1].query}
                setActive={setActive}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[2] && (
              <FanKitItem
                {...row[2]}
                image={row[2].image + row[2].query}
                setActive={setActive}
              />
            )}
          </Row.Column>
        </Row>
      ))}
    </Page>
  )
})
