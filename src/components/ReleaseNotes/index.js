import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'
import releases from '../../data/releases'

export default React.memo(function ReleaseNotes(props) {
  return (
    <>
      <HeaderBanner title='Release Notes' />
      {chunk(releases, 3).map((row, index) => (
        <Row desktopOnly>
          <Column width='1/3'>
            {row[0] && <Teaser {...row[0]} to={`/changelog/${row[0].slug}`} />}
          </Column>
          <Column width='1/3'>
            {row[1] && <Teaser {...row[1]} to={`/changelog/${row[1].slug}`} />}
          </Column>
          <Column width='1/3'>
            {row[2] && <Teaser {...row[2]} to={`/changelog/${row[2].slug}`} />}
          </Column>
        </Row>
      ))}

      <Notice icon='compass'>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to{' '}
        <Link to='/changelog/cards'>the card changes</Link>.
      </Notice>

      <PageMeta
        title='Release Notes'
        description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
      />
    </>
  )
})
