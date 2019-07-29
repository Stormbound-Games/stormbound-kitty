import React from 'react'
import { Link } from '@reach/router'
import { deserialiseDeck } from '../../helpers/deserialise'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const isDeckBigEnough = id => {
  try {
    return deserialiseDeck(id).length >= 9
  } catch (error) {
    return false
  }
}

const DBNav = props => {
  const hasBigEnoughDeck = isDeckBigEnough(props.deckId)

  return (
    <nav className="Header__nav">
      <ul className="Header__list Header__list--sub">
        <li className="Header__item">
          <Link
            getProps={getStrictActiveLink}
            to={props.deckId ? `/deck/${props.deckId}` : '/deck'}
          >
            Editor
          </Link>
        </li>
        <li className="Header__item">
          {hasBigEnoughDeck ? (
            <Link
              getProps={getStrictActiveLink}
              to={`/deck/${props.deckId}/detail`}
            >
              Detail
            </Link>
          ) : (
            <span
              className="Header__link Header__link--disabled"
              title="Have at least 9 cards in your deck"
            >
              Detail
            </span>
          )}
        </li>
        <li className="Header__item">
          {hasBigEnoughDeck ? (
            <Link
              getProps={getStrictActiveLink}
              to={`/deck/${props.deckId}/dry-run`}
            >
              Dry-run
            </Link>
          ) : (
            <span
              className="Header__link Header__link--disabled"
              title="Have at least 9 cards in your deck"
            >
              Dry-run
            </span>
          )}
        </li>
        <li className="Header__item">
          <Link getProps={getStrictActiveLink} to="/deck/collection">
            Collection
          </Link>
        </li>

        <li className="Header__item Header__item--right">
          <Link getProps={getStrictActiveLink} to="/deck/suggestions">
            Ready decks
          </Link>
        </li>

        <li className="Header__item">
          <Link getProps={getStrictActiveLink} to="/guides/deck">
            Guide
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default DBNav
