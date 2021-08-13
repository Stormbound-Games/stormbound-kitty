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
import Teaser from '../Teaser'
import Row from '../Row'
import Spacing from '../Spacing'
import Title from '../Title'
import { BRAWL_INDEX } from '../../constants/brawl'
import getGuide from '../../helpers/getGuide'
import getDailyCoinsCounter from '../../helpers/getDailyCoinsCounter'
import renderAuthorsLinks from '../../helpers/renderAuthorsLinks'

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
      <Row isDesktopOnly withWideGutter>
        <Row.Column width='1/3'>
          <Title>About your Brawl</Title>
          <Spacing bottom='LARGE'>
            <BrawlOutcome income={income} />
          </Spacing>
          <Spacing bottom='LARGEST'>
            <BrawlReset />
          </Spacing>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Setup</Title>
          <BrawlDifficultySelect
            value={props.difficulty}
            onChange={event => props.setDifficulty(event.target.value)}
          />
          <Spacing top='BASE'>
            <BrawlSetup
              setup={setup}
              setSetup={setSetup}
              withPremiumPass={withPremiumPass}
              setWithPremiumPass={setWithPremiumPass}
            />
          </Spacing>
        </Row.Column>
        <Row.Column width='1/3'>
          {guide ? (
            <div>
              <Teaser
                {...guide}
                title={guide.name}
                meta={
                  <>Written by {guide.authors.reduce(renderAuthorsLinks, [])}</>
                }
                to={'/guides/' + props.slug}
              />
            </div>
          ) : (
            <BrawlRecommendedDecks limit={1} columns={1} />
          )}
        </Row.Column>
      </Row>

      <BrawlMatches difficulty={props.difficulty} />

      <Spacing bottom='LARGE'>
        <BrawlCharts income={income} />
      </Spacing>
    </div>
  )
})
