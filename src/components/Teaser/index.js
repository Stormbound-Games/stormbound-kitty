import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Card from '../Card'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import styles from './styles'

export default React.memo(function Teaser(props) {
  const { css } = useFela({ isLarge: props.large })
  const card = props.card || getResolvedCardData({ level: 5, id: props.cardId })
  const title = props.title

  return (
    <div className={css(styles.teaser)} data-testid={props['data-testid']}>
      <div
        className={css(styles.header)}
        style={{
          '--color': `var(--light-${card.faction}, var(--dark-beige))`,
        }}
      >
        <div className={css(styles.card)}>
          <Card {...card} />
        </div>
      </div>
      <div className={css(styles.body)}>
        {props.meta && <p className={css(styles.meta)}>{props.meta}</p>}
        <h2 className={css(styles.title)}>
          {props.to || props.href ? (
            <Link
              className={css(styles.link)}
              to={props.to}
              href={props.href}
              target={props.href ? '_blank' : undefined}
              rel={props.href ? 'noopener noreferrer' : undefined}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className={css(styles.excerpt)}>{props.excerpt}</p>
      </div>
    </div>
  )
})
