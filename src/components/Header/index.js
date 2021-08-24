import React from 'react'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import { UserContext } from '~/components/UserProvider'
import HeaderMegaMenu from '~/components/HeaderMegaMenu'
import Link from '~/components/Link'
import MobileHeader from '~/components/MobileHeader'
import NavCardBuilder from '~/components/NavCardBuilder'
import NavDeckBuilder from '~/components/NavDeckBuilder'
import NewPulse from '~/components/NewPulse'
import Icon from '~/components/Icon'
import useIsMounted from '~/hooks/useIsMounted'
import styles from './styles'

const SubNav = React.memo(function SubNav(props) {
  const [item, sub] = props.active

  if (item === 'CARD_BUILDER') return <NavCardBuilder />
  if (item === 'DECK_BUILDER') return <NavDeckBuilder active={sub} />
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

const useNavigation = (navigation = []) => {
  const { isUnseen } = React.useContext(PersonalDecksContext)
  const { name } = React.useContext(UserContext)

  if (!name && !isUnseen) return navigation

  const feed = name && {
    label: 'Personal Feed',
    to: `/members/${name}`,
    id: 'FEED',
  }

  return navigation.map(category => {
    if (category.id !== 'TOOLS') return category

    const items = category.items.map(column => {
      if (column.id !== 'YOUR_CONTENT') return column

      const items = column.items.map(item => {
        if (item.id !== 'DECK_COLLECTION') return item

        return { ...item, new: isUnseen }
      })

      return { ...column, items: [feed, ...items].filter(Boolean) }
    })

    return { ...category, new: isUnseen, items }
  })
}

export default React.memo(function Header(props) {
  const isMounted = useIsMounted()
  const { css } = useFela()
  const [open, setOpen] = React.useState(null)
  const { asPath } = useRouter()
  const navigation = useNavigation(props.navigation)

  React.useEffect(() => setOpen(null), [asPath])

  return (
    <header role='banner' className={css(styles.header)}>
      <MobileHeader />

      <nav className={css(styles.nav)}>
        <ul className={css(styles.list)}>
          {navigation.map(item => (
            <li key={item.label} className={css(styles.item)}>
              <HeaderItem
                {...item}
                active={props.active.slice(1)}
                isActive={props.active[0] === item.id}
                isOpen={open === item.id}
                setOpen={setOpen}
              />
            </li>
          ))}
          <li className={css(styles.item({ isRight: true }))}>
            <Link
              disabled={!isMounted}
              onClick={props.openSearch}
              extend={styles.action}
              data-testid='search-button'
            >
              <Icon extend={styles.icon} icon='search' /> Search
            </Link>
          </li>
        </ul>
      </nav>
      <SubNav active={props.active.slice(2)} />
    </header>
  )
})
