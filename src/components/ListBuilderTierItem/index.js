import React from 'react'
import { Reorder } from 'framer-motion'
import { useFela } from 'react-fela'
import DiamondButton from '~/components/DiamondButton'
import Link from '~/components/Link'
import Image from '~/components/Image'
import styles from './styles'

export default React.memo(function ListBuilderTierItem(props) {
  const { css } = useFela({ isEditable: props.isEditable })

  if (!props.isEditable) {
    return (
      <li
        className={css(styles.item)}
        style={{ '--color': `var(--${props.faction})` }}
      >
        <Image
          src={props.image}
          alt={props.name}
          extend={styles.image}
          width={60}
          height={60}
          lazy
        />
        <p className={css(styles.content)}>
          <Link to={`/cards/${props.id}`} extend={styles.name}>
            {props.name}
          </Link>
          <span className={css(styles.meta)}>
            {[props.rarity, props.faction, props.race, props.type]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </p>
      </li>
    )
  }

  return (
    <Reorder.Item
      value={props.id}
      className={css(styles.item)}
      style={{ '--color': `var(--${props.faction})` }}
      drag
    >
      <Image
        src={props.image}
        alt={props.name}
        extend={styles.image}
        width={60}
        height={60}
        lazy
      />
      <p className={css(styles.content)}>
        <span className={css(styles.name)}>{props.name}</span>
        <span className={css(styles.meta)}>
          {[props.rarity, props.faction, props.race, props.type]
            .filter(Boolean)
            .join(' · ')}
        </span>
      </p>
      <DiamondButton
        extend={styles.button}
        onClick={() => props.removeCard(props.id)}
        icon='bin'
        label={'Remove ' + props.name + ' from tier'}
      />
    </Reorder.Item>
  )
})
