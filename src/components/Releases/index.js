import React from 'react'
import Link from '../Link'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'
import releases from '../../data/releases'

export default React.memo(function Releases(props) {
  return (
    <>
      <HeaderBanner title='Releases' />

      {chunk(releases, 3).map((row, index) => (
        <Row
          key={index}
          desktopOnly
          wideGutter
          spacing={{ bottom: ['NONE', 'BASE'] }}
        >
          <Row.Column width='1/3'>
            {row[0] && (
              <Teaser
                {...row[0]}
                title={row[0].name}
                to={`/releases/${row[0].slug}`}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[1] && (
              <Teaser
                {...row[1]}
                title={row[1].name}
                to={`/releases/${row[1].slug}`}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[2] && (
              <Teaser
                {...row[2]}
                title={row[2].name}
                to={`/releases/${row[2].slug}`}
              />
            )}
          </Row.Column>
        </Row>
      ))}

      <Notice icon='compass'>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to <Link to='/changelog'>the card changelog</Link>
        .
      </Notice>

      <PageMeta
        title='Release Notes'
        description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
      />
    </>
  )
})
