import React from 'react'

export default id => {
  switch (id) {
    case 'DWARF_MANA':
      return (
        <>
          All <span className='Highlight'>Dwarf</span> units cost{' '}
          <span className='Highlight'>-2 mana</span> from their initial mana
          cost, for a minimum of 0.
        </>
      )
    case 'PIRATE_MANA':
      return (
        <>
          All <span className='Highlight'>Pirate</span> units cost{' '}
          <span className='Highlight'>-2 mana</span> from their initial mana
          cost, for a minimum of 0.
        </>
      )
    case 'RAVEN_MOVEMENT':
      return (
        <>
          All <span className='Highlight'>Raven</span> units benefit from an
          extra <span className='Highlight'>+1 movement</span> on top of their
          initial movement.
        </>
      )
    case 'STRUCTURE_MANA':
      return (
        <>
          All <span className='Highlight'>structures</span> cost{' '}
          <span className='Highlight'>2 mana</span>, regardless of their initial
          mana cost.
        </>
      )
    case 'RODENT_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Rodent</span> units benefit from an
          extra <span className='Highlight'>+3 strength</span> on top of their
          initial strength.
        </>
      )
    case 'PIRATE_MOVEMENT':
      return (
        <>
          All <span className='Highlight'>Pirate</span> units have{' '}
          <span className='Highlight'>2 movement</span>, regardless of their
          initial movement.
        </>
      )
    case 'FELINE_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Feline</span> units benefit from an
          extra <span className='Highlight'>+2 strength</span> on top of their
          initial strength.
        </>
      )
    case 'SATYR_MOVEMENT':
      return (
        <>
          All <span className='Highlight'>Satyr</span> units benefit from an
          extra <span className='Highlight'>+1 movement</span> on top of their
          initial movement.
        </>
      )
    case 'SPELL_MANA':
      return (
        <>
          All <span className='Highlight'>spells</span> cost{' '}
          <span className='Highlight'>-2 mana</span> from their initial mana
          cost, for a minimum of 0.
        </>
      )
    case 'FROSTLING_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Frostling</span> units benefit from an
          extra <span className='Highlight'>+4 strength</span> on top of their
          initial strength.
        </>
      )
    case 'TOAD_MANA':
      return (
        <>
          All <span className='Highlight'>Toad</span> units cost{' '}
          <span className='Highlight'>2 mana</span>, regardless of their initial
          mana cost.
        </>
      )
    case 'ELDER_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Elder</span> units benefit from an
          extra <span className='Highlight'>+3 strength</span> on top of their
          initial strength.
        </>
      )
    case 'CONSTRUCT_MOVEMENT':
      return (
        <>
          All <span className='Highlight'>Construct</span> units have{' '}
          <span className='Highlight'>2 movement</span>, regardless of their
          initial movement.
        </>
      )
    case 'KNIGHT_MANA':
      return (
        <>
          All <span className='Highlight'>Knight</span> units cost{' '}
          <span className='Highlight'>-2 mana</span> from their initial mana
          cost, for a minimum of 0.
        </>
      )
    case 'DRAGON_MOVEMENT':
      return (
        <>
          All <span className='Highlight'>Dragon</span> units benefit from an
          extra <span className='Highlight'>+1 movement</span> on top of their
          initial movement.
        </>
      )
    case 'UNDEAD_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Undead</span> units benefit from an
          extra <span className='Highlight'>+2 strength</span> on top of their
          initial strength.
        </>
      )
    case 'HERO_STRENGTH':
      return (
        <>
          All <span className='Highlight'>Hero</span> units benefit from an
          extra <span className='Highlight'>+3 strength</span> on top of their
          initial strength.
        </>
      )
    default:
      return null
  }
}
