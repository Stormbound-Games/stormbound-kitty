import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWLS } from '../../constants/brawl'
import NavLink from '../NavLink'
import hasBrawlData from '../../helpers/hasBrawlData'

export default React.memo(function NavBrawl(props) {
  const match = useRouteMatch()
  const id = match.params.id
  const normalisedId = id ? id.toUpperCase().replace(/-/g, '_') : undefined
  const brawl = BRAWLS.find(brawl => brawl.id === normalisedId)

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/brawl' active={props.active === 'INDEX'}>
            Brawls
          </NavLink>
        </li>

        {brawl ? (
          <li className='Header__item'>
            <NavLink to={'/brawl/' + id} active={props.active === 'TRACKER'}>
              {brawl.title}
            </NavLink>
          </li>
        ) : (
          <span
            className='Header__action Header__action--disabled'
            title='Select a Brawl from the list'
          >
            Tracker
          </span>
        )}

        {hasBrawlData() ? (
          <li className='Header__item'>
            <NavLink to='/brawl/overview' active={props.active === 'OVERVIEW'}>
              Overview
            </NavLink>
          </li>
        ) : (
          <span
            className='Header__action Header__action--disabled'
            title='You need some recorded Brawl data first'
          >
            Overview
          </span>
        )}

        <li className='Header__item  Header__item--right'>
          <NavLink to='/deck/suggestions?category=BRAWL'>Brawl Decks</NavLink>
        </li>
      </ul>
    </nav>
  )
})
