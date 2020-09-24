import React from 'react'
import BrawlMilestones from '../BrawlMilestones'
import BrawlMatches from '../BrawlMatches'
import Column from '../Column'
import BrawlCharts from '../BrawlCharts'
import BrawlOutcome from '../BrawlOutcome'
import BrawlRecommendedDecks from '../BrawlRecommendedDecks'
import BrawlReset from '../BrawlReset'
import BrawlSetup from '../BrawlSetup'
import Row from '../Row'
import Title from '../Title'

export default React.memo(function BrawlTracker(props) {
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')

  return (
    <div>
      <BrawlMilestones />
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>About your Brawl</Title>
          <BrawlOutcome setup={setup} />
          <BrawlSetup setup={setup} setSetup={setSetup} />
          <BrawlReset />
          <BrawlRecommendedDecks limit={1} columns={1} />
        </Column>
        <Column width='2/3'>
          <BrawlMatches />
          <BrawlCharts setup={setup} />
        </Column>
      </Row>
    </div>
  )
})
