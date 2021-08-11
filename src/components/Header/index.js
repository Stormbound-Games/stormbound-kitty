import React from 'react'
import { useFela } from 'react-fela'
import { useLocation } from 'react-router-dom'
import HeaderMegaMenu from '../HeaderMegaMenu'
import NavLink from '../NavLink'
import NewPulse from '../NewPulse'
import Icon from '../Icon'
import load from '../../helpers/load'
import useNavigation from './useNavigation'
import styles from './styles'

const SubNav = React.memo(function (props) {
  const [topActive, midActive, bottomActive] = props.active || []

  if (topActive === 'TOOLS' && midActive === 'CARD_BUILDER') {
    const NavCardBuilder = load('NavCardBuilder')
    return <NavCardBuilder active={bottomActive} />
  }

  if (topActive === 'TOOLS' && midActive === 'DECK_BUILDER') {
    const NavDeckBuilder = load('NavDeckBuilder')
    return <NavDeckBuilder active={bottomActive} />
  }

  return null
})

export default React.memo(function Header(props) {
  const { css } = useFela()
  const [topActive] = props.active || []
  const [open, setOpen] = React.useState(null)
  const { pathname } = useLocation()
  const navigation = useNavigation()

  React.useEffect(() => setOpen(null), [pathname])

  return (
    <header role='banner' className={css(styles.header)}>
      <nav className={css(styles.nav)}>
        <ul className={css(styles.list)}>
          {navigation.map(item => (
            <React.Fragment key={item.label}>
              <li className={css(styles.item)}>
                {item.to ? (
                  <NavLink active={topActive === item.id} to={item.to}>
                    <Icon icon={item.icon} extend={styles.icon} /> {item.label}
                  </NavLink>
                ) : (
                  <button
                    type='button'
                    aria-expanded={open === item.id}
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    onMouseOver={() => setOpen(item.id)}
                    onMouseOut={() => setOpen(null)}
                    className={css(
                      styles.action({
                        isActive: topActive === item.id,
                        isOpen: open === item.id,
                      })
                    )}
                  >
                    <Icon icon={item.icon} extend={styles.icon} /> {item.label}
                  </button>
                )}
                {item.items.length > 0 ? (
                  <HeaderMegaMenu
                    onMouseOver={() => setOpen(item.id)}
                    onMouseOut={() => setOpen(null)}
                    active={props.active.slice(1)}
                    close={() => setOpen(null)}
                    columns={item.items}
                    open={open === item.id}
                  />
                ) : null}
                {item.new && (
                  <NewPulse extend={{ right: '1em', left: 'auto' }} />
                )}
              </li>
            </React.Fragment>
          ))}
          <li className={css(styles.item({ isRight: true }))}>
            <NavLink
              disabled={!props.isSearchReady}
              onClick={props.openSearch}
              active={topActive === 'SEARCH'}
            >
              <Icon extend={styles.icon} icon='search' /> Search
            </NavLink>
          </li>
        </ul>
      </nav>
      <SubNav active={props.active} />
    </header>
  )
})
