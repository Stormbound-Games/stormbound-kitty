import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import HeaderMegaMenu from '~/components/HeaderMegaMenu'
import Link from '~/components/Link'
import NavCardBuilder from '~/components/NavCardBuilder'
import NavDeckBuilder from '~/components/NavDeckBuilder'
import NewPulse from '~/components/NewPulse'
import Icon from '~/components/Icon'
import useIsMounted from '~/hooks/useIsMounted'
import useNavigation from './useNavigation'
import styles from './styles'

const SubNav = React.memo(function SubNav(props) {
  const [topActive, midActive, bottomActive] = props.active || []

  if (topActive === 'TOOLS' && midActive === 'CARD_BUILDER') {
    return <NavCardBuilder />
  }

  if (topActive === 'TOOLS' && midActive === 'DECK_BUILDER') {
    return <NavDeckBuilder active={bottomActive} />
  }

  return null
})

const HeaderItem = props => {
  const styleProps = { isActive: props.isActive, isOpen: props.isOpen }
  const isMounted = useIsMounted()
  const { css } = useFela(styleProps)

  if (!isMounted) {
    return (
      <details>
        <summary className={css(styles.action)}>
          <Icon icon={props.icon} extend={styles.icon} /> {props.label}
          {props.new && <NewPulse extend={{ right: 0, left: 'auto' }} />}
        </summary>
        <HeaderMegaMenu active={props.active} columns={props.items} open />
      </details>
    )
  }

  return (
    <>
      {props.to ? (
        <Link to={props.to} extend={styles.action(styleProps)}>
          <Icon icon={props.icon} extend={styles.icon} /> {props.label}
        </Link>
      ) : (
        <Link
          aria-expanded={props.isOpen}
          onClick={() => props.setOpen(props.isOpen ? null : props.id)}
          onMouseOver={() => props.setOpen(props.id)}
          onMouseOut={() => props.setOpen(null)}
          extend={styles.action(styleProps)}
        >
          <Icon icon={props.icon} extend={styles.icon} /> {props.label}
        </Link>
      )}
      {props.items.length > 0 ? (
        <HeaderMegaMenu
          onMouseOver={() => props.setOpen(props.id)}
          onMouseOut={() => props.setOpen(null)}
          active={props.active}
          close={() => props.setOpen(null)}
          columns={props.items}
          open={props.isOpen}
        />
      ) : null}
      {props.new && <NewPulse extend={{ right: '1em', left: 'auto' }} />}
    </>
  )
}

export default React.memo(function Header(props) {
  const isMounted = useIsMounted()
  const { css } = useFela()
  const [topActive] = props.active || []
  const [open, setOpen] = React.useState(null)
  const { asPath } = useRouter()
  const navigation = useNavigation()

  React.useEffect(() => setOpen(null), [asPath])

  return (
    <header role='banner' className={css(styles.header)}>
      <nav className={css(styles.nav)}>
        <ul className={css(styles.list)}>
          {navigation.map(item => (
            <React.Fragment key={item.label}>
              <li className={css(styles.item)}>
                <HeaderItem
                  {...item}
                  active={props.active.slice(1)}
                  isActive={topActive === item.id}
                  isOpen={open === item.id}
                  setOpen={setOpen}
                />
              </li>
            </React.Fragment>
          ))}
          {isMounted && (
            <li className={css(styles.item({ isRight: true }))}>
              <Link
                onClick={props.openSearch}
                extend={styles.action({ isActive: topActive === 'SEARCH' })}
                data-testid='search-button'
              >
                <Icon extend={styles.icon} icon='search' /> Search
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <SubNav active={props.active} />
    </header>
  )
})
