import React from 'react'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Radio from '../Radio'
import Row from '../Row'
import Title from '../Title'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import { MILESTONES } from '../../constants/brawl'

const CalculatorMode = React.memo(function CalculatorMode(props) {
  return (
    <fieldset>
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
        </Column>
        <Column width='1/3'>
          <Title>Outcome</Title>
        </Column>
      </Row>
      <PageMeta
        title='Brawl Calculator'
        description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      />
    </>
  )
})
