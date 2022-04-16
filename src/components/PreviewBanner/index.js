import React from 'react'
import Link from '~/components/Link'
import Notification from '~/components/Notification'

export default React.memo(function PreviewBanner() {
  return (
    <Notification
      as='div'
      isVisible={true}
      extend={{ borderColor: 'var(--light-ironclad)' }}
      icon='eye'
    >
      The content preview mode is currently enabled.{' '}
      <Link href='/api/preview?type=clear'>Turn off content preview</Link>.
    </Notification>
  )
})
