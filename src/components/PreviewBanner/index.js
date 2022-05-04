import React from 'react'
import Link from '~/components/Link'
import Notification from '~/components/Notification'

export default React.memo(function PreviewBanner() {
  const [withTurnOff, setWithTurnOff] = React.useState(false)

  React.useEffect(() => {
    // Only provide a way to turn off the preview mdoe when *not* rendered
    // inside an iframe. This is to avoid being able to turn off the preview
    // mode when iframed in the CMS.
    setWithTurnOff(window.self === window.top)
  }, [])

  return (
    <Notification
      as='div'
      isVisible={true}
      extend={{ borderColor: 'var(--light-ironclad)' }}
      icon='eye'
    >
      The content preview mode is currently enabled.{' '}
      {withTurnOff && (
        <>
          <Link href='/api/preview?type=clear'>Turn off content preview</Link>.
        </>
      )}
    </Notification>
  )
})
