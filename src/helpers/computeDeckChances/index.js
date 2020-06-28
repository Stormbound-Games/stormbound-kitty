import getCombinations from '../getCombinations'
import {
  addArrayValues,
  subtractArrayValues,
  findMaxInArrays,
  replaceInArray,
  incrementArrayValues,
  getHandKey,
} from './utils'

// Compute an array of indices based on the length of the deck, so from 0 to
// 11 for a 12-cards deck. Generate all the possible unique hands of 4 cards.
const INDICES = [...Array(12).keys()]
const UNIQUE_HANDS = getCombinations(INDICES, 4)
const NON_CYCLED_UNIQUE_HANDS = getCombinations(INDICES, 3)

// Special cards that can affect how cards are being played and mana is being
// spent.
const SPECIAL_CARD = ['N14', 'W1', 'W12', 'W19']
const SPECIAL_MANA_CARDS = ['N14', 'S3', 'W10', 'W12', 'W19']
const FREEZE_CARDS = ['W2', 'W6', 'W11']

// Caches.
const CACHE_MANA = new Map()
const CACHE_CARD = new Map()
const CACHE_MANA_CYCLED = new Map()
const CACHE_CARD_CYCLED = new Map()

const canSpendAllCards = (hand, deck, usedMana, MaxMana) => {
  const handIds = hand.map(card => card.id)
  let Mana = Array(MaxMana).fill(0)

  const Freebooters = hand.find(card => card.id === 'N14')
  const Rimelings = hand.find(card => card.id === 'W12')
  const GiftOfTheWise = hand.find(card => card.id === 'W19')

  if (GiftOfTheWise) {
    hand = hand.map(card => {
      if (card.id !== 'W19' || card.changed) return card

      return {
        ...card,
        mana: card.mana - [9, 10, 11, 12, 13][card.level - 1],
        changed: true,
      }
    })
  }

  if (Rimelings) {
    hand = hand.map(card => {
      if (card.id !== 'W12' || card.changed) return card

      return { ...card, mana: card.mana - 3, changed: true }
    })
  }

  if (Freebooters) {
    const isNotFreebooters = card => card.id !== Freebooters.id
    if (Freebooters.level >= 4) {
      // If Freebooters draw 2 cards, we first spend the cheapest card and then
      // Freebooters if the hand is full, or just Freebooters if the hand is not
      // full.
      const cheapCard = hand.reduce(
        (cheap, card) =>
          isNotFreebooters(card) && card.mana < cheap.mana ? card : cheap,
        { mana: Infinity }
      )

      const newHand = hand
        .filter(isNotFreebooters)
        .filter(card => hand.length !== 4 || card.id !== cheapCard.id)
      const newUsedMana =
        usedMana + Freebooters.mana + (hand.length === 4 ? cheapCard.mana : 0)
      const newHandCost = newHand.reduce(
        (sum, card) => sum + card.mana,
        newUsedMana
      )
      const newIncoming = getCombinations(deck, 2) // ways to draw 2 cards

      Mana = findMaxInArrays(
        Mana,
        newIncoming
          .reduce((acc, newCards) => {
            const newCardIds = newCards.map(card => card.id)

            //generates all the possibilities
            //the hand has special cards that weren't handled yet
            if (
              newHand.filter(
                card => SPECIAL_CARD.includes(card.id) && !card.changed
              ).length ||
              newCards.filter(card => SPECIAL_CARD.includes(card.id)).length
            ) {
              return addArrayValues(
                acc,
                canSpendAllCards(
                  newHand.concat(newCards),
                  deck.filter(card => !newCardIds.includes(card.id)),
                  newUsedMana,
                  MaxMana
                )
              )
            }

            return incrementArrayValues(
              acc,
              newCards.reduce((sum, card) => sum + card.mana, 0) + newHandCost
            )
          }, Array(MaxMana).fill(0))
          .map(entry => entry / newIncoming.length)
      )
    } else {
      const newHand = hand.filter(card => card.id !== Freebooters.id)
      const newUsedMana = usedMana + Freebooters.mana
      const newHandCost = newHand.reduce(
        (sum, card) => sum + card.mana,
        newUsedMana
      )

      Mana = findMaxInArrays(
        Mana,
        deck
          .reduce((acc, newCard) => {
            if (
              newHand.filter(
                card => SPECIAL_CARD.includes(card.id) && !card.changed
              ).length ||
              SPECIAL_CARD.includes(newCard.id)
            ) {
              return addArrayValues(
                acc,
                canSpendAllCards(
                  newHand.concat([newCard]),
                  deck.filter(card => card.id !== newCard.id),
                  newUsedMana,
                  MaxMana
                )
              )
            }

            return incrementArrayValues(acc, newCard.mana + newHandCost)
          }, Array(MaxMana).fill(0))
          .map(entry => entry / deck.length)
      )
    }
  } else if (
    !handIds.includes('W1') ||
    handIds.filter(card => FREEZE_CARDS.includes(card.id)).length
  ) {
    // Check for impossibilities to play Icicle Burst
    const handCost = hand.reduce((sum, card) => sum + card.mana, usedMana)
    Mana = findMaxInArrays(Mana, incrementArrayValues(Mana, handCost))
  }

  if (GiftOfTheWise && !GiftOfTheWise.changed) {
    for (let i = 0; i < usedMana + GiftOfTheWise.mana; i++) Mana[i] = 0
  }

  if (Rimelings && !Rimelings.changed) {
    for (let i = 0; i < usedMana + Rimelings.mana; i++) Mana[i] = 0
  }

  return Mana
}

