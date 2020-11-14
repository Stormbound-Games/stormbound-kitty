import React from 'react'
import BrawlMilestones from '../BrawlMilestones'
import BrawlMatches from '../BrawlMatches'
import Column from '../Column'
import { BrawlContext } from '../BrawlProvider'
import BrawlCharts from '../BrawlCharts'
import BrawlOutcome from '../BrawlOutcome'
import BrawlRecommendedDecks from '../BrawlRecommendedDecks'
import BrawlReset from '../BrawlReset'
import BrawlSetup from '../BrawlSetup'
import GuideTeaser from '../GuideTeaser'
import Row from '../Row'
import Title from '../Title'
import { BRAWL_INDEX } from '../../constants/brawl'
import getGuide from '../../helpers/getGuide'

export default React.memo(function BrawlTracker(props) {
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const { brawl: currentBrawl } = React.useContext(BrawlContext)
  const { title } = BRAWL_INDEX[currentBrawl.id] || {}
  const guide = getGuide(title, 'name')

  return (
    <div>
      <BrawlMilestones />
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>About your Brawl</Title>
          <BrawlOutcome setup={setup} />
          <BrawlSetup setup={setup} setSetup={setSetup} />
          <BrawlReset />
          {guide ? (
            <div>
              <GuideTeaser {...guide} />
            </div>
          ) : (
            <BrawlRecommendedDecks limit={1} columns={1} />
          )}
        </Column>
        <Column width='2/3'>
          <BrawlMatches />
          <BrawlCharts setup={setup} />
        </Column>
      </Row>
    </div>
  )
})
