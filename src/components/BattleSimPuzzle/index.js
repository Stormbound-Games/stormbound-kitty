import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Image from '../Image'
import Only from '../Only'
import { formatDate } from '../../helpers/formatDate'
import parseDate from '../../helpers/parseDate'
import styles from './styles'

export default React.memo(function BattleSimPuzzle(props) {
  const { css } = useFela()
  const date = parseDate(props.date)

  return (
    <div className={css(styles.puzzle)}>
      {!props.noImage && (
        <Only.Desktop>
          <div className={css(styles.imageWrapper)}>
            <Image extend={styles.image} src={props.image} alt={props.name} />
          </div>
        </Only.Desktop>
      )}
      <div className={css(styles.content)}>
        <h3 className={css(styles.name)}>
          <Link to={`/sim/${props.board}/display`} data-testid='puzzle-link'>
            {props.name}
          </Link>
        </h3>
        <p className={css(styles.author)}>
          by <Link to={'/member/' + props.author}>{props.author}</Link>, in{' '}
          <time
            className={css(styles.date)}
            dateTime={
              date.getFullYear() +
              '-' +
              String(date.getMonth()).padStart(2, '0')
            }
          >
            {formatDate(date)}
          </time>
        </p>
        <dl>
          <dt className={css(styles.term)} data-testid='puzzle-type'>
            {props.type.toLowerCase()}:
          </dt>
          <dd className={css(styles.definition)}>
            {props.description || TYPES[props.type]} {props.note}
          </dd>

          <dt className={css(styles.term)}>Difficulty:</dt>
          <dd
            className={css(styles.definition)}
            data-testid='puzzle-difficulty'
          >
            {props.difficulty}/3
          </dd>

          <dt className={css(styles.term)}>Restrictions:</dt>
          <dd
            className={css(styles.definition)}
            data-testid={'puzzle-restrictions'}
          >
            {props.restrictions.length > 0
              ? [...props.restrictions].sort().map((restriction, index) => (
                  <React.Fragment key={index}>
                    <span title={RESTRICTIONS[restriction].description}>
                      {RESTRICTIONS[restriction].name}
                    </span>
                    {index !== props.restrictions.length - 1 && ', '}
                  </React.Fragment>
                ))
              : 'none'}
          </dd>
        </dl>
      </div>
    </div>
  )
})
