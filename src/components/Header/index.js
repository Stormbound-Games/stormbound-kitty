import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import NavBattleSim from '../NavBattleSim'
import NavBrawl from '../NavBrawl'
import NavCardBuilder from '../NavCardBuilder'
import NavCollection from '../NavCollection'
import NavDecks from '../NavDecks'
import NavGuides from '../NavGuides'
import NavHome from '../NavHome'
import Icon from '../Icon'
import NavListBuilder from '../NavListBuilder'
import NavLink from '../NavLink'
import Only from '../Only'
import NavStories from '../NavStories'
import StructuredData from '../StructuredData'
import TogglableContent from '../TogglableContent'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

const SubNav = React.memo(function (props) {
  const [topActive, bottomActive] = props.active || []

  switch (topActive) {
    case 'HOME':
      return <NavHome active={bottomActive} />
    case 'BATTLE_SIM':
      return <NavBattleSim active={bottomActive} />
    case 'BRAWL':
      return <NavBrawl active={bottomActive} />
    case 'DECKS':
      return <NavDecks active={bottomActive} />
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
})

const Wrapper = React.memo(function HeaderWrapper(props) {
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
})

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
                  <Icon className='Header__icon' icon='home' /> Home
                </NavLink>
              </li>
            </Only.Desktop>
            <li className='Header__item'>
              <NavLink to='/guides' active={topActive === 'GUIDES'}>
                <Icon className='Header__icon' icon='compass' /> Guides
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/deck/suggestions' active={topActive === 'DECKS'}>
                <Icon className='Header__icon' icon='stack' /> Decks
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/brawl' active={topActive === 'BRAWL'}>
                <Icon className='Header__icon' icon='crown' /> Brawl
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/collection' active={topActive === 'COLLECTION'}>
                <Icon className='Header__icon' icon='books' /> Collection
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/card' active={topActive === 'CARD_BUILDER'}>
                <Icon className='Header__icon' icon='wand' /> Card Builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/list' active={topActive === 'LIST_BUILDER'}>
                <Icon className='Header__icon' icon='sword' /> List Builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/stories' active={topActive === 'STORIES'}>
                <Icon className='Header__icon' icon='quill' /> Stories
              </NavLink>
            </li>
            {props.isSearchReady && (
              <li className='Header__item Header__item--right'>
                <NavLink
                  onClick={props.openSearch}
                  active={topActive === 'SEARCH'}
                >
                  <Icon className='Header__icon' icon='search' /> Search
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {Boolean(topActive) && <SubNav active={props.active} />}
      </Wrapper>
      <StructuredData type='LOGO' />
    </header>
  )
})
