import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardDisplay from '~/components/CardDisplay'
import CTA from '~/components/CTA'
import Info from '~/components/Info'
import Page from '~/components/Page'
import CoreForm from '~/components/CardBuilderCoreForm'
import Notice from '~/components/Notice'
import LevelForm from '~/components/CardBuilderLevelForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getCardBuilderMetaTags from '~/helpers/getCardBuilderMetaTags'
import randomizeCard from '~/helpers/randomizeCard'
import useCardBuilder, { INITIAL_STATE } from '~/hooks/useCardBuilder'

const usePageProps = (props, card) => {
  if (!props.cardId) return {}

  const isEditing = props.mode === 'EDITOR'
  const { rarity, faction, type, race } = card
  const to = `/card/${props.cardId}` + (isEditing ? '/display' : '')
  const label = isEditing ? 'Display view' : 'Edit card'
  const icon = isEditing ? 'eye' : undefined

  return {
    meta: [rarity, faction, type, race].filter(Boolean).join(' · '),
    action: { to, children: label, icon },
  }
}

export default React.memo(function PageCardBuilder(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { card, setters } = useCardBuilder(props)
  const pageProps = usePageProps(props, card)
  const metaTags = getCardBuilderMetaTags(cardsIndex, card)

  const createRandomCard = React.useCallback(() => {
    const card = randomizeCard()

    setters.setName(card.name ?? INITIAL_STATE.name)
    setters.setImageURL(card.imageURL ?? INITIAL_STATE.imageURL)
    setters.setImageCardId(card.imageCardId ?? INITIAL_STATE.imageCardId)
    setters.setRarity(card.rarity ?? INITIAL_STATE.rarity)
    setters.setFaction(card.faction ?? INITIAL_STATE.faction)
    setters.setRace(card.race ?? INITIAL_STATE.race)
    setters.setAncient(card.ancient ?? INITIAL_STATE.ancient)
    setters.setElder(card.elder ?? INITIAL_STATE.elder)
    setters.setHero(card.hero ?? INITIAL_STATE.hero)
    setters.setType(card.type ?? INITIAL_STATE.type)
    setters.setMovement(card.movement ?? INITIAL_STATE.movement)
    setters.setFixedMovement(card.fixedMovement ?? INITIAL_STATE.fixedMovement)
    setters.setMana(card.mana ?? INITIAL_STATE.mana)
    setters.setStrength(card.strength ?? INITIAL_STATE.strength)
    setters.setAbility(card.ability ?? INITIAL_STATE.ability)
  }, [setters])

  return (
    <Page {...pageProps} {...metaTags}>
      <Spacing bottom='LARGEST'>
        <CardDisplay {...card} mode={props.mode} id={props.id} />
      </Spacing>

      {card.hasSingleLevel && (
        <Notice icon='hammer'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      <Page.Narrow>
        <Info
          icon='wand'
          title='Random card'
          CTA={<CTA onClick={createRandomCard}>Randomize</CTA>}
        >
          <p>
            Don’t know where to start? Try the card randomizer from
            parchmentEngineer. It should generate a relatively balanced card for
            you to get started! From there, you can tweak it to suit your needs.
          </p>
        </Info>
      </Page.Narrow>

      {props.mode === 'EDITOR' && (
        <Spacing top='LARGEST'>
          <form onSubmit={event => event.preventDefault()}>
            <Row isDesktopOnly>
              <Row.Column>
                <Title>Core attributes</Title>
                <CoreForm {...card} {...setters} />
              </Row.Column>
              <Row.Column>
                <Title>Level-specific attributes</Title>
                <LevelForm {...card} {...setters} id={props.id} />
              </Row.Column>
            </Row>
          </form>
        </Spacing>
      )}
    </Page>
  )
})
