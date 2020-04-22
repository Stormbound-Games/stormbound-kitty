import React from 'react'
import { Link } from 'react-router-dom'
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

const Wrapper = props => {
  const viewportWidth = useViewportWidth()
  const [isExpanded, expand] = React.useState(false)

  if (viewportWidth > 700) {
    return props.children
  }

  return (
    <TogglableContent
      id='navigation'
      isExpanded={isExpanded}
      renderToggle={toggleProps => (
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
      )}
    >
      {props.children}
    </TogglableContent>
  )
}

const Header = props => (
  <header role='banner' className='Header'>
    <Wrapper>
      <nav className='Header__nav'>
        <ul className='Header__list'>
          <Only.Desktop>
            <li className='Header__item'>
              <NavLink to='/' active={props.active === 'HOME'}>
                <Icon icon='home' /> Home
              </NavLink>
            </li>
          </Only.Desktop>
          <li className='Header__item'>
            <NavLink to='/sim' active={props.active === 'BATTLE_SIM'}>
              <Icon icon='sword' /> Battle Sim
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/deck' active={props.active === 'DECK_BUILDER'}>
              <Icon icon='stack' /> Deck builder
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/collection' active={props.active === 'COLLECTION'}>
              <Icon icon='books' /> Collection
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/card' active={props.active === 'CARD_BUILDER'}>
              <Icon icon='wand' /> Card builder
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/list' active={props.active === 'LIST_BUILDER'}>
              <Icon icon='template' /> List Builder
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/stories' active={props.active === 'STORIES'}>
              <Icon icon='quill' /> Stories
            </NavLink>
          </li>
          <li className='Header__item'>
            <NavLink to='/guides' active={props.active === 'GUIDES'}>
              <Icon icon='compass' /> Guides
            </NavLink>
          </li>
        </ul>
      </nav>

      {Boolean(props.active) && <SubNav active={props.active} />}
    </Wrapper>
  </header>
)

export default Header
