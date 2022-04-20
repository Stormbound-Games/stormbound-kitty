import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Checkbox from '~/components/Checkbox'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Label from '~/components/Label'
import LeagueSelect from '~/components/LeagueSelect'
import NumberInput from '~/components/NumberInput'
import Only from '~/components/Only'
import PremiumPassCheckbox from '~/components/PremiumPassCheckbox'
import ResourceIcon from '~/components/ResourceIcon'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
} from '~/components/Resource'
import capitalize from '~/helpers/capitalize'
import clamp from '~/helpers/clamp'
import getActivityRewards from '~/helpers/getActivityRewards'
import getBrawlRewards from '~/helpers/getBrawlRewards'
import getClimbingRewards from '~/helpers/getClimbingRewards'
import getDraftRewards from '~/helpers/getDraftRewards'
import getHeroesLeagueRewards from '~/helpers/getHeroesLeagueRewards'
import getLeagueChestRewards from '~/helpers/getLeagueChestRewards'
import getResourceLabel from '~/helpers/getResourceLabel'
import getVictoryCoins from '~/helpers/getVictoryCoins'
import {
  DailyIncome,
  WeeklyIncome,
  MonthlyIncome,
  YearlyIncome,
} from '~/helpers/Income'
import styles from './styles'

const PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']

const getPeriodicIncome = (books, period) => {
  if (period === 'YEARLY') return new YearlyIncome(books)
  if (period === 'MONTHLY') return new MonthlyIncome(books)
  if (period === 'WEEKLY') return new WeeklyIncome(books)
  if (period === 'DAILY') return new DailyIncome(books)
}

const useIncomeOverPeriod = (books, settings, period, rubiesConversion) => {
  const income = getPeriodicIncome(books, period)

  if (settings.league) {
    const chestRewards = getLeagueChestRewards(books, settings.league)
    income.add(chestRewards)
  }

  if (settings.league === 'HEROES') {
    const heroLeagueRewards = getHeroesLeagueRewards(
      books,
      settings.heroesPosition
    )
    income.add(heroLeagueRewards)
  }

  if (settings.league && settings.rank) {
    const climbingRewards = getClimbingRewards(
      books,
      settings.league,
      settings.rank
    )
    income.add(climbingRewards)
  }

  if (settings.draftSessions > 0) {
    const sessions = clamp(settings.draftSessions, 0, 3)
    const wins = clamp(settings.draftWins, 0, 6)
    const draftRewards = getDraftRewards(
      books,
      sessions,
      wins,
      settings.withPremiumPass
    )
    // We consider that 1 entry card a week gets collected via watching an ad,
    // and the other ones are paid for 600 coins a piece.
    draftRewards.coins -= Math.max((sessions - 1) * 600, 0)
    income.add(draftRewards)
  }

  const brawlRewards = getBrawlRewards(books, {
    casual: settings.casualMilestone || -1,
    warrior: settings.warriorMilestone || -1,
    ultimate: settings.ultimateMilestone || -1,
  })
  brawlRewards.coins -= settings.brawlCost || 0
  income.add(brawlRewards)

  const activityRewards = getActivityRewards(books, {
    league: settings.league,
    preferTier3Stones: settings.preferTier3Stones,
    setup: settings.setup,
    wins: settings.wins,
    withDailyHumble: settings.withDailyHumble,
    withDailyQuests: settings.withDailyQuests,
    withPremiumPass: settings.withPremiumPass,
  })
  income.add(activityRewards)

  if (rubiesConversion !== 'NONE') {
    income.convertRubies(rubiesConversion)
  }

  return income
}

