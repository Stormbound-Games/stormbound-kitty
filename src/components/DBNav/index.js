import React from 'react'
import { Link } from '@reach/router'
import { deserialiseDeck } from '../../helpers/deserialise'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const DBNav = props => {
  const deck = deserialiseDeck(props.deckId)
  const hasBigEnoughDeck = deck.length === 12

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
              title="Your deck is not complete"
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
              title="Your deck is not complete"
            >
              Dry-run
            </span>
          )}
        </li>
        <li className="Header__item">
          {hasBigEnoughDeck ? (
            deck.map(card => card.id).includes('N38') ? (
              <span
                className="Header__link Header__link--disabled"
                title="Harvesters of Souls are not supported in the tracker"
              >
                Tracker
              </span>
            ) : (
              <Link
                getProps={getStrictActiveLink}
                to={`/deck/${props.deckId}/tracker`}
              >
                Tracker
              </Link>
            )
          ) : (
            <span
              className="Header__link Header__link--disabled"
              title="Your deck is not complete"
            >
              Tracker
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
