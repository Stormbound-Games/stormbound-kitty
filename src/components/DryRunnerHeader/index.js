import React from 'react'
import { useFela } from 'react-fela'
import { useAnimation } from 'framer-motion'
import CTA from '../CTA'
import ResetButton from '../ResetButton'
import Mana from '../Mana'
import Row from '../Row'
import Spacing from '../Spacing'
import styles from './styles'

export default React.memo(function DryRunnerHeader(props) {
  const { css } = useFela()
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
    <Spacing bottom='LARGER'>
      <Row desktopOnly>
        <Row.Column width='1/3' align='center'>
          <ResetButton
            label='Reset game'
            confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
            reset={props.resetGame}
          />
        </Row.Column>

        <Row.Column width='1/3' align='center'>
          <span className={css(styles.mana)}>
            Current mana:{' '}
            <Mana
              controls={controls}
              mana={props.mana}
              data-testid='mana-pool'
              disabled={props.hand.every(card => !props.canCardBePlayed(card))}
              extend={{ marginLeft: '1em' }}
            />
          </span>
        </Row.Column>

        <Row.Column width='1/3' align='center'>
          <CTA type='button' data-testid='end-turn-btn' onClick={endTurn}>
            <u>E</u>nd turn
          </CTA>
        </Row.Column>
      </Row>
    </Spacing>
  )
})
