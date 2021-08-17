import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import styles from '~/components/Header/styles'
import serialisation from '~/helpers/serialisation'
import useQueryParams from '~/hooks/useQueryParams'

export default React.memo(function NavDeckBuilder(props) {
  const { css } = useFela()
  const { rest } = useQueryParams()
  const [id] = rest || []
  const deck = React.useMemo(
    () => (id ? serialisation.deck.deserialise(id) : []),
    [id]
  )
  const hasBigEnoughDeck = deck.length === 12

  return (
    <nav className={css(styles.nav({ isSubNav: true }))}>
      <ul className={css(styles.list)}>
        <li className={css(styles.item)}>
          <Link
            to={id ? `/deck/${id}` : '/deck'}
            extend={styles.action({
              isActive: props.active === 'EDITOR',
              isWithinSubList: true,
            })}
          >
            Editor
          </Link>
        </li>
        <li className={css(styles.item)}>
          {hasBigEnoughDeck ? (
            <Link
              to={`/deck/${id}/detail`}
              extend={styles.action({
                isActive: props.active === 'DETAIL',
                isWithinSubList: true,
              })}
            >
              Insights
            </Link>
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
            <Link
              to={`/deck/${id}/dry-run`}
              extend={styles.action({
                isActive: props.active === 'DRY_RUN',
                isWithinSubList: true,
              })}
            >
              Practice
            </Link>
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
