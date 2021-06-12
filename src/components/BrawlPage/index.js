import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWL_INDEX } from '../../constants/brawl'
import BrawlHeader from '../BrawlHeader'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import PageMeta from '../PageMeta'

export default React.memo(function BrawlPage(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
  const match = useRouteMatch()
  const id = match.params.id.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]

  return (
    <>
      <BrawlProvider id={id} difficulty={difficulty}>
        <BrawlHeader />
        <BrawlTracker difficulty={difficulty} setDifficulty={setDifficulty} />
      </BrawlProvider>

      <PageMeta
        title={'Brawl – ' + brawl.title}
        description='Manage your Brawl, track your progress as well as your expenses and rewards'
      />
    </>
  )
})
