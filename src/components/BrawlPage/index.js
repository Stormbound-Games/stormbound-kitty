import React from 'react'
import Page from '~/components/Page'
import BrawlProvider from '~/components/BrawlProvider'
import BrawlTracker from '~/components/BrawlTracker'
import { getLongFaction } from '~/helpers/encoding'

export default React.memo(function BrawlPage(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
  const { brawl } = props
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
      <BrawlProvider brawl={brawl} difficulty={difficulty}>
        <BrawlTracker
          {...props}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </BrawlProvider>
    </Page>
  )
})
