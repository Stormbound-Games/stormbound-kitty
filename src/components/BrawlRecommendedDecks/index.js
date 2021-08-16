import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import DECKS from '~/data/decks'
import { BrawlContext } from '~/components/BrawlProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import Decks from '~/components/Decks'
import Icon from '~/components/Icon'
import Title from '~/components/Title'
import sortDeckSuggestions from '~/helpers/sortDeckSuggestions'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { css } = useFela()
  const { id } = React.useContext(BrawlContext)
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const brawlDecks = DECKS.filter(deck => deck.tags.includes(id))
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
