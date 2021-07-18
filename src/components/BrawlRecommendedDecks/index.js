import React from 'react'
import { Link } from 'react-router-dom'
import decks from '../../data/decks'
import { BrawlContext } from '../BrawlProvider'
import { CollectionContext } from '../CollectionProvider'
import Decks from '../Decks'
import Icon from '../Icon'
import Title from '../Title'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'
import './index.css'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { id } = React.useContext(BrawlContext)
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const brawlDecks = decks
    .filter(deck => deck.brawl === id)
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
      <p className='BrawlRecommendedDecks__more'>
        <Icon icon='arrow-right' className='BrawlRecommendedDecks__icon' />{' '}
        Check more{' '}
        <Link to={'/deck/suggestions?tags=BRAWL&brawl=' + id}>
          decks for this brawl
        </Link>
      </p>
    </>
  )
})
