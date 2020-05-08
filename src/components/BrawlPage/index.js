import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWLS } from '../../constants/brawl'
import { getLongFaction } from '../../helpers/encoding'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'

export default React.memo(function BrawlPage(props) {
  const match = useRouteMatch()
  const id = match.params.id.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWLS.find(brawl => brawl.id === id)
  const faction = getLongFaction(brawl.cardId.slice(0, 1))

  return (
    <>
      <HeaderBanner
        title={brawl.title}
        background={`/assets/images/environment_${faction}.png`}
      />
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
