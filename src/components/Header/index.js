import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import BattleSimNav from '../BattleSimNav'
import CardBuilderNav from '../CardBuilderNav'
import DeckBuilderNav from '../DeckBuilderNav'
import GuidesNav from '../GuidesNav'
import HomeNav from '../HomeNav'
import Icon from '../Icon'
import ListBuilderNav from '../ListBuilderNav'
import NavLink from '../NavLink'
import StoriesNav from '../StoriesNav'
import CollectionNav from '../CollectionNav'
import TogglableContent from '../TogglableContent'
import useViewportWidth from '../../helpers/useViewportWidth'
import './index.css'

const SubNav = props => {
  switch (props.active) {
    case 'HOME':
      return <HomeNav />
    case 'BATTLE_SIM':
      return <BattleSimNav />
    case 'DECK_BUILDER':
      return <DeckBuilderNav />
    case 'CARD_BUILDER':
      return <CardBuilderNav />
    case 'LIST_BUILDER':
      return <ListBuilderNav />
    case 'GUIDES':
      return <GuidesNav />
    case 'STORIES':
      return <StoriesNav />
    case 'COLLECTION':
      return <CollectionNav />
    default:
      return null
  }
}

const Header = props => {
  const viewportWidth = useViewportWidth()
  const { pathname } = useLocation()
  const [isExpanded, expand] = React.useState(false)

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
            <li className='Header__item Header__item--desktop'>
              <NavLink
                exact
                to='/'
                className={
                  pathname === '/brawl' ? 'Header__link--active' : undefined
                }
              >
                <Icon icon='home' /> Home
              </NavLink>
            </li>
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
