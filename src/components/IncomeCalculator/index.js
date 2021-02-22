import React from 'react'
import { Link } from 'react-router-dom'
import Checkbox from '../Checkbox'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import NumberInput from '../NumberInput'
import Only from '../Only'
import PageMeta from '../PageMeta'
import ResourceIcon from '../ResourceIcon'
import Row from '../Row'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import { BOOKS } from '../../constants/game'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
} from '../Resource'
import capitalise from '../../helpers/capitalise'
import getRewardLabel from '../../helpers/getRewardLabel'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import getCostForMilestone from '../../helpers/getCostForMilestone'
import getPeriodMultiplier from '../../helpers/getPeriodMultiplier'
import getMonthlyChestReward from '../../helpers/getMonthlyChestReward'
import getWinCoins from '../../helpers/getWinCoins'
import getWeeklyBrawlReward from '../../helpers/getWeeklyBrawlReward'
import './index.css'

const DEFAULT_STATE = { coins: 0, rubies: 0, stones: 0, cards: [0, 0, 0, 0] }
const PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
const SELECT_LENGTH_MULTIPLIER = {
  DAILY: '1ch',
  WEEKLY: '1.2ch',
  MONTHLY: '1.2ch',
  YEARLY: '1.1ch',
}

const CLIMBING_CARDS = {
  HEROES: [],
  DIAMOND: [0, 1, 2, 1, 3],
  PLATINUM: [0, 1, 2, 1, 2],
  GOLD: [0, 1, 0, 1, 2],
  SILVER: [0, 0, 1, 0, 2],
  BRONZE: [0, 0, 1, 0, 1],
  IRON: [0, 0, 0, 0, 1],
}

const RUBY_CONVERSION_MAP = {
  CARD_SHOP: 20,
  CLASSIC: 20,
  DRAGON: 60,
  ELDER: 60,
  FELINE: 60,
  HEROIC: 40,
  LEGENDARY_DRAGON: 120,
  MYTHIC: 80,
  PIRATE: 60,
}

// Open a book and add the resulting cards and possible fusion stones to the
// current income, recalibrated over the given period if any.
const addTomeToIncome = (income, type, period = 'DAILY') => {
  const { draws, percentiles } = BOOKS[type]
  const multiplier = getPeriodMultiplier(period)

  income.stones += getAverageStonesPerBook(type)
  income.cards[0] += (draws * percentiles[0]) / multiplier
  income.cards[1] += (draws * percentiles[1]) / multiplier
  income.cards[2] += (draws * percentiles[2]) / multiplier
  income.cards[3] += (draws * percentiles[3]) / multiplier
}

// Convert income’s rubies into a certain type of purchase (certain books or
// epic cards from the shop).
const convertRubies = (income, type) => {
  if (!(type in RUBY_CONVERSION_MAP)) return

  const cost = RUBY_CONVERSION_MAP[type]
  const count = Math.floor(income.rubies / cost)

  income.rubies -= count * cost

  if (type === 'CARD_SHOP') income.cards[2] += count
  else for (let i = 0; i < count; i += 1) addTomeToIncome(income, type)
}

const addHeroRewards = (income, heroesPosition, period = 'MONTHLY') => {
  if (heroesPosition === 'TOP_1') {
    income.stones += 100
    addTomeToIncome(income, 'LEGENDARY_DRAGON', period)
  } else if (heroesPosition === 'TOP_10') {
    income.stones += 50
    addTomeToIncome(income, 'FELINE', period)
  } else if (heroesPosition === 'TOP_100') {
    income.stones += 25
    addTomeToIncome(income, 'DRAGON', period)
  } else if (heroesPosition === 'TOP_500') {
    income.stones += 10
    addTomeToIncome(income, 'PIRATE', period)
  }
}

