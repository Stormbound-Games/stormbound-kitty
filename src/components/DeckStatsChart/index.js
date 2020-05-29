import React from 'react'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import { TOOLTIP_STYLES } from '../../constants/stats'

const getSequences = () => {
  const sequence = [0, 1, 2, 3]
  const sequences = []

  while (sequence[0] <= 8) {
    while (sequence[1] <= 9) {
      while (sequence[2] <= 10) {
        for (let i = sequence[3]; i <= 11; i++) {
          sequence[3] = i
          sequences.push(sequence.slice(0))
        }
        sequence[2]++
        sequence[3] = sequence[2] + 1
      }
      sequence[1]++
      sequence[2] = sequence[1] + 1
      sequence[3] = sequence[2] + 1
    }
    sequence[0]++
    sequence[1] = sequence[0] + 1
    sequence[2] = sequence[1] + 1
    sequence[3] = sequence[2] + 1
  }

  return sequences
}

const SEQUENCES = getSequences()

const getEffectiveManaCost = mana => card => {
  // If the card is GotW and it can be played, reduced its mana cost by the
  // amount of mana given by its ability.
  if (card.id === 'W19' && mana >= 7)
    return 7 - ([9, 10, 11, 12, 13][card.level] - 7)

  // If the card is Rimelings and it can be played, reduced its mana cost by
  // the amount of mana given by its ability.
  if (card.id === 'W12' && mana >= 5) return 2

  return card.mana
}

const getManaSequences = mana => cards => {
  const [A, B, C, D] = cards.map(getEffectiveManaCost(mana))

  return [
    A,
    A + B,
    A + C,
    A + D,
    A + B + C,
    A + B + D,
    A + C + D,
    A + B + C + D,
    B,
    B + C,
    B + D,
    B + C + D,
    C,
    C + D,
    D,
  ]
}

const sum = sequence => sequence.reduce((acc, value) => acc + value, 0)

const computeDeckChances = (deck, mana) => {
  const getCardAtIndex = index => deck[index]

  // Compute all the possible unique hand sequences that can happen for the
  // given deck, and resolve them to host mana instead of card index.
  // Find all the hand sequences using all the available mana.
  const sequencesUsingAllMana = SEQUENCES.map(sequence =>
    sequence.map(getCardAtIndex)
  )
    .map(getManaSequences(mana))
    .filter(sequence => sequence.includes(mana))
  // Find all the hand sequences being fully playable within the available mana.
  const sequencesUsingAllCards = SEQUENCES.map(sequence =>
    sequence.map(getCardAtIndex).map(getEffectiveManaCost(mana))
  )
    .map(sum)
    .filter(manaCost => manaCost <= mana)

  return {
    usingAllMana: (sequencesUsingAllMana.length / SEQUENCES.length) * 100,
    playingAllCards: (sequencesUsingAllCards.length / SEQUENCES.length) * 100,
  }
}

export default React.memo(function DeckStatsChart(props) {
  const deck = props.deck.map(getResolvedCardData)
  const data = Array.from({ length: 15 }, (_, index) => {
    const mana = index + 3
    const { usingAllMana, playingAllCards } = computeDeckChances(deck, mana)

    return {
      mana,
      usingAllMana: +usingAllMana.toFixed(2),
      playingAllCards: +playingAllCards.toFixed(2),
    }
  })

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 0, left: -28, bottom: 5 }}
      >
        <XAxis dataKey='mana' />
        <YAxis />
        <Tooltip {...TOOLTIP_STYLES} labelFormatter={mana => 'Mana ' + mana} />
        <Legend />
        <Line
          name='Chances to spend all mana'
          type='monotone'
          dataKey='usingAllMana'
          stroke='#8884d8'
        />
        <Line
          name='Chances to play all cards'
          type='monotone'
          dataKey='playingAllCards'
          stroke='#82ca9d'
        />
      </LineChart>
    </ResponsiveContainer>
  )
})
