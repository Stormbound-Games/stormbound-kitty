import React from 'react'
import Link from '~/components/Link'
import Notification from '~/components/Notification'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function UpgradeNotification(props) {
  const isMounted = useIsMounted()

  return (
    <Notification isVisible>
      A new version of the site is available.{' '}
      {isMounted ? (
        <Link onClick={props.upgrade}>Please reload the page</Link>
      ) : (
        'Please reload the page'
      )}{' '}
      to update to the latest version.
    </Notification>
  )
})
