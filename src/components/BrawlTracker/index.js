import React from 'react'
import BrawlMilestones from '../BrawlMilestones'
import BrawlMatches from '../BrawlMatches'
import { BrawlContext } from '../BrawlProvider'
import BrawlCharts from '../BrawlCharts'
import BrawlDifficultySelect from '../BrawlDifficultySelect'
import BrawlOutcome from '../BrawlOutcome'
import BrawlRecommendedDecks from '../BrawlRecommendedDecks'
import BrawlReset from '../BrawlReset'
import BrawlSetup from '../BrawlSetup'
import GuideTeaser from '../GuideTeaser'
import Row from '../Row'
import Title from '../Title'
import { BRAWL_INDEX } from '../../constants/brawl'
import getGuide from '../../helpers/getGuide'
import getDailyCoinsCounter from '../../helpers/getDailyCoinsCounter'

export default React.memo(function BrawlTracker(props) {
  const [withPremiumPass, setWithPremiumPass] = React.useState(false)
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const { brawl: currentBrawl } = React.useContext(BrawlContext)
  const { title } = BRAWL_INDEX[currentBrawl.id] || {}
  const guide = getGuide(title, 'name')

  const wonMatches = currentBrawl.matches.filter(match =>
    ['WON', 'FORFEIT'].includes(match.status)
  )
  const getCoins = getDailyCoinsCounter({
    setup,
    league: 'BRAWL',
    withPremiumPass,
  })
  const income = Array.from({ length: wonMatches.length }).reduce(
    (acc, _) => acc + getCoins(),
    0
  )

  return (
    <div>
      <BrawlMilestones difficulty={props.difficulty} />
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>About your Brawl</Title>
          <BrawlOutcome income={income} />
          <BrawlDifficultySelect
            value={props.difficulty}
            onChange={event => props.setDifficulty(event.target.value)}
          />
          <BrawlSetup
            setup={setup}
            setSetup={setSetup}
            withPremiumPass={withPremiumPass}
            setWithPremiumPass={setWithPremiumPass}
          />
          <BrawlReset />
          {guide ? (
            <div>
              <GuideTeaser {...guide} />
            </div>
          ) : (
            <BrawlRecommendedDecks limit={1} columns={1} />
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          <BrawlMatches difficulty={props.difficulty} />
          <BrawlCharts income={income} />
        </Row.Column>
      </Row>
    </div>
  )
})
