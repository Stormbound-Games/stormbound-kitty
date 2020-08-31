import React from 'react'
import { useLocation } from 'react-router-dom'
import HeaderMegaMenu from '../HeaderMegaMenu'
import NavBattleSim from '../NavBattleSim'
import NavCardBuilder from '../NavCardBuilder'
import NavDeckBuilder from '../NavDeckBuilder'
import NavListBuilder from '../NavListBuilder'
import NavLink from '../NavLink'
import Icon from '../Icon'
import useNavigation from './useNavigation'
import './index.css'

const SubNav = React.memo(function (props) {
  const [topActive, midActive, bottomActive] = props.active || []

  if (topActive === 'TOOLS' && midActive === 'CARD_BUILDER') {
    return <NavCardBuilder active={bottomActive} />
  }

  if (topActive === 'TOOLS' && midActive === 'BATTLE_SIM') {
    return <NavBattleSim active={bottomActive} />
  }

  if (topActive === 'TOOLS' && midActive === 'LIST_BUILDER') {
    return <NavListBuilder active={bottomActive} />
  }

  if (topActive === 'TOOLS' && midActive === 'DECK_BUILDER') {
    return <NavDeckBuilder active={bottomActive} />
  }

  return null
})

export default React.memo(function Header(props) {
  const [topActive, subActive] = props.active || []
  const [open, setOpen] = React.useState(null)
  const { pathname } = useLocation()
  const navigation = useNavigation()

  React.useEffect(() => setOpen(null), [pathname])

  return (
    <header role='banner' className='Header'>
      <nav className='Header__nav'>
        <ul className='Header__list'>
          {navigation.map(item => (
            <React.Fragment key={item.label}>
              <li
                className={['Header__item', item.new && 'Header__item--new']
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.to ? (
                  <NavLink active={topActive === item.id} to={item.to}>
                    <Icon icon={item.icon} className='Header__icon' />{' '}
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    type='button'
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    className={[
                      'Header__action',
                      topActive === item.id && 'Header__action--active',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <Icon icon={item.icon} className='Header__icon' />{' '}
                    {item.label}
                  </button>
                )}
                {item.items.length > 0 ? (
                  <HeaderMegaMenu
                    active={subActive}
                    close={() => setOpen(null)}
                    columns={item.items}
                    open={open === item.id}
                  />
                ) : null}
              </li>
            </React.Fragment>
          ))}
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
      <SubNav active={props.active} />
    </header>
  )
})
