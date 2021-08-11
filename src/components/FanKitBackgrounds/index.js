import React from 'react'
import FanKitDownloadDialog from '../FanKitDownloadDialog'
import FanKitItem from '../FanKitItem'
import Page from '../Page'
import Row from '../Row'
import capitalise from '../../helpers/capitalise'
import chunk from '../../helpers/chunk'
import indexArray from '../../helpers/indexArray'

const resolveAsset = idPrefix => (background, index) => ({
  name: background.split(/_/g).map(capitalise).join(' '),
  id: idPrefix + '_BACKGROUND_' + index,
  image: '/assets/images/backgrounds/lite/' + background + '.png',
})

const desktopBackgrounds = [
  'ironclad',
  'ironclad_2',
  'ironclad_3',
  'ironclad_4',
  'shadowfen',
  'shadowfen_2',
  'shadowfen_3',
  'shadowfen_4',
  'dragon',
  'dragon_2',
  'dragon_3',
  'dragon_4',
  'feline',
  'feline_2',
  'feline_3',
  'feline_4',
  'neutral',
  'neutral_2',
  'neutral_3',
  'neutral_4',
  'pirate',
  'pirate_2',
  'pirate_3',
  'pirate_4',
  'swarm',
  'swarm_2',
  'swarm_3',
  'swarm_4',
  'winter',
  'winter_2',
  'winter_2b',
  'winter_3',
  'winter_3b',
  'winter_4',
  'winter_4b',
].map(resolveAsset('DESKTOP'))

const BACKGROUNDS_INDEX = indexArray(desktopBackgrounds)

export default React.memo(function FanKitBackgrounds(props) {
  const dialogRef = React.useRef(null)
  const [active, setActive] = React.useState(null)
  const activeBackground = BACKGROUNDS_INDEX[active]

  React.useEffect(() => {
    if (dialogRef.current) {
      if (active) dialogRef.current.show()
      else dialogRef.current.hide()
    }
  }, [active])

  return (
    <Page
      title='Background Fan-Kit'
      description='Find all the backgrounds from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
    >
      <FanKitDownloadDialog
        displayImage={false}
        name={activeBackground ? activeBackground.name : undefined}
        image={
          activeBackground
            ? activeBackground.image.replace('/lite/', '/full/')
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

      {chunk(desktopBackgrounds, 2).map((row, index) => (
        <Row desktopOnly key={index}>
          <Row.Column>
            {row[0] && (
              <FanKitItem {...row[0]} setActive={setActive} withAvif />
            )}
          </Row.Column>
          <Row.Column>
            {row[1] && (
              <FanKitItem {...row[1]} setActive={setActive} withAvif />
            )}
          </Row.Column>
        </Row>
      ))}
    </Page>
  )
})
