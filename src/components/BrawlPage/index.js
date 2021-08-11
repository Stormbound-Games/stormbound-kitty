import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BRAWL_INDEX } from '../../constants/brawl'
import Article from '../Article'
import BrawlProvider from '../BrawlProvider'
import BrawlTracker from '../BrawlTracker'
import { getLongFaction } from '../../helpers/encoding'

export default React.memo(function BrawlPage(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
  const match = useRouteMatch()
  const id = match.params.id.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]
  const faction = getLongFaction(brawl.cardId.slice(0, 1))

  return (
    <Article
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
    </Article>
  )
})
