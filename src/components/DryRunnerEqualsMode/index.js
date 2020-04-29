import React from 'react'
import Checkbox from '../Checkbox'
import Dialog from '../Dialog'
import './index.css'

export default React.memo(function DryRunnerEqualsMode(props) {
  const dialogRef = React.useRef()

  return (
    <>
      <Checkbox
        name='equals-mode'
        id='equals-mode'
        data-testid='equals-mode'
        className='DryRunnerEqualsMode'
        checked={props.equalsMode}
        onChange={event => dialogRef.current.show()}
      >
        Equal levels
        <span className='DryRunnerEqualsMode__info'>
          {props.equalsMode
            ? 'Reset the game with cards in current level'
            : 'Reset the game with cards level 1'}
        </span>
      </Checkbox>
      <Dialog
        id='equals-mode-dialog'
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
