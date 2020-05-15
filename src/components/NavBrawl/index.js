import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWLS } from '../../constants/brawl'
import NavLink from '../NavLink'

export default React.memo(function NavBrawl(props) {
  const match = useRouteMatch()
  const id = match.params.id
  const normalisedId = id ? id.toUpperCase().replace(/-/g, '_') : undefined

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/brawl' active={props.active === 'INDEX'}>
            Brawls
          </NavLink>
        </li>

        {id ? (
          <li className='Header__item'>
            <NavLink to={'/brawl/' + id} active={props.active === 'TRACKER'}>
              {BRAWLS.find(brawl => brawl.id === normalisedId).title}
            </NavLink>
          </li>
        ) : (
          <span
            className='Header__link Header__link--disabled'
            title='Select a Brawl from the list'
          >
            Tracker
          </span>
        )}

        <li className='Header__item  Header__item--right'>
          <NavLink to='/deck/suggestions?category=BRAWL'>Brawl Decks</NavLink>
        </li>
      </ul>
    </nav>
  )
})