const getDailyIncome = ({
  brawlCost,
  heroesPosition,
  league,
  milestone,
  preferTier3Stones,
  rank,
  setup,
  wins,
  withDailyHumble,
  withDailyQuests,
}) => {
  const income = { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }
  const chest = getMonthlyChestReward(league)

  // Recalibrate the monthly chest rewards to daily rewards
  income.coins += chest.coins / getPeriodMultiplier('MONTHLY')
  income.rubies += chest.rubies / getPeriodMultiplier('MONTHLY')
  income.stones += chest.stones / getPeriodMultiplier('MONTHLY')
  chest.cards.forEach((cards, index) => {
    income.cards[index] += cards / getPeriodMultiplier('MONTHLY')
  })

  // Similarly, recalibrate any potential hero rewards to daily rewards and make
  // sure one does not set a heroes position, before changing league field back
  // to something lower, which would cause calculation errors
  if (league === 'HEROES' && heroesPosition !== 'NOT_RANKED') {
    addHeroRewards(income, heroesPosition)
  }

  // Consider the cards earned from climbing on a monthly basis (if any)
  if (league && rank) {
    CLIMBING_CARDS[league].slice(0, 5 - rank + 1).forEach(rank => {
      income.cards[rank] += 1 / getPeriodMultiplier('MONTHLY')
    })
  }

  // Recalibrate the weekly Brawl rewards to daily rewards
  if (milestone !== '') {
    const brawl = getWeeklyBrawlReward(milestone)

    income.coins += brawl.coins / getPeriodMultiplier('WEEKLY')
    income.coins -= brawlCost / getPeriodMultiplier('WEEKLY')
    income.rubies += brawl.rubies / getPeriodMultiplier('WEEKLY')
    income.stones += brawl.stones / getPeriodMultiplier('WEEKLY')
    brawl.cards.forEach((cards, index) => {
      income.cards[index] += cards / getPeriodMultiplier('WEEKLY')
    })
  }

  if (withDailyHumble) {
    addTomeToIncome(income, 'HUMBLE')
  }

  if (withDailyQuests) {
    income.coins += 100 + ((preferTier3Stones ? 5 : 6) / 9) * 150
    income.rubies += 5
    income.stones += ((preferTier3Stones ? 4 : 3) / 9) * 2
  }

  if (wins > 0) {
    income.coins += 30
    income.coins += wins * getWinCoins(setup)
  }

  return income
}

const getPeriodIncome = (income, period, rubiesConversion) => {
  const multiplier = getPeriodMultiplier(period)

  income.coins *= multiplier
  income.rubies *= multiplier
  income.stones *= multiplier
  income.cards = income.cards.map(prob => prob * multiplier)

  convertRubies(income, rubiesConversion)

  return income
}

