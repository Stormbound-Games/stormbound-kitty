import React from 'react'
import { useAnimation } from 'framer-motion'
import Column from '../Column'
import CTA from '../CTA'
import ResetButton from '../ResetButton'
import Mana from '../Mana'
import Row from '../Row'
import './index.css'

export default React.memo(function DryRunnerHeader(props) {
  const controls = useAnimation()
  const endTurn = React.useCallback(() => {
    controls.start({
      scale: [1.4, 1],
      transition: { duration: 1, ease: 'easeOut' },
    })

    props.endTurn()
  }, [controls, props])

  const registerShortcuts = React.useCallback(
    event => {
      if (event.which === 69 /* E */) endTurn()
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
        <Column width='1/3' align='center'>
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

        <Column width='1/3' align='center'>
          <ResetButton
            label='Reset game'
            confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
            reset={props.resetGame}
          />
        </Column>

        <Column width='1/3' align='center'>
          <CTA type='button' data-testid='end-turn-btn' onClick={endTurn}>
            <u>E</u>nd turn
          </CTA>
        </Column>
      </Row>
    </div>
  )
})
