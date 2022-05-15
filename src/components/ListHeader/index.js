import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Icon from '~/components/Icon'
import Select from '~/components/Select'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function ListHeader(props) {
  const { css } = useFela()
  const sorting = props.sorting || []

  return (
    <div className={css(styles.header)}>
      <p className={css(styles.label)}>{props.children}</p>
      <div className={css(styles.filter)}>{props.filtering}</div>
      <div className={css(styles.sort)}>
        {sorting.length > 0 && (
          <Select
            id='order'
            label='Sort by'
            hideLabel
            extend={styles.select}
            value={props.order}
            onChange={event => props.setOrder(event.target.value)}
          >
            <option value='' disabled>
              Sort by…
            </option>
            {sorting.map(order => (
              <option value={order.value} key={order.value}>
                Sort by {order.title}
              </option>
            ))}
          </Select>
        )}
      </div>
      <div className={css(styles.layout)}>
        <BlankButton
          extend={styles.layoutButton}
          aria-pressed={props.layout === 'LIST'}
          onClick={() => props.setLayout('LIST')}
        >
          <Icon icon='list' />
          <VisuallyHidden>List layout</VisuallyHidden>
        </BlankButton>
        <BlankButton
          extend={styles.layoutButton}
          aria-pressed={props.layout === 'GRID'}
          onClick={() => props.setLayout('GRID')}
        >
          <Icon icon='table' />
          <VisuallyHidden>Grid layout</VisuallyHidden>
        </BlankButton>
      </div>
    </div>
  )
})
