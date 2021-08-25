import React from 'react'
import { useRouter } from 'next/router'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Icon from '~/components/Icon'
import Link from '~/components/Link'
import useIsMounted from '~/hooks/useIsMounted'
import styles from './styles'

export default React.memo(function MobileHeader(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const isMounted = useIsMounted()
  const { asPath } = useRouter()
  const { css } = useFela({ isMenuOpen })

  React.useEffect(() => setIsMenuOpen(false), [asPath])

  return (
    <div className={css(styles.nav)}>
      <BlankButton
        extend={styles.left}
        onClick={() => setIsMenuOpen(open => !open)}
      >
        <Icon icon={isMenuOpen ? 'cross' : 'hamburger'} />
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
