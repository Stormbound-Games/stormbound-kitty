import React from 'react'
import TogglableContent from '../TogglableContent'
import WikiLink from '../WikiLink'
import {
  DAWNSPARKS_HITS,
  DAWNSPARKS_STAYS,
  FROZEN_CORE_STAYS,
  AHMI_RETURNS,
} from '../DeckMechanisms'
import './index.css'

const CARD_MECHANICS = {
  'Playing, Cycling and Discarding': ['N12', 'N14', 'N22', 'N33'],
  'Playing cards from your deck/hand': ['N48', 'S21'],
  'Freeze mechanics': ['W1', 'W8'],
  'Gaining mana': ['W12', 'W19', 'W10', 'W9', 'W16', 'W8'],
  'RNG-dependent': ['S3', 'W9', 'W16', 'W8'],
  'First turn restrictions': ['W1', 'F4', 'N63'],
  Others: ['N8', 'F8'],
}

const CARD_ATTRIBUTES = {
  N12: 'Discards a random non-Pirate card from your hand',
  N14: 'Will draw one or two cards, depending on the level',
  N22: 'Cycles a random non-Pirate card will be cycled from your hand',
  N33: 'Discards and redraws your hand when played as the first card on a turn',
  N48: 'Will play one or two spells from your hand, depending on her level',
  S21: 'Will play one or two satyrs from your deck, depending on her level',
  W1: 'Can only be played when you have frozen enemy units this turn',
  W8:
    'Will destroy frozen enemies and gain mana from them, depending on how many freezing cards were played this turn and your RNG level',
  W12: 'Will give you back 3 mana',
  W10: 'Will spend your remaining mana to gain strength',
  W9: `Has a 0% / ${parseInt(
    FROZEN_CORE_STAYS * 100
  )} / 100% chance each turn of staying on the board and giving you mana each turn`,
  W16: `Have a 0% / ${parseInt(
    DAWNSPARKS_STAYS * 100
  )}% / 100% chance of staying on the board and a 0% / ${parseInt(
    DAWNSPARKS_HITS * 100
  )}% / 100% chance of giving you mana each turn`,
  W19: 'Will give you between 9 and 13 mana, depending on its level',
  N8: 'Adds a random token card is added to your deck',
  S3: `Will come back to your hand with a 0% / ${parseInt(
    AHMI_RETURNS * 100
  )}% / 100% probability`,
  F4:
    'On turn one, can only be played when a friendly unit has previously been played',
  N15: 'Cannot be played without a friendly target unit',
  S10: 'Cannot be played without a target unit/structure',
  N63: 'Cannot be played without an enemy target unit',
  F8:
    'May fill up your base line on turn one, restricting the cards you can play after',
}

const DryRunnerExplanation = () => {
  const [expanded, setExpanded] = React.useState([])

  const toggle = category => {
    expanded.includes(category)
      ? setExpanded(expanded.filter(i => i !== category))
      : setExpanded([...expanded, category])
  }

  return (
    <>
      The dry-run simulator currently allows you to play cards with these
      abilities:
      <ul className='DryRunExplanation__categories'>
        {Object.keys(CARD_MECHANICS).map(category => (
          <li key={category}>
            {category}
            {console.log(expanded.includes(category))}
            <TogglableContent
              isExpanded={expanded.includes(category)}
              id={category}
              renderToggle={toggleProps => (
                <button
                  className='ButtonAsLink DryRunExplanation__toggle'
                  onClick={() => toggle(category)}
                >
                  ({expanded.includes(category) ? '- collapse' : '+ expand'})
                </button>
              )}
            >
              <ul className='DryRunExplanation__categories-list'>
                {Object.keys(CARD_ATTRIBUTES)
                  .filter(cardId => CARD_MECHANICS[category].includes(cardId))
                  .map(cardId => (
                    <li key={cardId}>
                      <WikiLink id={cardId}></WikiLink>
                      {': '}
                      {CARD_ATTRIBUTES[cardId]}
                    </li>
                  ))}
              </ul>
            </TogglableContent>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DryRunnerExplanation