export default React.memo(function PageIncomeCalculator(props) {
  const { css } = useFela()
  const [withPremiumPass, setWithPremiumPass] = React.useState(false)
  const [period, setPeriod] = React.useState(PERIODS[0])
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const [wins, setWins] = React.useState(0)
  const [league, setLeague] = React.useState('')
  const [rank, setRank] = React.useState('')
  const [casualMilestone, setCasualMilestone] = React.useState('')
  const [warriorMilestone, setWarriorMilestone] = React.useState('')
  const [ultimateMilestone, setUltimateMilestone] = React.useState('')
  const [brawlCost, setBrawlCost] = React.useState(0)
  const [draftSessions, setDraftSessions] = React.useState(0)
  const [draftWins, setDraftWins] = React.useState(0)
  const [heroesPosition, setHeroesPosition] = React.useState('NOT_RANKED')
  const [rubiesConversion, setRubiesConversion] = React.useState('NONE')
  const [preferTier3Stones, setPreferTier3Stones] = React.useState(false)
  const [withDailyHumble, setWithDailyHumble] = React.useState(false)
  const [withDailyQuests, setWithDailyQuests] = React.useState(false)
  const income = useIncomeOverPeriod(
    props.books,
    {
      brawlCost,
      heroesPosition,
      league,
      casualMilestone,
      warriorMilestone,
      ultimateMilestone,
      preferTier3Stones,
      rank,
      setup,
      wins,
      withDailyHumble,
      withDailyQuests,
      withPremiumPass,
      draftSessions,
      draftWins,
    },
    period,
    rubiesConversion
  )

  const coinCap = withPremiumPass ? 700 : 400
  const maxWins = Math.ceil(
    (coinCap - 30) / getVictoryCoins(setup, league, withPremiumPass)
  )

  React.useEffect(() => {
    if (wins > maxWins) setWins(maxWins)
  }, [maxWins, setup, wins])

  return (
    <Page
      title='Income Calculator'
      description='Compute how many resources you can get during a certain period of time to get most out of your resources.'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This income calculator helps you figure out how many{' '}
            <ResourceIcon resource='STONE' /> stones,{' '}
            <ResourceIcon resource='RUBY' /> rubies,{' '}
            <ResourceIcon resource='COIN' /> coins and cards you make during a
            certain time frame based on your play-style.
          </p>

          <p>
            Fill the form <Only.Desktop>on the right</Only.Desktop>
            <Only.Mobile>below</Only.Mobile>, and change the period by{' '}
            <Only.Desktop>clicking</Only.Desktop>
            <Only.Mobile>tapping</Only.Mobile> “Daily” in the outcome section.
          </p>

          <p>
            Special thanks to <Link to='/members/oeni'>Oeni</Link> (oeni#7266)
            and <Link to='/members/roman'>Roman</Link> (Roman_NFP#6918) for
            their help in designing and making this simulator possible.
          </p>

          <Info
            icon='compass'
            title='Resources Guide'
            spacing={{ vertical: 'BASE' }}
          >
            <p>
              To learn about the best way to spend resources based on your
              play-style, <Link to='/members/roman'>Roman</Link> has authored a
              fantastic{' '}
              <Link to='/guides/resources'>guides on Stormbound resources</Link>
              .
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Configuration</Title>

          <h3 className={css(styles.title, { marginTop: 0 })}>Setup</h3>
          <Row isDesktopOnly>
            <Row.Column>
              <Select
                label='Game setup'
                id='setup'
                value={setup}
                onChange={event => setSetup(event.target.value)}
              >
                <option value='MOBILE_WITHOUT_ADS'>Mobile without ads</option>
                <option value='MOBILE_WITH_ADS'>Mobile with ads</option>
                <option value='STEAM_OR_WEB'>Steam or web version</option>
              </Select>
              <Spacing top='SMALL'>
                <PremiumPassCheckbox
                  checked={withPremiumPass}
                  onChange={event => setWithPremiumPass(event.target.checked)}
                />
              </Spacing>
            </Row.Column>
            <Row.Column>
              <Label>Quests & Rewards</Label>
              <Checkbox
                id='with-daily-quests'
                checked={withDailyQuests}
                onChange={event => setWithDailyQuests(event.target.checked)}
              >
                Complete daily quests
              </Checkbox>
              <Checkbox
                id='prefer-tier3-stones'
                checked={preferTier3Stones}
                onChange={event => setPreferTier3Stones(event.target.checked)}
              >
                Prefer tier-3 quest to be fusion stones
              </Checkbox>
              <Checkbox
                id='with-daily-humble'
                checked={withDailyHumble}
                onChange={event => setWithDailyHumble(event.target.checked)}
              >
                Open daily Humble book
              </Checkbox>
            </Row.Column>
          </Row>

          <h3 className={css(styles.title)}>Progress</h3>

          <Row isDesktopOnly>
            <Row.Column>
              <LeagueSelect
                label='Monthly league'
                value={league}
                onChange={event => setLeague(event.target.value)}
              />
            </Row.Column>
            <Row.Column>
              <Select
                label='Monthly rank'
                id='rank'
                value={rank}
                disabled={league === 'HEROES'}
                onChange={event => setRank(event.target.value)}
              >
                <option value=''>Select a rank</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Select>
            </Row.Column>
          </Row>
          <Row isDesktopOnly>
            <Row.Column>
              <Select
                label='Heroes Position'
                id='heroes-position'
                value={heroesPosition}
                disabled={league !== 'HEROES'}
                onChange={event => setHeroesPosition(event.target.value)}
              >
                <option value='NOT_RANKED'>Not within top 500</option>
                <option value='TOP_500'>Top 500</option>
                <option value='TOP_100'>Top 100</option>
                <option value='TOP_10'>Top 10</option>
                <option value='TOP_1'>Top 1</option>
              </Select>
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Daily wins'
                id='wins'
                name='wins'
                value={wins}
                onChange={setWins}
                min={0}
                max={maxWins}
              />
            </Row.Column>
          </Row>

          <h3 className={css(styles.title)}>Brawl</h3>

          <Row isDesktopOnly>
            <Row.Column>
              <Select
                label='Casual milestone'
                id='casualMilestone'
                value={casualMilestone}
                onChange={event => setCasualMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.CASUAL.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getResourceLabel(milestone)}
                  </option>
                ))}
              </Select>
            </Row.Column>
            <Row.Column>
              <Select
                label='Warrior milestone'
                id='warriorMilestone'
                value={warriorMilestone}
                onChange={event => setWarriorMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.WARRIOR.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getResourceLabel(milestone)}
                  </option>
                ))}
              </Select>
            </Row.Column>
          </Row>

          <Row isDesktopOnly>
            <Row.Column>
              <Select
                label='Ultimate milestone'
                id='ultimateMilestone'
                value={ultimateMilestone}
                onChange={event => setUltimateMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.ULTIMATE.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getResourceLabel(milestone)}
                  </option>
                ))}
              </Select>
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Brawl total cost'
                id='brawl-cost'
                value={brawlCost}
                onChange={setBrawlCost}
                step={10}
                min={0}
              />
            </Row.Column>
          </Row>

          <Info
            icon='warning'
            title='Disclaimer'
            spacing={{ vertical: 'BASE' }}
          >
            <p>
              This calculator does not take into consideration{' '}
              <Link to='/brawl-mode#what-are-victory-bonuses'>
                victory bonuses from the Brawl
              </Link>
              .
            </p>
          </Info>

          <h3 className={css(styles.title)}>Draft</h3>

          <Row isDesktopOnly>
            <Row.Column>
              <NumberInput
                label='Weekly sessions'
                id='draft-sessions'
                value={draftSessions}
                onChange={setDraftSessions}
                min={0}
                max={3}
              />
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Average wins per session'
                id='draft-wins'
                value={draftWins}
                onChange={setDraftWins}
                min={0}
                max={6}
              />
            </Row.Column>
          </Row>

          <Spacing top='LARGE'>
            <Title>{period.toLowerCase()} Income</Title>

            <Row isDesktopOnly>
              <Row.Column>
                <Row>
                  <Row.Column>
                    <Select
                      label='Period'
                      id='period'
                      value={period}
                      onChange={event => setPeriod(event.target.value)}
                    >
                      {PERIODS.map(period => (
                        <option key={period} value={period}>
                          {capitalize(period.toLowerCase())}
                        </option>
                      ))}
                    </Select>
                  </Row.Column>
                </Row>
                <Row>
                  <Row.Column>
                    <Select
                      label='Convert rubies to'
                      id='rubies-conversion'
                      value={rubiesConversion}
                      onChange={event =>
                        setRubiesConversion(event.target.value)
                      }
                    >
                      <option value='NONE'>Nothing</option>
                      {props.books.map(book => (
                        <option value={book.id} key={book.id}>
                          {book.name}
                        </option>
                      ))}
                      <option value='CARD_SHOP'>Card Shop Epics</option>
                    </Select>
                  </Row.Column>
                </Row>
              </Row.Column>
              <Row.Column>
                <p>
                  On a {period.toLowerCase()} basis, and given your current play
                  style, you would collect the following resources:
                </p>
                <ul className={css(styles.outcome)}>
                  <li>
                    <Coins amount={parseFloat(income.coins.toFixed(2))} />
                  </li>
                  <li>
                    <Rubies amount={parseFloat(income.rubies.toFixed(2))} />
                  </li>
                  <li>
                    <Stones amount={parseFloat(income.stones.toFixed(2))} />
                  </li>
                </ul>
                <p>As well as:</p>
                <ul className={css(styles.outcome)}>
                  <li>
                    <Common amount={Number(income.cards[0].toFixed(2))} />
                  </li>
                  <li>
                    <Rare amount={Number(income.cards[1].toFixed(2))} />
                  </li>
                  <li>
                    <Epic amount={Number(income.cards[2].toFixed(2))} />
                  </li>
                  <li>
                    <Legendary amount={Number(income.cards[3].toFixed(2))} />
                  </li>
                </ul>
              </Row.Column>
            </Row>
          </Spacing>
        </Row.Column>
      </Row>
    </Page>
  )
})
