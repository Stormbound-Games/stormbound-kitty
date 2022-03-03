import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Icon from '~/components/Icon'
import Link from '~/components/Link'
import VisuallyHidden from '~/components/VisuallyHidden'
import Notification from '~/components/Notification'
import styles from './styles'

const hasBeenShownYet = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return false
  }
}

export default React.memo(function EyeCatcher(props) {
  const { css } = useFela()
  const key = 'sb.eye_catcher.' + props.id
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const isCypress = window.Cypress
    const hasBeenSeen = hasBeenShownYet(key)

    setIsVisible(!isCypress & !hasBeenSeen)
  }, [key])

  React.useEffect(() => {
    localStorage.setItem(key, !isVisible)
  }, [key, isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <Notification as='div' isVisible={isVisible} extend={styles.container}>
      <div className={css({ '> p': { marginBottom: 0 } })}>
        {typeof props.children === 'function'
          ? props.children(setIsVisible)
          : props.children}{' '}
        <Link extend={styles.dismiss} onClick={() => setIsVisible(false)}>
          (Dismiss)
        </Link>
      </div>

      <BlankButton extend={styles.close} onClick={() => setIsVisible(false)}>
        <Icon icon='cross' />
        <VisuallyHidden>Dismiss</VisuallyHidden>
      </BlankButton>
    </Notification>
  )
})
