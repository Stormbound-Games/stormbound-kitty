import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import { CollectionContext } from '../CollectionProvider'
import Deck from '../Deck'
import DiamondButton from '../DiamondButton'
import Only from '../Only'
import RarityBar from '../RarityBar'
import { Stones } from '../Resource'
import Tags from '../Tags'
import TooltipedIcon from '../TooltipedIcon'
import serialisation from '../../helpers/serialisation'
import getDeckDistanceToMax from '../../helpers/getDeckDistanceToMax'
import getRawCardData from '../../helpers/getRawCardData'
import resolveCollection from '../../helpers/resolveCollection'
import modifyDeck from '../../helpers/modifyDeck'
import useSpacing from '../../hooks/useSpacing'
import styles from './styles'

const useAdjustedDeck = ({ brawl, tags, id, staticLevels }) => {
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const deserialisedDeck = serialisation.deck.deserialise(id)
  const modifiedDeck = brawl
    ? modifyDeck(deserialisedDeck, brawl)
    : deserialisedDeck

  if (hasDefaultCollection || tags.includes('EQUALS') || staticLevels) {
    // The `id` does not have to be derivated from the `modifiedDeck` since a
    // deck id only carries the card IDs and levels, but nothing that can be
    // modified by a Brawl.
    return { deck: modifiedDeck, id, distance: null }
  }

  const resolvedCollection = resolveCollection(collection)
  const deck = modifiedDeck.map(card => {
    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (!resolvedCollection[card.id]) return card

    return {
      ...card,
      level: resolvedCollection[card.id].level,
      missing: resolvedCollection[card.id].missing,
    }
  })
  const distance = getDeckDistanceToMax(resolvedCollection)({ id })

  return { deck, id: serialisation.deck.serialise(deck), distance }
}

export default React.memo(function FeaturedDeck(props) {
  const { css } = useFela()
  const { id, deck, distance } = useAdjustedDeck(props)
  const actions = props.actions || []
  const margin = useSpacing('NONE')

  return (
    <div className={css(styles.deck, margin)} data-testid='featured-deck'>
      <Deck
        showUpgrades={props.showUpgrades}
        deck={deck}
        orientation='horizontal'
        onClick={props.onClick}
        onClickLabel='Display card'
      />

      <div className={css(styles.rarityBar)}>
        <RarityBar deck={deck.map(card => getRawCardData(card.id))} />
      </div>

      <div className={css(styles.info)}>
        <div className={css(styles.meta)}>
          <span className={css(styles.name)}>
            <Link to={`/deck/${id}/detail`} data-testid='featured-deck-name'>
              {props.name}
            </Link>
            {props.nerfed ? (
              <TooltipedIcon
                label={`This deck was composed before the balance patch from ${props.nerfed}, therefore it might no longer be competitive.`}
                icon='warning'
                color='var(--confused)'
              />
            ) : null}
            {distance ? (
              <Only.CustomCollection>
                <Only.Desktop>
                  <TooltipedIcon
                    label={
                      distance === Infinity ? (
                        'You are missing some cards from this deck'
                      ) : (
                        <>
                          Distance to maxed out deck:{' '}
                          <Stones amount={distance} />
                        </>
                      )
                    }
                    icon='info'
                  />
                </Only.Desktop>
              </Only.CustomCollection>
            ) : null}
          </span>
          <span className={css(styles.author)}>
            {props.author && (
              <>
                By{' '}
                {!props.noAuthorLink ? (
                  <Link to={`/member/${props.author}`}>{props.author}</Link>
                ) : (
                  props.author
                )}{' '}
                as
              </>
            )}
            <Tags tags={props.tags} />
          </span>
        </div>
        {actions.length > 0 && (
          <div className={css(styles.actions)}>
            {actions.map((action, index) =>
              action['$$typeof'] ? (
                <React.Fragment key={index}>{action}</React.Fragment>
              ) : (
                <DiamondButton key={index} {...action} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
})
