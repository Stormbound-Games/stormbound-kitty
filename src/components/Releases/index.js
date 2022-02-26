import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Teasers from '~/components/Teasers'

export default React.memo(function Releases(props) {
  const items = props.releases.map(release => ({
    ...release,
    title: release.title,
    to: `/releases/${release.slug}`,
  }))

  return (
    <Page
      title='Releases'
      description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
    >
      <Teasers items={items} />

      <Notice icon='compass' spacing={{ top: ['LARGE', 'LARGER'] }}>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to <Link to='/changelog'>the card changelog</Link>
        .
      </Notice>
    </Page>
  )
})
