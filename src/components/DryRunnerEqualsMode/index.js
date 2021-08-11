import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '../Checkbox'
import Dialog from '../Dialog'
import styles from './styles'

export default React.memo(function DryRunnerEqualsMode(props) {
  const { css } = useFela()
  const dialogRef = React.useRef()

  return (
    <>
      <Checkbox
        id='equals-mode'
        data-testid='equals-mode'
        extend={styles.container}
        checked={props.equalsMode}
        onChange={event => dialogRef.current.show()}
      >
        Equal levels
        <span className={css(styles.info)}>Set all cards to level 1</span>
      </Checkbox>
      <Dialog
        id='equals-mode-dialog'
        data-testid='equals-mode-dialog'
        title='Equals mode'
        dialogRef={instance => (dialogRef.current = instance)}
        image='/assets/images/cards/execution.png'
        close={() => dialogRef.current.hide()}
        ctaProps={{
          onClick: () => {
            props.setEqualsMode(!props.equalsMode)
            dialogRef.current.hide()
          },
          'data-testid': 'reset-confirm-btn',
          children: 'Reset game',
        }}
      >
        Toggling “Equals” mode will reset the game. Are you sure you want to?
        Don’t worry, you’ll keep your deck.
      </Dialog>
    </>
  )
})
