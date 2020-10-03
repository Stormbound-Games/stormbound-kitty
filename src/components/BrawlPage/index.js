import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWLS } from '../../constants/brawl'
import BrawlHeader from '../BrawlHeader'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import PageMeta from '../PageMeta'

export default React.memo(function BrawlPage(props) {
  const match = useRouteMatch()
  const id = match.params.id.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWLS.find(brawl => brawl.id === id)

  return (
    <>
      <BrawlProvider id={id}>
        <BrawlHeader />
        <BrawlTracker />
      </BrawlProvider>

      <PageMeta
        title={'Brawl – ' + brawl.title}
        description='Manage your Brawl, track your progress as well as your expenses and rewards'
      />
    </>
  )
})
