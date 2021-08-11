import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import decks from '../../data/decks'
import { BrawlContext } from '../BrawlProvider'
import { CollectionContext } from '../CollectionProvider'
import Decks from '../Decks'
import Icon from '../Icon'
import Title from '../Title'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { css } = useFela()
  const { id } = React.useContext(BrawlContext)
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const brawlDecks = decks
    .filter(deck => deck.tags.includes(id))
    .sort(
      sortDeckSuggestions(
        { hasDefaultCollection, collection },
        hasDefaultCollection ? 'DATE' : 'FEASIBILITY'
      )
    )
    .slice(0, props.limit)

  if (brawlDecks.length === 0) return null

  return (
    <>
      <Title>Recommended deck{props.limit === 1 ? '' : 's'}</Title>
      <Decks showUpgrades columns={props.columns} decks={brawlDecks} />
      <p className={css({ marginTop: '-2em' })}>
        <Icon icon='arrow-right' extend={{ transform: 'translateY(2px)' }} />{' '}
        Check more{' '}
        <Link to={'/deck/suggestions?tags=BRAWL%2C' + id}>
          decks for this brawl
        </Link>
      </p>
    </>
  )
})
