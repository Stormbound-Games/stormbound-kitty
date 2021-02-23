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
import getCostForMilestone from '../../helpers/getCostForMilestone'
import getMonthlyChestReward from '../../helpers/getMonthlyChestReward'
import getWinCoins from '../../helpers/getWinCoins'
import getWeeklyBrawlReward from '../../helpers/getWeeklyBrawlReward'
import {
  DailyIncome,
  WeeklyIncome,
  MonthlyIncome,
  YearlyIncome,
} from './Income'
import './index.css'

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

const getHeroIncome = position => {
  const rewards = new MonthlyIncome()

  if (position === 'TOP_1') {
    rewards.stones += 100
    rewards.openBook(['ARCHDRAGON', 'FELINE', 'DRAGON', 'PIRATE'])
  } else if (position === 'TOP_10') {
    rewards.stones += 50
    rewards.openBook(['FELINE', 'DRAGON', 'PIRATE'])
  } else if (position === 'TOP_100') {
    rewards.stones += 25
    rewards.openBook(['DRAGON', 'PIRATE'])
  } else if (position === 'TOP_500') {
    rewards.stones += 10
    rewards.openBook('PIRATE')
  }

  return rewards
}

const getIncome = period => {
  if (period === 'YEARLY') return new YearlyIncome()
  if (period === 'MONTHLY') return new MonthlyIncome()
  if (period === 'WEEKLY') return new WeeklyIncome()
  if (period === 'DAILY') return new DailyIncome()
  throw new Error()
}

const getCardsFromLeague = league =>
  CLIMBING_CARDS[league].reduce(
    (acc, rarity) => {
      acc[rarity] += 1
      return acc
    },
    [0, 0, 0, 0]
  )

const useIncomeOverPeriod = (
  {
    brawlCost,
    heroesPosition,
    league,
    milestone,
    preferTier3Stones,
    rank,
    setup,
    withDailyHumble,
    withDailyQuests,
    wins,
  },
  period,
  rubiesConversion
) => {
  const income = getIncome(period)

  const chest = new MonthlyIncome(getMonthlyChestReward(league))
  income.add(chest)

  if (league === 'HEROES') {
    const hero = getHeroIncome(heroesPosition)
    income.add(hero)
  }

  if (league && rank) {
    const cards = new MonthlyIncome({ cards: getCardsFromLeague(league) })
    income.add(cards)
  }

  if (milestone !== '') {
    const brawl = new WeeklyIncome(getWeeklyBrawlReward(milestone))
    brawl.coins -= brawlCost
    income.add(brawl)
  }

  if (withDailyHumble) {
    const book = new DailyIncome()
    book.openBook('HUMBLE')
    income.add(book)
  }

  if (withDailyQuests) {
    const quests = new DailyIncome({
      coins: 100 + ((preferTier3Stones ? 5 : 6) / 9) * 150,
      rubies: 5,
      stones: ((preferTier3Stones ? 4 : 3) / 9) * 2,
    })
    income.add(quests)
  }

  if (wins > 0) {
    const coins = new DailyIncome({ coins: 30 + wins * getWinCoins(setup) })
    income.add(coins)
  }

  if (rubiesConversion !== 'NONE') {
    income.convertRubies(rubiesConversion)
  }

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
  const income = useIncomeOverPeriod(
    {
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
    },
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
                <option value='MYTHIC'>Mythic Books</option>
                <option value='HEROIC'>Heroic Books</option>
                <option value='CLASSIC'>Classic Books</option>
                <option value='FELINE'>Feline Books</option>
                <option value='ELDER'>Elder Books</option>
                <option value='PIRATE'>Pirate Books</option>
                <option value='DRAGON'>Dragon Books</option>
                <option value='ARCHDRAGON'>Archdragon Books</option>
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
