import React from 'react'
import { Link } from '@reach/router'
import Deck from '../Deck'
import Tags from '../Tags'
import { CATEGORIES } from '../../constants/decks'
import { deserialiseDeck } from '../../helpers/deserialise'
import './index.css'

const DBSuggestion = props => (
  <div className="DBSuggestion">
    <Deck
      deck={deserialiseDeck(props.id)}
      orientation="horizontal"
      onClick={props.zoom}
      onClickLabel="Display card"
    />
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

export default DBSuggestion
