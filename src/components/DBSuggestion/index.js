import React from 'react'
import { Link } from '@reach/router'
import Deck from '../Deck'
import Tags from '../Tags'
import RarityBar from '../RarityBar'
import { CATEGORIES } from '../../constants/decks'
import { deserialiseDeck } from '../../helpers/deserialise'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const DBSuggestion = props => {
  const deck = deserialiseDeck(props.id)

  return (
    <div className="DBSuggestion">
      <Deck
        deck={deck}
        orientation="horizontal"
        onClick={props.zoom}
        onClickLabel="Display card"
      />
      <div className="DBSuggestion__rarity-bar">
        <RarityBar deck={deck.map(({ id }) => getRawCardData(id))} />
      </div>
      <span className="DBSuggestion__name">
        <Link to={`/deck/${props.id}`}>{props.name}</Link>
      </span>
      <span className="DBSuggestion__author">
        {CATEGORIES[props.category]} deck by {props.author}
      </span>
      <span className="DBSuggestion__tags">
        {props.tags.length > 0 && ' · '}
        <Tags tags={props.tags} />
      </span>
    </div>
  )
}

export default DBSuggestion
