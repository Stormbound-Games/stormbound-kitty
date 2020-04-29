import React from 'react'
import Dialog from '../Dialog'

export default React.memo(function DryRunnerBrawlModifiers(props) {
  const dialogRef = React.useRef()
  const modifierRef = React.useRef()

  return (
    <>
      <label htmlFor='modifier'>Reset with modifier</label>
      <select
        name='modifier'
        id='modifier'
        data-testid='brawl-modifier'
        className='DryRunnerBrawlModifiers'
        value={props.modifier}
        onChange={event => {
          modifierRef.current = event.target.value
          dialogRef.current.show()
        }}
      >
        <option value='0'>None</option>
        <option value='1'>Structures = 2 mana</option>
        <option value='2'>Toads = 2 mana</option>
        <option value='3'>Knights -2 mana</option>
        <option value='4'>Dwarves -2 mana</option>
        <option value='5'>Spells -2 mana</option>
      </select>
      <Dialog
        id='brawl-modifiers-dialog'
        title='Brawl mode'
        dialogRef={instance => (dialogRef.current = instance)}
        image='/assets/images/cards/execution.png'
        close={() => dialogRef.current.hide()}
        ctaProps={{
          onClick: () => {
            props.setModifier(modifierRef.current)
            dialogRef.current.hide()
          },
          'data-testid': 'reset-confirm-btn',
          children: 'Reset game',
        }}
      >
        Changing the Brawl Modifier will reset the game. Are you sure you want
        to? Don’t worry, you’ll keep your deck.
      </Dialog>
    </>
  )
})
