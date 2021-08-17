import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Teasers from '~/components/Teasers'
import RELEASES from '~/data/releases'

const ITEMS = RELEASES.map(release => ({
  ...release,
  title: release.name,
  to: `/releases/${release.slug}`,
}))

export default React.memo(function Releases(props) {
  return (
    <Page
      title='Releases'
      description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
    >
      <Teasers items={ITEMS} />

      <Notice icon='compass' spacing={{ top: 'LARGER' }}>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to <Link to='/changelog'>the card changelog</Link>
        .
      </Notice>
    </Page>
  )
})
