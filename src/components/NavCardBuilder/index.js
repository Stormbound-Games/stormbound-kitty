import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import CardSelect from '../CardSelect'
import NavLink from '../NavLink'
import Only from '../Only'

export default React.memo(function NavCardBuilder(props) {
  const history = useHistory()
  const match = useRouteMatch()
  const id = match.params.cardId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink
            to={id ? `/card/${id}` : '/card'}
            active={props.active === 'EDITOR'}
          >
            Editor
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink
              to={`/card/${id}/display`}
              active={props.active === 'DISPLAY'}
            >
              Display mode
            </NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your card is empty'
            >
              Display mode
            </span>
          )}
        </li>

        <li className='Header__item Header__item--select'>
          <CardSelect
            label='Load card'
            id='card-select'
            name='card-select'
            current={id}
            onChange={option =>
              option
                ? history.push(
                    '/card/' +
                      option.value +
                      (props.active === 'DISPLAY' ? '/display' : '')
                  )
                : history.push('/card')
            }
            withSpells
          />
        </li>

        <Only.Desktop>
          <li className='Header__item Header__item--right'>
            <NavLink to='/card/contest' active={props.active === 'CONTEST'}>
              Card Contest
            </NavLink>
          </li>
        </Only.Desktop>
      </ul>
    </nav>
  )
})
