import React from 'react'
import { useFela } from 'react-fela'
import { useRouteMatch, useHistory } from 'react-router-dom'
import CardSelect from '../CardSelect'
import getRawCardData from '../../helpers/getRawCardData'
import useViewportSize from '../../hooks/useViewportSize'
import styles from '../Header/styles'

export default React.memo(function NavCardBuilder(props) {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()
  const history = useHistory()
  const match = useRouteMatch()
  const id = match.params.cardId

  return (
    <nav className={css(styles.nav({ isSubNav: true }))}>
      <ul className={css(styles.list)}>
        <li className={css(styles.item({ isSelect: true }))}>
          <CardSelect
            label='Load Card'
            id='card-select'
            name='card-select'
            noBorder={viewportWidth >= 700}
            current={getRawCardData(id).id}
            withClear={Boolean(getRawCardData(id).id)}
            disabledOptions={id ? [id] : undefined}
            onChange={option =>
              option
                ? history.push(`/card/${option.value}/display`)
                : history.push('/card')
            }
            withSpells
          />
        </li>
      </ul>
    </nav>
  )
})
