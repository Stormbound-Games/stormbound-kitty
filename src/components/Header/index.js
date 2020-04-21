import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavBattleSim from '../NavBattleSim'
import NavCardBuilder from '../NavCardBuilder'
import NavCollection from '../NavCollection'
import NavDeckBuilder from '../NavDeckBuilder'
import NavGuides from '../NavGuides'
import NavHome from '../NavHome'
import Icon from '../Icon'
import NavListBuilder from '../NavListBuilder'
import NavLink from '../NavLink'
import Only from '../Only'
import NavStories from '../NavStories'
import TogglableContent from '../TogglableContent'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

const SubNav = props => {
  switch (props.active) {
    case 'HOME':
      return <NavHome />
    case 'BATTLE_SIM':
      return <NavBattleSim />
    case 'DECK_BUILDER':
      return <NavDeckBuilder />
    case 'CARD_BUILDER':
      return <NavCardBuilder />
    case 'LIST_BUILDER':
      return <NavListBuilder />
    case 'GUIDES':
      return <NavGuides />
    case 'STORIES':
      return <NavStories />
    case 'COLLECTION':
      return <NavCollection />
    default:
      return null
  }
}

const Header = props => {
  const viewportWidth = useViewportWidth()
  const { pathname } = useLocation()
  const [isExpanded, expand] = React.useState(false)

  React.useEffect(() => expand(false), [pathname])

  return (
    <header role='banner' className='Header'>
      <TogglableContent
        id='navigation'
        isExpanded={viewportWidth > 700 ? true : isExpanded}
        renderToggle={toggleProps =>
          viewportWidth > 700 ? null : (
            <>
              <button
                {...toggleProps}
                type='button'
                onClick={() => expand(s => !s)}
                className='Header__toggle'
                title={isExpanded ? 'Close menu' : 'Open menu'}
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              >
                ☰
              </button>
              <Link to='/' className='Header__title'>
                Stormbound Kitty
              </Link>
            </>
          )
        }
      >
        <nav className='Header__nav'>
          <ul className='Header__list'>
            <Only.Desktop>
              <li className='Header__item'>
                <NavLink
                  exact
                  to='/'
                  className={
                    ['/brawl', '/faq'].includes(pathname)
                      ? 'Header__link--active'
                      : undefined
                  }
                >
                  <Icon icon='home' /> Home
                </NavLink>
              </li>
            </Only.Desktop>
            <li className='Header__item'>
              <NavLink to='/sim'>
                <Icon icon='sword' /> Battle Sim
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/deck'>
                <Icon icon='stack' /> Deck builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/collection'>
                <Icon icon='books' /> Collection
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/card'>
                <Icon icon='wand' /> Card builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/list'>
                <Icon icon='template' /> List Builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/stories'>
                <Icon icon='quill' /> Stories
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/guides'>
                <Icon icon='compass' /> Guides
              </NavLink>
            </li>
          </ul>
        </nav>

        {Boolean(props.active) && <SubNav active={props.active} />}
      </TogglableContent>
    </header>
  )
}

export default Header
