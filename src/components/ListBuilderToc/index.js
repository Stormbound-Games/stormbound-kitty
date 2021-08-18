import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Spacing from '~/components/Spacing'
import generateId from '~/helpers/generateId'
import { TIER_COLORS } from '~/constants/list'
import styles from './styles'

export default React.memo(function ListBuilderToc(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        This list features{' '}
        {props.tiers.map(tier => tier.cards.length).reduce((a, b) => a + b, 0)}{' '}
        cards across the following {props.tiers.length} tiers:
      </p>

      <Spacing bottom='LARGE'>
        <ol className={css(styles.list)}>
          {props.tiers.map((tier, index) => (
            <li
              className={css(styles.item, { '--color': TIER_COLORS[index] })}
              key={tier.name + index}
            >
              <Link href={'#' + generateId(tier.name)}>{tier.name}</Link> (
              {tier.cards.length} card
              {tier.cards.length === 1 ? '' : 's'})
            </li>
          ))}
        </ol>
      </Spacing>
    </>
  )
})
