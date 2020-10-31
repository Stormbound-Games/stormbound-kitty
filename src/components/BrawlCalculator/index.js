import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Radio from '../Radio'
import Row from '../Row'
import Title from '../Title'
import { Coins } from '../Resource'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getMilestoneIndexFromCoins from '../../helpers/getMilestoneIndexFromCoins'
import getCostForMilestone from '../../helpers/getCostForMilestone'
import { MILESTONES, COIN_MULTIPLIERS } from '../../constants/brawl'
import './index.css'

const CalculatorSetup = React.memo(function CalculatorSetup(props) {
  return (
    <fieldset className='BrawlCalculator__setup'>
      <legend>Setup</legend>
      <Radio
        name='setup'
        id='MOBILE_WITHOUT_ADS'
        value='MOBILE_WITHOUT_ADS'
        required
        checked={props.setup === 'MOBILE_WITHOUT_ADS'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Mobile (without watching ads)
      </Radio>
      <Radio
        name='setup'
        id='MOBILE_WITH_ADS'
        value='MOBILE_WITH_ADS'
        required
        checked={props.setup === 'MOBILE_WITH_ADS'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Mobile (while watching ads)
      </Radio>
      <Radio
        name='setup'
        id='STEAM'
        value='STEAM'
        required
        checked={props.setup === 'STEAM'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Steam
      </Radio>
      <Radio
        name='setup'
        id='NONE'
        value='NONE'
        required
        checked={props.setup === 'NONE'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Ignore victory coins
      </Radio>
    </fieldset>
  )
})

const CalculatorMode = React.memo(function CalculatorMode(props) {
  return (
    <fieldset className='BrawlCalculator__mode'>
      <legend>I want to find out…</legend>
      <Radio
        name='mode'
        id='coins'
        value='COINS'
        checked={props.mode === 'COINS'}
        onChange={event => props.setMode(event.target.value)}
        required
      >
        … how far I can go with my coins.
      </Radio>
      <Radio
        name='mode'
        id='goal'
        value='GOAL'
        checked={props.mode === 'GOAL'}
        onChange={event => props.setMode(event.target.value)}
        required
      >
        … how much reaching my goal costs.
      </Radio>
    </fieldset>
  )
})

const CalculatorSettings = React.memo(function CalculatorSettings(props) {
  return (
    <Row>
      <Column>
        <label htmlFor='winRate'>Win rate (%)</label>
        <input
          id='winRate'
          name='winRate'
          type='number'
          value={props.winRate}
          onChange={event => props.setWinRate(+event.target.value)}
          min={1}
          max={100}
          placeholder='e.g. 50'
        />
      </Column>
      <Column>
        {props.mode === 'COINS' ? (
          <>
            <label htmlFor='coins'>Coins</label>
            <input
              id='coins'
              name='coins'
              type='number'
              value={props.coins}
              onChange={event => props.setCoins(+event.target.value)}
              min={5}
              step={5}
              placeholder='e.g. 700'
            />
          </>
        ) : props.mode === 'GOAL' ? (
          <>
            <label htmlFor='milestone'>Milestone</label>
            <select
              name='milestone'
              id='milestone'
              value={props.milestone}
              onChange={event => props.setMilestone(+event.target.value)}
            >
              <option value=''>Select a milestone</option>
              {MILESTONES.map((milestone, index) => (
                <option key={milestone.crowns} value={index}>
                  {index + 1}. {getBrawlRewardLabel(milestone)}
                </option>
              ))}
            </select>
          </>
        ) : null}
      </Column>
    </Row>
  )
})

const CalculatorRewards = React.memo(function CalculatorRewards(props) {
  return (
    <ol className='BrawlCalculator__rewards'>
      {MILESTONES.slice(0, props.milestone + 1).map((milestone, index) => (
        <li key={milestone.crowns}>{getBrawlRewardLabel(milestone, true)}</li>
      ))}
    </ol>
  )
})

const CalculatorOutcome = React.memo(function CalculatorOutcome(props) {
  const { mode, coins, milestone, winRate, setup, discount } = props
  const options = [winRate, 1 - discount / 100, setup]
  const gains =
    setup === 'NONE' ? (
      'without considering winning gain'
    ) : (
      <>
        considering <Coins amount={COIN_MULTIPLIERS[setup]} /> per win until
        coin cap
      </>
    )

  if (!mode) {
    return (
      <p>
        Start by deciding whether you want to reach a certain milestone or
        contribute with a certain amount of coins. Then, fill the remaining
        options to let the calculator come up with a result.
      </p>
    )
  }

  if (mode === 'COINS') {
    if (!coins) {
      return (
        <p>
          You must define how many coins you are willing to spend for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const outcome = getMilestoneIndexFromCoins(coins, ...options)
    const next =
      outcome < MILESTONES.length - 1
        ? getCostForMilestone(outcome + 1, ...options)
        : null
    const nextUp = next ? Math.round(Math.round(next) / 5) * 5 : null

    return (
      <>
        <p>
          With <Coins amount={coins} /> ({gains}) and accounting for a {winRate}
          % win rate, you can expect reaching{' '}
          <span className='Highlight'>milestone #{outcome + 1}</span>, and get
          the following rewards:
        </p>
        <CalculatorRewards milestone={outcome} />
        {next ? (
          <>
            <p>
              Reaching the next milestone (milestone #{outcome + 2}, yielding{' '}
              {getBrawlRewardLabel(MILESTONES[outcome + 2], true)}) would cost{' '}
              <Coins amount={nextUp} />, or an{' '}
              <span className='Highlight'>
                extra <Coins amount={nextUp - coins} />
              </span>
              .
            </p>
            <Info icon='equalizer' title='Income calculator'>
              To figure out how much coins you can earn in a given period of
              time, check out the{' '}
              <Link to='/calculators/income'>income calculator</Link>.
            </Info>
          </>
        ) : null}
      </>
    )
  }

  if (mode === 'GOAL') {
    if (milestone === '') {
      return (
        <p>
          You must define which milestone you are wishing to reach for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const outcome = getCostForMilestone(milestone, ...options)
    const outcomeUp = Math.round(Math.round(outcome) / 5) * 5
    const reward = getBrawlRewardLabel(MILESTONES[milestone], true)

    return (
      <>
        <p>
          Reaching milestone #{milestone + 1} ({reward}) and accounting for a{' '}
          {winRate}% win rate would{' '}
          <span className='Highlight'>
            cost <Coins amount={outcomeUp} />
          </span>{' '}
          ({gains}). Here are all the rewards you would get:
        </p>
        <CalculatorRewards milestone={milestone} />
      </>
    )
  }

  return null
})

const CalculatorDiscount = React.memo(function CalculatorDiscount(props) {
  return (
    <>
      <Row>
        <Column>
          <label htmlFor='discount'>Cost Discount (%)</label>
          <input
            id='discount'
            name='discount'
            type='number'
            value={props.discount}
            onChange={event => props.setDiscount(+event.target.value)}
            min={1}
            max={100}
            placeholder='e.g. 50'
          />
        </Column>
        <Column />
      </Row>
    </>
  )
})

export default React.memo(function BrawlCalculator(props) {
  const [mode, setMode] = React.useState('')
  const [winRate, setWinRate] = React.useState(50)
  const [coins, setCoins] = React.useState('')
  const [milestone, setMilestone] = React.useState('')
  const [setup, setSetup] = React.useState('NONE')
  const [discount, setDiscount] = React.useState(0)

  React.useEffect(() => {
    setMilestone('')
    setCoins('')
  }, [mode])

  return (
    <>
      <HeaderBanner title='Brawl Calculator' />
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a calculator to plan your Brawl journey. Whether you have
            limited funds and would like to know how far you can go, or have an
            objective in mind and would like to know how much it will cost, this
            calculator is made for you.
          </p>
          <Info icon='sword' title='Brawl tracker'>
            To keep track of your expenses and win ratio during the Brawl, use
            the <Link to='/brawl'>Brawl tracker</Link>. New to the Brawl?{' '}
            <Link to='/guides/brawl'>Read the guide</Link>.
          </Info>
        </Column>
        <Column width='1/3'>
          <Title>Settings</Title>
          <CalculatorMode mode={mode} setMode={setMode} />
          <CalculatorSettings
            mode={mode}
            milestone={milestone}
            setMilestone={setMilestone}
            coins={coins}
            setCoins={setCoins}
            winRate={winRate}
            setWinRate={setWinRate}
          />
          <CalculatorSetup setup={setup} setSetup={setSetup} />
          <CalculatorDiscount discount={discount} setDiscount={setDiscount} />
        </Column>
        <Column width='1/3'>
          <Title>Outcome</Title>
          <CalculatorOutcome
            discount={discount}
            coins={coins}
            milestone={milestone}
            mode={mode}
            setup={setup}
            winRate={winRate}
          />
        </Column>
      </Row>
      <PageMeta
        title='Brawl Calculator'
        description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      />
    </>
  )
})
