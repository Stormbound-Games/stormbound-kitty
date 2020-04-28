import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import DryRunnerResetDialog from '../DryRunnerResetDialog'
import Mana from '../Mana'
import Row from '../Row'
import { useAnimation } from 'framer-motion'
import './index.css'

export default React.memo(function DryRunnerHeader(props) {
  const controls = useAnimation()
  const E_KEY = 69

  const endTurn = React.useCallback(() => {
    controls.start({
      scale: [1.4, 1],

      transition: { duration: 1, ease: 'easeOut' },
    })

    props.endTurn()
  }, [controls, props])

  const registerShortcuts = React.useCallback(
    event => {
      if (event.which === E_KEY) {
        endTurn()
      }
    },
    [endTurn]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', registerShortcuts)

    return () => document.removeEventListener('keydown', registerShortcuts)
  }, [registerShortcuts])

  return (
    <div className='DryRunnerHeader'>
      <Row desktopOnly>
        <Column width='1/3' style={{ alignItems: 'center' }}>
          <span className='DryRunnerHeader__mana'>
            Current mana:{' '}
            <Mana
              controls={controls}
              mana={props.mana}
              data-testid='mana-pool'
              disabled={props.hand.every(
                cardId => !props.canCardBePlayed(cardId)
              )}
            />
          </span>
        </Column>

        <Column width='1/3' style={{ alignItems: 'center' }}>
          <DryRunnerResetDialog
            reset={props.resetGame}
            equalsMode={props.equalsMode}
            setEqualsMode={props.setEqualsMode}
          />
        </Column>

        <Column width='1/3' style={{ alignItems: 'center' }}>
          <CTA type='button' data-testid='end-turn-btn' onClick={endTurn}>
            <u>E</u>nd turn
          </CTA>
        </Column>
      </Row>
    </div>
  )
})
