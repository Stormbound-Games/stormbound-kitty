import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import ListHeader from '~/components/ListHeader'
import ListLayoutItem from '~/components/ListLayoutItem'
import Notice from '~/components/Notice'
import Teasers from '~/components/Teasers'

export default React.memo(function PageReleases(props) {
  const [layout, setLayout] = React.useState('GRID')
  const items = props.releases.map(release => ({
    ...release,
    to: `/releases/${release.slug}`,
  }))

  return (
    <>
      <Page
        title='Releases'
        description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
        isEditorialContent
      >
        <ListHeader layout={layout} setLayout={setLayout}>
          {items.length} {items.length === 1 ? 'release' : 'releases'}
        </ListHeader>

        {layout === 'GRID' ? (
          <Teasers items={items} />
        ) : layout === 'LIST' ? (
          items.map(release => (
            <ListLayoutItem
              key={release.title}
              title={release.title}
              author={release.author}
              date={release.date}
              excerpt={release.excerpt}
              path={`/releases/${release.slug}`}
              icon='bullhorn'
            />
          ))
        ) : null}
      </Page>

      <Notice icon='compass' spacing={{ top: ['LARGE', 'LARGER'] }}>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to <Link to='/changelog'>the card changelog</Link>
        .
      </Notice>
    </>
  )
})
