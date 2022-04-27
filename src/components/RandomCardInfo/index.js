import React from 'react'
import CTA from '~/components/CTA'
import Icon from '~/components/Icon'
import Info from '~/components/Info'
import Link from '~/components/Link'
import { INITIAL_STATE } from '~/hooks/useCardBuilder'
import resolveAbility from '~/helpers/resolveAbility'
import resolveLeveledProperty from '~/helpers/resolveLeveledProperty'
import track from '~/helpers/track'

export default React.memo(function RandomCardInfo(props) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasErrored, setHasErrored] = React.useState(false)
  const { setCardData } = props

  const createRandomCard = React.useCallback(async () => {
    setIsLoading(true)
    setHasErrored(false)

    try {
      track('randomize_card')

      const { default: randomizeCard } = await import('~/helpers/randomizeCard')
      const card = randomizeCard()

      // Use the global setter instead of individual one as it’s more performant
      // and avoid doing a URL rewrite per property—instead it does a single
      // rewrite.
      setCardData(cardData => ({
        ...cardData,
        name: card.name ?? INITIAL_STATE.name,
        imageURL: card.imageURL ?? INITIAL_STATE.imageURL,
        imageCardId: card.imageCardId ?? INITIAL_STATE.imageCardId,
        rarity: card.rarity ?? INITIAL_STATE.rarity,
        faction: card.faction ?? INITIAL_STATE.faction,
        race: card.race ?? INITIAL_STATE.race,
        ancient: card.ancient ?? INITIAL_STATE.ancient,
        elder: card.elder ?? INITIAL_STATE.elder,
        hero: card.hero ?? INITIAL_STATE.hero,
        type: card.type ?? INITIAL_STATE.type,
        movement: card.movement ?? INITIAL_STATE.movement,
        mana: resolveLeveledProperty(card.mana) ?? INITIAL_STATE.mana,
        strength:
          resolveLeveledProperty(card.strength) ?? INITIAL_STATE.strength,
        ability: resolveAbility(card.ability) ?? INITIAL_STATE.ability,
        fixedMovement: card.fixedMovement ?? INITIAL_STATE.fixedMovement,
      }))

      setHasErrored(false)
    } catch (error) {
      setHasErrored(true)
      setCardData({ ...INITIAL_STATE })
    } finally {
      setIsLoading(false)
    }
  }, [setCardData])

  return (
    <Info
      icon='wand'
      title='Random card'
      CTA={
        <CTA
          onClick={createRandomCard}
          disabled={isLoading}
          aria-describedby='randomize-card-error'
          aria-invalid={hasErrored}
        >
          {isLoading ? 'Loading…' : 'Randomize'}
        </CTA>
      }
    >
      <p style={{ marginBottom: hasErrored ? 'var(--s-base)' : '0' }}>
        Don’t know where to start? Try the card randomizer from{' '}
        <Link to={`/members/parchment-engineer`}>ParchmentEngineer</Link>. It
        should generate a relatively balanced card for you to get started! From
        there, you can tweak it to suit your needs.
      </p>
      <p id='randomize-card-error' style={{ color: 'var(--light-ironclad)' }}>
        {hasErrored ? (
          <>
            <Icon icon='warning' /> An unexpected error occurred. Please try
            again.
          </>
        ) : null}
      </p>
    </Info>
  )
})
