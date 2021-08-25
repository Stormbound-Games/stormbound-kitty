import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Icon from '~/components/Icon'
import Link from '~/components/Link'
import useIsMounted from '~/hooks/useIsMounted'
import styles from './styles'

export default React.memo(function MobileHeader(props) {
  const isMounted = useIsMounted()
  const { css } = useFela({ isMenuOpen: props.isMenuOpen })

  return (
    <div className={css(styles.nav)}>
      <BlankButton
        extend={styles.left}
        onClick={() => props.setIsMenuOpen(open => !open)}
      >
        <Icon icon={props.isMenuOpen ? 'cross' : 'hamburger'} />
      </BlankButton>
      <Link to='/' extend={styles.middle}>
        Stormbound-Kitty
      </Link>
      <BlankButton
        extend={styles.right}
        disabled={!isMounted}
        onClick={props.openSearch}
      >
        <Icon icon='search' />
      </BlankButton>
    </div>
  )
})
