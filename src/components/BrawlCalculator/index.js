import React from 'react'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Radio from '../Radio'
import Row from '../Row'
import Title from '../Title'
import { Coins } from '../Resource'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getMilestoneIndexFromCoins from '../../helpers/getMilestoneIndexFromCoins'
import { MILESTONES } from '../../constants/brawl'
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
        Mobile (w/o ads)
      </Radio>
      <Radio
        name='setup'
        id='MOBILE_WITH_ADS'
        value='MOBILE_WITH_ADS'
        required
        checked={props.setup === 'MOBILE_WITH_ADS'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Mobile (w/ ads)
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
        disabled
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

export default React.memo(function BrawlCalculator(props) {
  const [mode, setMode] = React.useState('')
  const [winRate, setWinRate] = React.useState('')
  const [coins, setCoins] = React.useState('')
  const [milestone, setMilestone] = React.useState('')
  const [setup, setSetup] = React.useState('NONE')
  const outcome =
    mode === 'COINS' ? getMilestoneIndexFromCoins(coins, winRate, setup) : null

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
        </Column>
        <Column width='1/3'>
          <Title>Outcome</Title>
          {mode === 'COINS' && Boolean(outcome) && outcome !== -1 && (
            <>
              <p>
                With <Coins amount={coins} /> (
                {setup === 'NONE'
                  ? 'without considering winning gains'
                  : 'while considering winning gains'}
                ) and accounting for a {winRate}% win rate, you can expect
                reaching milestone #{outcome + 1}, and get the following
                rewards:
              </p>
              <ul>
                {MILESTONES.slice(0, outcome + 1).map(milestone => (
                  <li key={milestone.crowns}>
                    {getBrawlRewardLabel(milestone, true)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Column>
      </Row>
      <PageMeta
        title='Brawl Calculator'
        description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      />
    </>
  )
})
