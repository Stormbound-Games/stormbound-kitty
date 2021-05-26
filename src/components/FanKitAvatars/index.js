import React from 'react'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import HeaderBanner from '../HeaderBanner'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import indexArray from '../../helpers/indexArray'
import useLazyLoad from '../../hooks/useLazyLoad'
import useViewportSize from '../../hooks/useViewportSize'

const AVATARS = [
  'F12',
  'F15',
  'I2',
  'I25',
  'N12',
  'N14',
  'N27',
  'N30',
  'N33',
  'N42',
  'N48',
  'N55',
  'N58',
  'N59',
  'N66',
  'N69',
  'N77',
  'N80',
  'S1',
  'S16',
  'S5',
  'W23',
  'aqua_robot',
  'draconic_humanoid',
  'elder',
  'dog_pilot',
  'gold_flower',
  'human',
  'icicle_flower',
  'kitty',
  'knight',
  'pirate',
  'pirate_parrot',
  'punk_rodent',
  'purple_flower',
  'queen_of_hearts',
  'red_beard',
  'rose',
]

const avatars = AVATARS.map(avatar => ({
  name:
    getRawCardData(avatar)?.name ??
    avatar.split(/_/g).map(capitalise).join(' '),
  id: avatar,
  image: '/assets/images/avatars/' + avatar + '.png',
}))

const AVATARS_INDEX = indexArray(avatars)

export default React.memo(function FanKitAvatars(props) {
  const { viewportWidth } = useViewportSize()
  const columns = viewportWidth >= 700 ? 8 : 2
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeAvatar = AVATARS_INDEX[active]
  const { loading, items: displayedItems, ref } = useLazyLoad(
    avatars,
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
      <HeaderBanner title='Avatars Fan-Kit' />

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
        <Row wideGutter={viewportWidth >= 700} key={rowIndex}>
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
                  withAvif={false}
                  withoutWebp={true}
                />
              )}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Avatars – Fan-Kit'
        description='Find all the avatars assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      />
    </>
  )
})
