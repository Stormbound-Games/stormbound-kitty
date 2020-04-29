import React from 'react'
import Dialog from '../Dialog'

export default React.memo(function DryRunnerBrawlModifiers(props) {
  const dialogRef = React.useRef()
  const [modifier, setModifier] = React.useState(props.modifier)

  const modifierHeroImage = {
    NONE: 'execution',
    STRUCTURE_MANA: 'ubass_the_hunter',
    TOAD_MANA: 'tode_the_elevated',
    KNIGHT_MANA: 'edrik_the_fierce',
    DWARF_MANA: 'olf_the_hammer',
    SPELL_MANA: 'archdruid_earyn',
  }

  return (
    <>
      <label htmlFor='brawl-modifier'>Reset with modifier</label>
      <select
        name='brawl-modifier'
        id='brawl-modifier'
        data-testid='brawl-modifier'
        className='DryRunnerBrawlModifier'
        value={props.modifier}
        onChange={event => {
          setModifier(event.target.value)
          dialogRef.current.show()
        }}
      >
        <option value='NONE'>None</option>
        <option value='STRUCTURE_MANA'>Structures = 2 mana</option>
        <option value='TOAD_MANA'>Toads = 2 mana</option>
        <option value='KNIGHT_MANA'>Knights -2 mana</option>
        <option value='DWARF_MANA'>Dwarves -2 mana</option>
        <option value='SPELL_MANA'>Spells -2 mana</option>
      </select>
      <Dialog
        id='brawl-modifier-dialog'
        title='Brawl mode'
        dialogRef={instance => (dialogRef.current = instance)}
        image={`/assets/images/cards/${modifierHeroImage[modifier]}.png`}
        close={() => dialogRef.current.hide()}
        ctaProps={{
          onClick: () => {
            props.setModifier(modifier)
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
