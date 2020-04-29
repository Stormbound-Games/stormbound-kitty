import React from 'react'
import { useLocation, Link } from 'react-router-dom'
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
  const [topActive, bottomActive] = props.active || []

  switch (topActive) {
    case 'HOME':
      return <NavHome active={bottomActive} />
    case 'BATTLE_SIM':
      return <NavBattleSim active={bottomActive} />
    case 'DECK_BUILDER':
      return <NavDeckBuilder active={bottomActive} />
    case 'CARD_BUILDER':
      return <NavCardBuilder active={bottomActive} />
    case 'LIST_BUILDER':
      return <NavListBuilder active={bottomActive} />
    case 'GUIDES':
      return <NavGuides active={bottomActive} />
    case 'STORIES':
      return <NavStories active={bottomActive} />
    case 'COLLECTION':
      return <NavCollection active={bottomActive} />
    default:
      return null
  }
}

const Wrapper = props => {
  const { pathname } = useLocation()
  const viewportWidth = useViewportWidth()
  const [isExpanded, expand] = React.useState(false)

  React.useEffect(() => {
    if (viewportWidth <= 700) expand(false)
  }, [pathname, viewportWidth])

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

export default React.memo(function Header(props) {
  const [topActive] = props.active || []

  return (
    <header role='banner' className='Header'>
      <Wrapper>
        <nav className='Header__nav'>
          <ul className='Header__list'>
            <Only.Desktop>
              <li className='Header__item'>
                <NavLink to='/' active={topActive === 'HOME'}>
                  <Icon icon='home' /> Home
                </NavLink>
              </li>
            </Only.Desktop>
            <li className='Header__item'>
              <NavLink to='/sim' active={topActive === 'BATTLE_SIM'}>
                <Icon icon='sword' /> Battle Sim
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/deck' active={topActive === 'DECK_BUILDER'}>
                <Icon icon='stack' /> Deck builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/collection' active={topActive === 'COLLECTION'}>
                <Icon icon='books' /> Collection
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/card' active={topActive === 'CARD_BUILDER'}>
                <Icon icon='wand' /> Card builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/list' active={topActive === 'LIST_BUILDER'}>
                <Icon icon='template' /> List Builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/stories' active={topActive === 'STORIES'}>
                <Icon icon='quill' /> Stories
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/guides' active={topActive === 'GUIDES'}>
                <Icon icon='compass' /> Guides
              </NavLink>
            </li>
          </ul>
        </nav>

        {Boolean(topActive) && <SubNav active={props.active} />}
      </Wrapper>
    </header>
  )
})
