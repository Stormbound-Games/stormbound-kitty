import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import Deck from '~/components/Deck'
import DiamondButton from '~/components/DiamondButton'
import Only from '~/components/Only'
import RarityBar from '~/components/RarityBar'
import { Stones } from '~/components/Resource'
import Tags from '~/components/Tags'
import TooltipedIcon from '~/components/TooltipedIcon'
import serialization from '~/helpers/serialization'
import getDeckDistanceToMax from '~/helpers/getDeckDistanceToMax'
import resolveCollection from '~/helpers/resolveCollection'
import modifyDeck from '~/helpers/modifyDeck'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'
import useSpacing from '~/hooks/useSpacing'
import styles from './styles'

const useAdjustedDeck = ({ brawl, tags, id, staticLevels }) => {
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const deserializedDeck = serialization.deck.deserialize(cardsIndexBySid, id)
  const modifiedDeck = brawl
    ? modifyDeck(cardsIndex, deserializedDeck, brawl)
    : deserializedDeck

  if (hasDefaultCollection || tags.includes('EQUALS') || staticLevels) {
    // The `id` does not have to be derivated from the `modifiedDeck` since a
    // deck id only carries the card IDs and levels, but nothing that can be
    // modified by a Brawl.
    return { deck: modifiedDeck, id, distance: null }
  }

  const resolvedCollection = resolveCollection(collection, cardsIndex)
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

  return { deck, id: serialization.deck.serialize(deck), distance }
}

const Author = React.memo(function Author(props) {
  const { author, noLink } = props

  if (!author) return null
  if (React.isValidElement(author) || noLink) return <> by {author}</>

  const name = author.name || author
  const slug = author.slug || author.toLowerCase()

  return (
    <>
      {' '}
      by <Link to={`/members/${slug}`}>{name}</Link>
    </>
  )
})

export default React.memo(function FeaturedDeck(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela()
  const { id, deck, distance } = useAdjustedDeck(props)
  const actions = props.actions || []
  const margin = useSpacing(props.spacing || 'NONE')

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
        <RarityBar deck={deck.map(card => cardsIndex[card.id])} />
      </div>

      <div className={css(styles.info)}>
        <div className={css(styles.meta)}>
          <span className={css(styles.name)}>
            <Link to={`/deck/${id}/detail`} data-testid='featured-deck-name'>
              {props.name}
            </Link>
            <Author author={props.author} noLink={props.noAuthorLink} />
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
            {props.date && (
              <>
                In{' '}
                <span className='Highlight'>
                  {formatDate(parseDate(props.date))}
                </span>{' '}
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
