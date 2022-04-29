import React from 'react'
import { FACTIONS } from '~/constants/game'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import CTA from '~/components/CTA'
import Icon from '~/components/Icon'
import Info from '~/components/Info'
import Link from '~/components/Link'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import RandomDeckFilters from '~/components/RandomDeckFilters'
import arrayRandom from '~/helpers/arrayRandom'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import track from '~/helpers/track'

const getRandomFaction = () =>
  arrayRandom(FACTIONS.filter(faction => faction !== 'neutral'))

const resolveOptions = ({
  faction,
  maxEpicCards,
  maxLegendaryCards,
  minFactionCards,
}) => ({
  faction: faction === '*' ? getRandomFaction() : faction,
  maxEpicCards: maxEpicCards === '' ? undefined : +maxEpicCards,
  maxLegendaryCards: maxLegendaryCards === '' ? undefined : +maxLegendaryCards,
  minFactionCards: minFactionCards,
})

export default React.memo(function HelpInfo(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasErrored, setHasErrored] = React.useState(false)
  const { defineDeck } = props
  const dialog = React.useRef()
  const availableCards = collection.map(card =>
    getResolvedCardData(cardsIndex, card)
  )

  const createRandomDeck = React.useCallback(
    async filters => {
      setIsLoading(true)
      setHasErrored(false)

      try {
        const { default: getRandomDeck } = await import(
          '~/helpers/getRandomDeck'
        )
        const options = resolveOptions(filters)
        const deck = getRandomDeck({ availableCards, ...options })

        track('random_deck', options)
        defineDeck(deck)
        setHasErrored(false)
      } catch (error) {
        console.error(error)
        setHasErrored(true)
        defineDeck([])
      } finally {
        setIsLoading(false)
        if (dialog) dialog.current.hide()
      }
    },
    [defineDeck, availableCards]
  )

  return (
    <>
      <Info
        icon='stack'
        title='Getting started'
        CTA={
          <CTA
            onClick={() => dialog.current.show()}
            disabled={isLoading}
            aria-describedby='random-deck-error'
            aria-invalid={hasErrored}
            data-testid='random-deck-btn'
          >
            {isLoading ? 'Loading…' : 'Randomize'}
          </CTA>
        }
      >
        <p style={{ marginBottom: hasErrored ? 'var(--s-base)' : '0' }}>
          If you do not know where to start,{' '}
          <Link to='/guides/deck'>read the deck-building guide</Link> to learn
          how to make a viable deck, or try one of the{' '}
          <Link to='/decks'>featured decks</Link>. Or try generating a random
          deck below.{' '}
          <LearnMoreIcon anchor='#random-deck'>
            Learn more about random decks
          </LearnMoreIcon>
        </p>

        <p id='random-deck-error' style={{ color: 'var(--light-ironclad)' }}>
          {hasErrored ? (
            <>
              <Icon icon='warning' /> An unexpected error occurred. Please try
              again.
            </>
          ) : null}
        </p>
      </Info>
      <RandomDeckFilters dialog={dialog} createRandomDeck={createRandomDeck} />
    </>
  )
})
