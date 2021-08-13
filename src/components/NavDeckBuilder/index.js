import React from 'react'
import { useFela } from 'react-fela'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'
import serialisation from '../../helpers/serialisation'
import styles from '../Header/styles'

export default React.memo(function NavDeckBuilder(props) {
  const { css } = useFela()
  const match = useRouteMatch()
  const id = match.params.deckId
  const deck = React.useMemo(
    () => (id ? serialisation.deck.deserialise(id) : []),
    [id]
  )
  const hasBigEnoughDeck = deck.length === 12

  return (
    <nav className={css(styles.nav({ isSubNav: true }))}>
      <ul className={css(styles.list)}>
        <li className={css(styles.item)}>
          <NavLink
            to={id ? `/deck/${id}` : '/deck'}
            isActive={props.active === 'EDITOR'}
            isWithinSubList
          >
            Editor
          </NavLink>
        </li>
        <li className={css(styles.item)}>
          {hasBigEnoughDeck ? (
            <NavLink
              to={`/deck/${id}/detail`}
              isActive={props.active === 'DETAIL'}
              isWithinSubList
            >
              Insights
            </NavLink>
          ) : (
            <span
              className={css(
                styles.action({ isDisabled: true, isWithinSubList: true })
              )}
              title='Your deck is not complete'
            >
              Insights
            </span>
          )}
        </li>
        <li className={css(styles.item)}>
          {hasBigEnoughDeck ? (
            <NavLink
              to={`/deck/${id}/dry-run`}
              isActive={props.active === 'DRY_RUN'}
              isWithinSubList
            >
              Practice
            </NavLink>
          ) : (
            <span
              className={css(
                styles.action({ isDisabled: true, isWithinSubList: true })
              )}
              title='Your deck is not complete'
            >
              Practice
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
})