// Calculate all the possible mana that can be spent with this hand.
// @param {Number} usedMana - Already spent mana
// @param {Cards[]} hand - Hand of cards
// @param {Number} availableMana - Available mana
// @return {Number[]} Possible amounts of mana spent
const getPossibleManaSpent = usedMana => (hand, availableMana) =>
  hand
    .reduce(
      (result, card) => [...result, ...result.map(mana => mana + card.mana)],
      [usedMana]
    )
    .filter(mana => mana < availableMana)

const canSpendAllMana = (hand, deck, usedMana, maxMana) => {
  let Mana = Array(maxMana).fill(0)

  const Rimelings = hand.find(card => card.id === 'W12')
  const GiftOfTheWise = hand.find(card => card.id === 'W19')
  const Freebooters = hand.find(card => card.id === 'N14')
  const LadyRime = hand.find(card => card.id === 'W10')
  const IcicleBurst = hand.find(card => card.id === 'W1')
  const CounselorAhmi = hand.find(card => card.id === 'S3')

  if (maxMana <= usedMana) return Mana

  if (LadyRime) {
    for (let i = Math.max(0, LadyRime.mana + usedMana); i < maxMana; i++) {
      Mana[i] = 1
    }

    // No need to check futher results, because Lady Rime spends all remaining
    // mana.
    maxMana = Math.min(maxMana, LadyRime.mana + usedMana)
  }

  if (IcicleBurst) {
    if (!IcicleBurst.changed) {
      const freezeCards = hand.filter(card => FREEZE_CARDS.includes(card.id))
      const newHand = hand.filter(card => card.id !== IcicleBurst.id)

      //use a FreeCard with Icicled Burst then recall the fuction to others combinations. Then takes the better results to each mana-turn
      Mana = findMaxInArrays(
        Mana,
        freezeCards.reduce((bestArray, usedCard) => {
          if (maxMana > usedMana + usedCard.mana + IcicleBurst.mana)
            return findMaxInArrays(
              bestArray,
              canSpendAllMana(
                newHand.filter(card => card.id !== usedCard.id),
                deck,
                usedMana + usedCard.mana + IcicleBurst.mana,
                maxMana
              )
            )
          else return bestArray
        }, Array(maxMana).fill(0))
      )

      // Make Icicle Burst impossible to play
      hand = hand.map(card =>
        card.id !== 'W1' ? card : { ...card, mana: Infinity, changed: true }
      )
    }
  }

  if (
    GiftOfTheWise &&
    GiftOfTheWise.mana + usedMana < maxMana &&
    !GiftOfTheWise.changed
  ) {
    hand = hand.map(card =>
      card.id !== 'W19'
        ? card
        : {
            ...card,
            mana: card.mana - [9, 10, 11, 12, 13][card.level - 1],
            changed: true,
          }
    )
  }

  if (Rimelings && Rimelings.mana + usedMana < maxMana && !Rimelings.changed) {
    hand = hand.map(card =>
      card.id !== 'W12' ? card : { ...card, mana: card.mana - 3, changed: true }
    )
  }

  const NoSpecial = getPossibleManaSpent(usedMana)(hand, maxMana)

  for (let i = 0; i < NoSpecial.length; i++) {
    if (NoSpecial[i] > 0) {
      Mana[NoSpecial[i]] = 1
    }
  }

  if (Freebooters) {
    if (Freebooters.level >= 4 && hand.length === 4) {
      const newIncoming = getCombinations(deck, 2) //ways to draws 2 cards
      const cardsToUse = hand.filter(card => card.id !== Freebooters.id)

      Mana = cardsToUse.reduce((bestArray, usedCard) => {
        const newHand = cardsToUse.filter(card => card.id !== usedCard.id)
        const newUsedMana = usedMana + Freebooters.mana + usedCard.mana

        //early cut-off
        if (maxMana <= newUsedMana) return bestArray

        //the way I can spend mana with the hand after played freebooters and before it effects triggers
        const manaHand = getPossibleManaSpent(newUsedMana)(newHand, maxMana)

        //generate and take the mean of all outcomes
        const Temp = newIncoming.reduce((tempArray, newCards) => {
          //this hand has a special card that weren't handle yet.
          if (
            newHand.filter(
              card => SPECIAL_MANA_CARDS.includes(card.id) && !card.changed
            ).length ||
            newCards.filter(card => SPECIAL_MANA_CARDS.includes(card.id)).length
          )
            return addArrayValues(
              tempArray,
              canSpendAllMana(
                newHand.concat(newCards),
                deck.filter(card => !newCards.map(c => c.id).includes(card.id)),
                newUsedMana,
                maxMana
              )
            )

          //mana I can spend with the new hand (not considering the mana I could have played before)
          let manaTotal = manaHand
            .map(mana => mana + newCards[0].mana)
            .concat(manaHand.map(mana => mana + newCards[1].mana))
            .concat(
              manaHand.map(mana => mana + newCards[0].mana + newCards[1].mana)
            )

          //as I'll ++ later, I can't sum more than value more than once
          manaTotal = Array.from(new Set(manaTotal))

          //updating manually
          for (let i = 0; i < manaTotal.length; i++) {
            if (0 <= manaTotal[i] && manaTotal[i] < maxMana) {
              tempArray[manaTotal[i]]++
            }
          }

          return tempArray
        }, Array(maxMana).fill(0))

        return findMaxInArrays(
          bestArray,
          Temp.map(entry => entry / newIncoming.length)
        )
      }, Mana)
    } else if (Freebooters.level >= 4) {
      // don't have to play a card before because a card was already played (hand.lenght !== 4)
      const newIncoming = getCombinations(deck, 2) //ways to draws 2 cards
      const newUsedMana = usedMana + Freebooters.mana
      const newHand = hand.filter(card => card.id !== Freebooters.id)
      const manaHand = getPossibleManaSpent(newUsedMana)(newHand, maxMana)

      //early cut-off
      if (newUsedMana < maxMana)
        Mana = findMaxInArrays(
          Mana,
          newIncoming
            .reduce((tempArray, newCards) => {
              //generates all the possible outcomes
              //this hand has a special card that weren't handle yet.
              if (
                newHand.filter(
                  card => SPECIAL_MANA_CARDS.includes(card.id) && !card.changed
                ).length ||
                newCards.filter(card => SPECIAL_MANA_CARDS.includes(card.id))
                  .length
              )
                return addArrayValues(
                  tempArray,
                  canSpendAllMana(
                    newHand.concat(newCards),
                    deck.filter(
                      card => !newCards.map(c => c.id).includes(card.id)
                    ),
                    newUsedMana,
                    maxMana
                  )
                )

              //mana I can spend with the new hand (not considering the mana I could have played before)
              let manaTotal = manaHand
                .map(mana => mana + newCards[0].mana)
                .concat(manaHand.map(mana => mana + newCards[1].mana))
                .concat(
                  manaHand.map(
                    mana => mana + newCards[0].mana + newCards[1].mana
                  )
                )

              //as I'll ++ later, I can't sum more than value more than once
              manaTotal = Array.from(new Set(manaTotal))

              for (let i = 0; i < manaTotal.length; i++) {
                if (0 <= manaTotal[i] && manaTotal[i] < maxMana) {
                  tempArray[manaTotal[i]]++
                }
              }

              return tempArray
            }, Array(maxMana).fill(0))
            .map(entry => entry / newIncoming.length)
        )
    }
    if (Freebooters.level < 4 || hand.length === 4) {
      // Drawing just a single card.
      const newHand = hand.filter(card => card.id !== Freebooters.id)
      const manaHand = getPossibleManaSpent(usedMana + Freebooters.mana)(
        newHand,
        maxMana
      )

      if (usedMana + Freebooters.mana < maxMana) {
        Mana = findMaxInArrays(
          Mana,
          deck
            .reduce((tempArray, newCard) => {
              //this hand has a special card that weren't handle yet.
              if (
                SPECIAL_MANA_CARDS.includes(newCard.id) ||
                newHand.filter(
                  card => SPECIAL_MANA_CARDS.includes(card.id) && !card.changed
                ).length
              )
                return addArrayValues(
                  tempArray,
                  canSpendAllMana(
                    newHand.concat(newCard),
                    deck.filter(card => card.id !== newCard.id),
                    usedMana + Freebooters.mana,
                    maxMana
                  )
                )

              //mana I can spend with the new hand (not considering the mana I could have played before)
              var manaTotal = manaHand.map(mana => mana + newCard.mana)

              //as I'll ++ later, I can't sum more than value more than once
              manaTotal = Array.from(new Set(manaTotal))

              //updating manually
              for (let i = 0; i < manaTotal.length; i++)
                if (0 <= manaTotal[i] && manaTotal[i] < maxMana)
                  tempArray[manaTotal[i]]++

              return tempArray
            }, Array(maxMana).fill(0))
            .map(entry => entry / deck.length)
        )
      }
    }
  }

  if (
    GiftOfTheWise &&
    GiftOfTheWise.mana + usedMana < maxMana &&
    !GiftOfTheWise.changed
  ) {
    hand = hand.map(card => (card.id === 'W19' ? GiftOfTheWise : card))
    Mana = replaceInArray(
      Mana,
      canSpendAllMana(hand, deck, usedMana, GiftOfTheWise.mana + usedMana)
    )
  }

  if (Rimelings && Rimelings.mana + usedMana < maxMana && !Rimelings.changed) {
    hand = hand.map(card => (card.id === 'W12' ? Rimelings : card))
    Mana = replaceInArray(
      Mana,
      canSpendAllMana(hand, deck, usedMana, Rimelings.mana + usedMana)
    )
  }

  if (CounselorAhmi) {
    // If I can play all cards in (X-3)-mana turn, I can play X-mana turn now
    // if I play Counselor Ahmi one more time.
    for (
      let i = Math.max(0, usedMana) + CounselorAhmi.mana;
      i < maxMana && CounselorAhmi.mana;
      i++
    ) {
      Mana[i] = Math.max(Mana[i - CounselorAhmi.mana], Mana[i])
    }
  }

  return Mana
}

