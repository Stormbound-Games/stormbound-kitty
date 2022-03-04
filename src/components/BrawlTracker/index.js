import React from 'react'
import BrawlMilestones from '~/components/BrawlMilestones'
import BrawlMatches from '~/components/BrawlMatches'
import { BrawlContext } from '~/components/BrawlProvider'
import BrawlCharts from '~/components/BrawlCharts'
import BrawlDifficultySelect from '~/components/BrawlDifficultySelect'
import BrawlOutcome from '~/components/BrawlOutcome'
import BrawlRecommendedDecks from '~/components/BrawlRecommendedDecks'
import BrawlReset from '~/components/BrawlReset'
import BrawlSetup from '~/components/BrawlSetup'
import MemberList from '~/components/MemberList'
import Teaser from '~/components/Teaser'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getDailyCoinsCounter from '~/helpers/getDailyCoinsCounter'

export default React.memo(function BrawlTracker(props) {
  const [withPremiumPass, setWithPremiumPass] = React.useState(false)
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const { brawl: currentBrawl } = React.useContext(BrawlContext)
  const { guide } = props

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
      <BrawlMilestones
        booksIndex={props.booksIndex}
        difficulty={props.difficulty}
      />
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>About your Brawl</Title>
          <BrawlOutcome income={income} />
          <BrawlReset />
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
                  <>
                    Written by <MemberList members={guide.authors} />
                  </>
                }
                to={'/guides/' + guide.slug}
              />
            </div>
          ) : props.recommendedDeck ? (
            <BrawlRecommendedDecks
              decks={[props.recommendedDeck]}
              columns={1}
            />
          ) : null}
        </Row.Column>
      </Row>

      <BrawlMatches difficulty={props.difficulty} />

      <Spacing bottom='LARGE'>
        <BrawlCharts income={income} />
      </Spacing>
    </div>
  )
})
