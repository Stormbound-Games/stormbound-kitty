import React from 'react'
import Deck from '../Deck'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import './index.css'

export default React.memo(function YourDeckGhost(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const label = decks.length === 0 ? 'Add your deck' : 'Add a new deck'

  return (
    <div className='YourDeckGhost' data-testid='ghost-deck'>
      <button
        className='YourDeckGhost__button'
        onClick={props.onClick}
        data-testid='ghost-deck-btn'
      >
        <span className='VisuallyHidden'>{label}</span>
      </button>
      <Deck deck={[]} orientation='horizontal' />
      <span className='YourDeckGhost__name' aria-hidden>
        {label}
      </span>
    </div>
  )
})
