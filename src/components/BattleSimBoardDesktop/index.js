import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import BaseHealth from '~/components/BattleSimBaseHealth'
import Cards from '~/components/BattleSimCards'
import CardZoom from '~/components/CardZoom'
import Grid from '~/components/BattleSimGrid'
import PlayerBanner from '~/components/BattleSimPlayerBanner'
import useIsMounted from '~/hooks/useIsMounted'
import styles from './styles'

const POSITIONS = {
  dragon: [
    ['3.25%'],
    ['66.3%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/212113ed8bc22759c6bb9edd1bdf9980c09107b6-3840x2160.png?auto=format&w=1200&q=90',
  ],
  feline: [
    ['2.15%'],
    ['68%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/4c7078106c7ddd3f2c4cb82df0ab565b7de9a319-3840x2160.png?auto=format&w=1200&q=90',
  ],
  ironclad: [
    ['4.8%'],
    ['65%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/526791551e9c04a215e45ca395f4904827f7b5d9-3840x2160.png?auto=format&w=1200&q=90',
  ],
  neutral: [
    ['4.45%'],
    ['66.3%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/91d572092d6a3894ff42ecf110ab8dac7d7ebcb7-3840x2160.png?auto=format&w=1200&q=90',
  ],
  shadowfen: [
    ['4.8%'],
    ['66%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/040737271b6ef070b2b6bf860bf8db83aa72c56f-3840x2160.png?auto=format&w=1200&q=90',
  ],
  swarm: [
    ['5.5%', '-40%'],
    ['67.3%', '-75%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/39d33f182abe88217541a0a3a845ad7cf1210647-3840x2160.png?auto=format&w=1200&q=90',
  ],
  winter: [
    ['5.75%'],
    ['66.3%'],
    'https://cdn.sanity.io/images/5hlpazgd/production/c92f154cc3ef467482f5acb358da2e9edb088dad-3840x2160.png?auto=format&w=1200&q=90',
  ],
}

export default React.memo(function BattleSimBoardDesktop(props) {
  const { css } = useFela()
  const isMounted = useIsMounted()
  const { supportsAvif, supportsWebp } = React.useContext(ImageSupportContext)
  const ext = supportsAvif ? 'avif' : supportsWebp ? 'webp' : 'png'
  const environment = props.environment || 'swarm'
  const [redHealth, blueHealth, background] = POSITIONS[environment]

  return (
    <div
      className={css(styles.root)}
      data-testid='board'
      style={{
        backgroundImage: `url("${background}")`,
        '--red-health-y': redHealth[0],
        '--red-health-x': redHealth[1],
        '--blue-health-y': blueHealth[0],
        '--blue-health-x': blueHealth[1],
      }}
    >
      <div className={css(styles.health({ type: 'RED' }))}>
        <BaseHealth player='RED' health={props.players.RED.health} />
      </div>

      <div className={css(styles.player({ type: 'RED' }))}>
        <PlayerBanner
          player='RED'
          faction={props.players.RED.faction}
          mana={props.mana}
          disabled
        />
      </div>

      {props.zoomed && (
        <CardZoom
          cardId={props.zoomed.id}
          level={props.zoomed.level}
          player={props.zoomed.player}
          close={props.unzoom}
        />
      )}

      <div className={css(styles.grid)}>
        <Grid {...props} />
      </div>

      <div className={css(styles.health({ type: 'BLUE' }))}>
        <BaseHealth player='BLUE' health={props.players.BLUE.health} />
      </div>

      <div className={css(styles.player({ type: 'BLUE' }))}>
        <PlayerBanner
          player='BLUE'
          faction={props.players.BLUE.faction}
          mana={props.mana}
        />
      </div>

      {isMounted && (
        <div className={css(styles.cards)}>
          <Cards
            hand={props.hand}
            cards={props.cards}
            zoom={props.zoom}
            mana={props.mana}
            drawCard={props.drawCard}
            canDrawCard={props.mode !== 'DISPLAY' && props.canDrawCard}
            cycleCard={props.cycleCard}
            canCycleCard={props.mode !== 'DISPLAY' && props.canCycleCard}
          />
        </div>
      )}
    </div>
  )
})
