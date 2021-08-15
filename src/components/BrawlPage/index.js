import React from 'react'
import { BRAWL_INDEX } from '../../constants/brawl'
import Page from '../Page'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import { getLongFaction } from '../../helpers/encoding'
import useRouter from '../../hooks/useRouter'

export default React.memo(function BrawlPage(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
  const { params } = useRouter()
  const id = params.id.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]
  const faction = getLongFaction(brawl.cardId.slice(0, 1))

  return (
    <Page
      title={brawl.title}
      description='Manage your Brawl, track your progress as well as your expenses and rewards'
      meta={brawl.label}
      action={{ to: '/brawl', children: 'Back to index' }}
      background={`/assets/images/banners/environment_${faction}.png`}
      withAvif
    >
      <BrawlProvider id={id} difficulty={difficulty}>
        <BrawlTracker difficulty={difficulty} setDifficulty={setDifficulty} />
      </BrawlProvider>
    </Page>
  )
})