// Return the maximum mana that one can use with this deck + 1.
// @param {Cards[]} deck - Deck of cards
// @return {Number}
const getMaxMana = deck => {
  let result = 2

  const mana = deck
    .map(card => {
      switch (card.id) {
        case 'W19' /* Gift of the Wise */:
          return card.mana - [9, 10, 11, 12, 13][card.level - 1]
        case 'W12' /* Rimelings */:
          return card.mana - 3
        case 'N14' /* Freebooters */:
        case 'W10' /* Lady Rime */:
          return 0
        default:
          return card.mana
      }
    })
    // Sort the mana costs, considering some special effects.
    .sort()

  for (let i = mana.length - 4; i < mana.length; i++) {
    result += mana[i]
  }

  // Consider Freebooters
  const Freebooters = deck.find(card => card.id === 'N14')

  if (Freebooters) {
    result += Freebooters.mana
    if (Freebooters.level >= 4) result += mana[mana.length - 5]
  }

  return result
}

const computeDeckChances = (deck, modifier = 'NONE') => {
  // Determine the maximum amount of mana + 1 that one can spend with this deck
  // on a given turn.
  const maxMana = getMaxMana(deck)

  // The returned arrays will spread from 0 to the maximum amount of mana, every
  // entry being the chance at given index-mana turn.
  let allManaCases = Array(maxMana).fill(0)
  let allCardsCases = Array(maxMana).fill(0)

  for (let i = 0; i < UNIQUE_HANDS.length; i++) {
    // Resolve the hand of cards by converting deck indices to actual card
    // objects and compute a unique hash for the hand itself.
    const hand = UNIQUE_HANDS[i].map(index => deck[index])
    const handIds = hand.map(card => card.id)
    const isNotInHand = card => !handIds.includes(card.id)
    const key = getHandKey(UNIQUE_HANDS[i])

    CACHE_MANA.set(
      key,
      canSpendAllMana(hand, deck.filter(isNotInHand), 0, maxMana)
    )
    CACHE_MANA_CYCLED.set(key, [...CACHE_MANA.get(key)])
    CACHE_CARD.set(
      key,
      canSpendAllCards(hand, deck.filter(isNotInHand), 0, maxMana)
    )
    CACHE_CARD_CYCLED.set(key, [...CACHE_CARD.get(key)])
  }

  for (let h = 0; h < NON_CYCLED_UNIQUE_HANDS.length; h++) {
    const hand = NON_CYCLED_UNIQUE_HANDS[h]
    const key = getHandKey(hand)

    let tmp1 = Array(maxMana).fill(0)
    let tmp2 = Array(maxMana).fill(0)

    for (let d = 0; d < deck.length; d++) {
      if (hand.includes(d)) continue

      const shiftedKey = key + (1 << d)

      tmp1 = addArrayValues(tmp1, CACHE_MANA.get(shiftedKey))
      tmp2 = addArrayValues(tmp2, CACHE_CARD.get(shiftedKey))
    }

    for (let d = 0; d < deck.length; d++) {
      if (hand.includes(d)) continue

      const shiftedKey = key + (1 << d)
      const normalise = entry => entry / (deck.length - 4)

      CACHE_MANA_CYCLED.set(
        shiftedKey,
        findMaxInArrays(
          CACHE_MANA_CYCLED.get(shiftedKey),
          subtractArrayValues([...tmp1], CACHE_MANA.get(shiftedKey)).map(
            normalise
          )
        )
      )

      CACHE_CARD_CYCLED.set(
        shiftedKey,
        findMaxInArrays(
          CACHE_CARD_CYCLED.get(shiftedKey),
          subtractArrayValues([...tmp2], CACHE_CARD.get(shiftedKey)).map(
            normalise
          )
        )
      )
    }
  }

  // Sum the results of each hand
  for (let i = 0; i < UNIQUE_HANDS.length; i++) {
    const key = getHandKey(UNIQUE_HANDS[i])
    allManaCases = addArrayValues(allManaCases, CACHE_MANA_CYCLED.get(key))
    allCardsCases = addArrayValues(allCardsCases, CACHE_CARD_CYCLED.get(key))
  }

  const normalise = entry => entry / (UNIQUE_HANDS.length / 100)

  return {
    usingAllMana: allManaCases.map(normalise),
    playingAllCards: allCardsCases.map(normalise),
  }
}

export default computeDeckChances
