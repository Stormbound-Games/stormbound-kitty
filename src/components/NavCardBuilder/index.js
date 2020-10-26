import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import CardSelect from '../CardSelect'
import getRawCardData from '../../helpers/getRawCardData'
import useViewportWidth from '../../hooks/useViewportWidth'

export default React.memo(function NavCardBuilder(props) {
  const viewportWidth = useViewportWidth()
  const history = useHistory()
  const match = useRouteMatch()
  const id = match.params.cardId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item Header__item--select'>
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
