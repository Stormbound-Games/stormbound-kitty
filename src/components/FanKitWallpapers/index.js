import React from 'react'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import useLazyLoad from '../../hooks/useLazyLoad'

const wallpapers = [1, 2, 3, 4, 5, 6, 7].map(index => ({
  name: 'Stormbound Wallpaper ' + index,
  id: 'WALLPAPER_' + index,
  image: '/assets/images/wallpapers/wallpaper-' + index + '.png',
}))

export default React.memo(function FanKitBooks(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeWallpaper = wallpapers.find(wallpaper => wallpaper.id === active)
  const { loading, items, ref } = useLazyLoad(wallpapers, 1)

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <>
      <h1 className='VisuallyHidden'>Fan-kit — Wallpapers</h1>

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
        <FanKitItem
          {...item}
          key={item.id}
          setActive={setActive}
          width='1200px'
        />
      ))}

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Wallpapers — Fan-Kit'
        description='Find all the wallpapers from Stormbound used on Stormbound-Kitty, courtesy of Paladin Studios and Sheepyard'
      />
    </>
  )
})
