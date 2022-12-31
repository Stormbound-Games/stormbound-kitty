import {
  FACTIONS,
  UNIT_TYPES,
  CHIP_CARDS,
  RARITIES,
  TYPES,
} from '#constants/game'
import capitalize from '#helpers/capitalize'
import range from '#helpers/range'

const ABILITIES = {
  Drain: /drain/i,
  Commanding: /command/i,
  Confusion: /confus/i,
  Freeze: /(freeze|frozen)/i,
  Poison: /poison/i,
  Push: /push/i,
  Pull: /pull/i,
  Vitality: /vital/i,
  Disable: /disable/i,
}

const rangeAround = (value, delta) => range(value - delta, value + delta)

const getDynamicQuestions = async cards => {
  const cardsWithoutTokens = cards.filter(card => !card.token)

  return [
    {
      question: 'How many non-token cards are there?',
      answer: cardsWithoutTokens.length,
      options: rangeAround(cardsWithoutTokens.length, 20),
    },

    ...RARITIES.map(rarity => {
      const answer = cardsWithoutTokens.filter(
        card => card.rarity === rarity
      ).length

      return {
        question: `How many ${rarity} cards are there?`,
        answer,
        options: rangeAround(answer, 5),
      }
    }),

    ...FACTIONS.map(faction => {
      const answer = cardsWithoutTokens.filter(
        card => card.faction === faction
      ).length

      return {
        question: `How many ${capitalize(faction)} cards are there?`,
        answer,
        options: rangeAround(answer, 5),
      }
    }),

    ...TYPES.map(type => {
      const answer = cardsWithoutTokens.filter(
        card => card.type === type
      ).length

      return {
        question: `How many ${type} cards are there?`,
        answer,
        options: rangeAround(answer, 5),
      }
    }),

    ...UNIT_TYPES.map(unitType => {
      const answer = cardsWithoutTokens.filter(card =>
        card.unitTypes.includes(unitType)
      ).length

      return {
        question: `How many ${unitType} cards are there?`,
        answer,
        options: rangeAround(answer, 5),
      }
    }),

    {
      question: 'How many cards have a Chip ability?',
      answer: CHIP_CARDS.length,
      options: rangeAround(CHIP_CARDS.length, 5),
    },

    ...Object.entries(ABILITIES).map(([ability, re]) => {
      const answer = cards.filter(card => re.test(card.ability)).length

      return {
        question: `How many cards have a ${ability} abiliy?`,
        answer,
        options: rangeAround(answer, 3),
      }
    }),
  ]
}

export default getDynamicQuestions
