import React from 'react'
import { Link } from 'react-router-dom'
import BrawlCalculatorDiscount from '../BrawlCalculatorDiscount'
import BrawlCalculatorMode from '../BrawlCalculatorMode'
import BrawlCalculatorOutcome from '../BrawlCalculatorOutcome'
import BrawlCalculatorSettings from '../BrawlCalculatorSettings'
import BrawlCalculatorSetup from '../BrawlCalculatorSetup'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'

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
          <BrawlCalculatorMode mode={mode} setMode={setMode} />
          <BrawlCalculatorSettings
            mode={mode}
            milestone={milestone}
            setMilestone={setMilestone}
            coins={coins}
            setCoins={setCoins}
            winRate={winRate}
            setWinRate={setWinRate}
          />
          <BrawlCalculatorSetup setup={setup} setSetup={setSetup} />
          <BrawlCalculatorDiscount
            discount={discount}
            setDiscount={setDiscount}
          />
        </Column>
        <Column width='1/3'>
          <Title>Outcome</Title>
          <BrawlCalculatorOutcome
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
