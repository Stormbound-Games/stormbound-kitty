import React from 'react'
import { useFela } from 'react-fela'
import CardLink from '~/components/CardLink'
import { PROBABILITIES } from '~/constants/dryRunner'
import styles from './styles'

const CARD_MECHANICS = {
  PLAYING_CYCLING_DISCARDING: {
    label: 'Playing, Cycling and Discarding',
    cards: ['N12', 'N14', 'N22', 'N33'],
  },
  CARDS_FROM_DECK_HAND: {
    label: 'Playing cards from your deck/hand',
    cards: ['N48', 'S21', 'N77'],
  },
  FREEZE: { label: 'Freeze mechanics', cards: ['W1', 'W8'] },
  MANA: {
    label: 'Gaining/losing mana',
    cards: ['W12', 'W19', 'W10', 'W9', 'W16', 'W8', 'W33'],
  },
  RNG: {
    label: 'RNG-dependent',
    cards: ['S3', 'W9', 'W16', 'W8', 'I29', 'W33'],
  },
  FIRST_TURN: {
    label: 'First turn restrictions',
    cards: ['W1', 'F4', 'N9', 'N15', 'N63'],
  },
  OTHERS: { label: 'Others', cards: ['N8', 'F8'] },
}

const { FROZEN_CORE_STAYS, DAWNSPARKS_STAYS, DAWNSPARKS_HITS, AHMI_RETURNS } =
  PROBABILITIES
const CARD_ATTRIBUTES = {
  N12: 'Discards a random non-Pirate card from your hand',
  N14: 'Draws one or two cards, depending on the level',
  N22: 'Cycles a random non-Pirate card from your hand',
  N33: 'Discards and redraws your hand when played as the first card on a turn',
  N48: 'Plays one or two spells from your hand, depending on her level',
  N77: 'Copies card from the opponent’s deck for single usage.',
  S21: 'Plays one or two Satyrs from your deck, depending on her level',
  W1: 'Can only be played when you have frozen enemy units this turn',
  W8: 'Destroys frozen enemies and gain mana from them, depending on how many freezing cards were played this turn and your RNG level',
  W12: 'Gives back 3 mana',
  W10: 'Spends remaining mana to gain strength',
  W9: `Has a 0% / ${
    FROZEN_CORE_STAYS * 100
  }% / 100% chance each turn of staying on the board and giving you mana each turn`,
  W16: `Have a 0% / ${
    DAWNSPARKS_STAYS * 100
  }% / 100% chance of staying on the board and a 0% / ${
    DAWNSPARKS_HITS * 100
  }% / 100% chance of giving you mana each turn`,
  W33: `Have a 0% / 50% / 100% chance of staying on the board`,
  W19: 'Gives you between 11 and 15 mana, depending on its level',
  N8: 'Adds a random token card to your deck',
  S3: `Comes back to your hand with a 0% / ${
    AHMI_RETURNS * 100
  }% / 100% probability`,
  F4: 'On turn one, can only be played when a friendly unit has previously been played',
  N15: 'Cannot be played without a friendly target unit',
  S10: 'Cannot be played without a target unit/structure',
  N9: 'Cannot be played without an enemy target unit',
  N63: 'Cannot be played without an enemy target unit',
  F8: 'May fill up your base line on turn one, restricting the cards you can play after',
}

export default React.memo(function DryRunnerExplanation(props) {
  const { css } = useFela()
  const [expanded, setExpanded] = React.useState([])

  const toggle = category => {
    expanded.includes(category)
      ? setExpanded(expanded.filter(i => i !== category))
      : setExpanded([...expanded, category])
  }

  return (
    <>
      <p>
        The dry-run simulator currently correctly supports the following
        abilities, while their effect might vary depending on the RNG setting:
      </p>
      <div className={css(styles.explanation)}>
        {Object.keys(CARD_MECHANICS).map(categoryTitle => {
          const category = CARD_MECHANICS[categoryTitle]
          return (
            <details key={categoryTitle} className={css(styles.entry)}>
              <summary>+ {category.label} (expand)</summary>
              <ul className={css(styles.list)}>
                {Object.keys(CARD_ATTRIBUTES)
                  .filter(cardId => category.cards.includes(cardId))
                  .map(cardId => (
                    <li className={css(styles.item)} key={cardId}>
                      <CardLink id={cardId} />
                      {': '}
                      {CARD_ATTRIBUTES[cardId]}
                    </li>
                  ))}
              </ul>
            </details>
          )
        })}
      </div>
    </>
  )
})
