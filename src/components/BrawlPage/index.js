import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWLS } from '../../constants/brawl'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'

export default React.memo(function BrawlPage(props) {
  const match = useRouteMatch()
  const id = match.params.id
  const brawl = BRAWLS.find(brawl => brawl.id === id)

  return (
    <>
      <HeaderBanner title={brawl.label} />
      <BrawlProvider id={id}>
        <BrawlTracker />
      </BrawlProvider>

      <PageMeta
        title={'Brawl Page — ' + brawl.title}
        description='Manage your Brawl, track your progress as well as your expenses and rewards'
      />
    </>
  )
})