export default React.memo(function IncomeCalculator(props) {
  const [period, setPeriod] = React.useState(PERIODS[0])
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const [wins, setWins] = React.useState(0)
  const [league, setLeague] = React.useState('')
  const [rank, setRank] = React.useState('')
  const [milestone, setMilestone] = React.useState('')
  const [brawlCost, setBrawlCost] = React.useState(0)
  const [heroesPosition, setHeroesPosition] = React.useState('NOT_RANKED')
  const [rubiesConversion, setRubiesConversion] = React.useState('NONE')
  const [preferTier3Stones, setPreferTier3Stones] = React.useState(false)
  const [withDailyHumble, setWithDailyHumble] = React.useState(false)
  const [withDailyQuests, setWithDailyQuests] = React.useState(false)
  const income = getPeriodIncome(
    getDailyIncome({
      brawlCost,
      heroesPosition,
      league,
      milestone,
      preferTier3Stones,
      rank,
      setup,
      wins,
      withDailyHumble,
      withDailyQuests,
    }),
    period,
    rubiesConversion
  )
  const maxWins =
    setup === 'STEAM_OR_WEB' ? 37 : setup === 'MOBILE_WITH_ADS' ? 19 : 74

  React.useEffect(() => {
    if (wins > maxWins) setWins(maxWins)
  }, [maxWins, setup, wins])

  return (
    <>
      <HeaderBanner title='Income Calculator' />

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>What is this?</Title>
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

          <p style={{ marginBottom: '2em' }}>
            Special thanks to <Link to='/member/Oeni'>Oeni</Link> (oeni#7266)
            and <Link to='/member/Roman'>Roman</Link> (Roman_NFP#6918) for their
            help in designing and making this simulator possible.
          </p>

          <Info icon='compass' title='Resources Guide'>
            To learn about the best way to spend resources based on your
            play-style, <Link to='/member/Roman'>Roman</Link> has authored a
            fantastic{' '}
            <Link to='/guides/resources'>guides on Stormbound resources</Link>.
          </Info>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Configuration</Title>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='setup'>Game setup</label>
              <select
                name='setup'
                id='setup'
                value={setup}
                onChange={event => setSetup(event.target.value)}
              >
                <option value='MOBILE_WITHOUT_ADS'>Mobile without ads</option>
                <option value='MOBILE_WITH_ADS'>Mobile with ads</option>
                <option value='STEAM_OR_WEB'>Steam or web version</option>
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='wins'>Daily wins</label>
              <NumberInput
                id='wins'
                name='wins'
                value={wins}
                onChange={setWins}
                min={0}
                max={maxWins}
              />
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='league'>Monthly league</label>
              <select
                name='league'
                id='league'
                value={league}
                onChange={event => setLeague(event.target.value)}
              >
                <option value=''>Select a league</option>
                <option value='HEROES'>Heroes</option>
                <option value='DIAMOND'>Diamond</option>
                <option value='PLATINUM'>Platinum</option>
                <option value='GOLD'>Gold</option>
                <option value='SILVER'>Silver</option>
                <option value='BRONZE'>Bronze</option>
                <option value='IRON'>Iron</option>
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='rank'>Monthly rank</label>
              <select
                name='rank'
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
              </select>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='milestone'>Weekly milestone</label>
              <select
                name='milestone'
                id='milestone'
                value={milestone}
                onChange={event => setMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {MILESTONES.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='brawl-cost'>Brawl avg. cost</label>
              <NumberInput
                id='brawl-cost'
                name='brawl-cost'
                value={brawlCost}
                onChange={setBrawlCost}
                step={10}
                min={milestone === '' ? 0 : getCostForMilestone(milestone, 1)}
                max={
                  milestone === ''
                    ? undefined
                    : getCostForMilestone(milestone, 0)
                }
              />
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='rubies-conversion'>Heroes Position</label>
              <select
                id='heroes-position'
                name='heroes-position'
                value={heroesPosition}
                disabled={league !== 'HEROES'}
                onChange={event => setHeroesPosition(event.target.value)}
              >
                <option value='NOT_RANKED'>Not within top 500</option>
                <option value='TOP_500'>Top 500</option>
                <option value='TOP_100'>Top 100</option>
                <option value='TOP_10'>Top 10</option>
                <option value='TOP_1'>Top 1</option>
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='rubies-conversion'>Convert rubies to</label>
              <select
                id='rubies-conversion'
                name='rubies-conversion'
                value={rubiesConversion}
                onChange={event => setRubiesConversion(event.target.value)}
              >
                <option value='NONE'>Nothing</option>
                <option value='MYTHIC'>Mythic Tomes</option>
                <option value='HEROIC'>Heroic Tomes</option>
                <option value='CLASSIC'>Classic Tomes</option>
                <option value='FELINE'>Feline Tomes</option>
                <option value='ELDER'>Elder Tomes</option>
                <option value='PIRATE'>Pirate Tomes</option>
                <option value='DRAGON'>Dragon Tomes</option>
                <option value='LEGENDARY_DRAGON'>Legendary Dragon Tomes</option>
                <option value='CARD_SHOP'>Card Shop Epics</option>
              </select>
            </Row.Column>
          </Row>
          <Checkbox
            id='with-daily-quests'
            name='with-daily-quests'
            checked={withDailyQuests}
            onChange={event => setWithDailyQuests(event.target.checked)}
          >
            Complete daily quests
          </Checkbox>
          <Checkbox
            id='prefer-tier3-stones'
            name='prefer-tier3-stones'
            checked={preferTier3Stones}
            onChange={event => setPreferTier3Stones(event.target.checked)}
          >
            Prefer tier-3 quest to be fusion stones
          </Checkbox>
          <Checkbox
            id='with-daily-humble'
            name='with-daily-humble'
            checked={withDailyHumble}
            onChange={event => setWithDailyHumble(event.target.checked)}
          >
            Open daily Humble book
          </Checkbox>
        </Row.Column>
        <Row.Column width='1/3'>
          <div>
            <Title
              style={{
                '--length': period.length,
                '--multiplier': SELECT_LENGTH_MULTIPLIER[period],
              }}
            >
              <label htmlFor='period' className='VisuallyHidden'>
                Period
              </label>
              <select
                name='period'
                id='period'
                value={period}
                onChange={event => setPeriod(event.target.value)}
                className='IncomeCalculator__period'
              >
                {PERIODS.map(period => (
                  <option key={period} value={period}>
                    {capitalise(period.toLowerCase())}
                  </option>
                ))}
              </select>
              Income
            </Title>

            <p>
              On a {period.toLowerCase()} basis, and given your current play
              style, you would collect the following resources:
            </p>
            <ul>
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
            <ul>
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
          </div>
        </Row.Column>
      </Row>
      <PageMeta
        title='Income Calculator'
        description='Compute how many resources you can get during a certain period of time to get most out of your resources.'
      />
    </>
  )
})
