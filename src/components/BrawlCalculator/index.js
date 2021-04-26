import React from 'react'
import { Link } from 'react-router-dom'
import BrawlCalculatorDiscount from '../BrawlCalculatorDiscount'
import BrawlCalculatorLegendaryToggle from '../BrawlCalculatorLegendaryToggle'
import BrawlCalculatorMode from '../BrawlCalculatorMode'
import BrawlCalculatorOutcome from '../BrawlCalculatorOutcome'
import BrawlCalculatorPremiumPassToggle from '../BrawlCalculatorPremiumPassToggle'
import BrawlCalculatorSettings from '../BrawlCalculatorSettings'
import BrawlCalculatorSetup from '../BrawlCalculatorSetup'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Table from '../Table'
import { Coins, Crowns } from '../Resource'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import getRewardLabel from '../../helpers/getRewardLabel'

export default React.memo(function BrawlCalculator(props) {
  const [withPremiumPass, setWithPremiumPass] = React.useState(false)
  const [mode, setMode] = React.useState('')
  const [winRate, setWinRate] = React.useState(50)
  const [coins, setCoins] = React.useState('')
  const [crowns, setCrowns] = React.useState(0)
  const [milestone, setMilestone] = React.useState('')
  const [setup, setSetup] = React.useState('NONE')
  const [discount, setDiscount] = React.useState(0)
  const [hasLegendary5, setHasLegendary5] = React.useState(false)

  React.useEffect(() => {
    setMilestone('')
    setCoins('')
  }, [mode])

  return (
    <>
      <HeaderBanner title='Brawl Calculator' />
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
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
        </Row.Column>
        <Row.Column width='2/3'>
          <Row desktopOnly wideGutter>
            <Row.Column>
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
                crowns={crowns}
                setCrowns={setCrowns}
              />
              <BrawlCalculatorPremiumPassToggle
                checked={withPremiumPass}
                onChange={event => setWithPremiumPass(event.target.checked)}
              />
              <BrawlCalculatorLegendaryToggle
                mode={mode}
                milestone={milestone}
                checked={hasLegendary5}
                onChange={event => setHasLegendary5(event.target.checked)}
              />
              <BrawlCalculatorSetup setup={setup} setSetup={setSetup} />
              <BrawlCalculatorDiscount
                discount={discount}
                setDiscount={setDiscount}
              />
            </Row.Column>
            <Row.Column>
              <Title>Outcome</Title>
              <BrawlCalculatorOutcome
                crowns={crowns}
                discount={discount}
                coins={coins}
                milestone={milestone}
                mode={mode}
                setup={setup}
                winRate={winRate}
                hasLegendary5={hasLegendary5}
                withPremiumPass={withPremiumPass}
              />
            </Row.Column>
          </Row>
          <Only.Desktop>
            <Title>Milestones breakdown</Title>
            <Table>
              <thead>
                <tr>
                  <th>Required crowns</th>
                  <th>Cost per match</th>
                  {discount > 0 ? (
                    <th>Discount per match</th>
                  ) : (
                    <th>Reward once reached</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {MILESTONES.map(milestone => {
                  // discount = 100% -> multiplier = 0.00
                  // discount =   0% -> multiplier = 1.00
                  // discount =  50% -> multiplier = 0.50
                  // discount =  25% -> multiplier = 0.75
                  const costModifier = (100 - discount) / 100
                  const cost =
                    Math.ceil(Math.ceil(milestone.cost * costModifier) / 5) * 5

                  return (
                    <tr key={milestone.crowns}>
                      <td>
                        <Crowns amount={milestone.crowns} />
                      </td>
                      <td>
                        <Coins amount={cost} />
                      </td>
                      {discount > 0 ? (
                        <td>
                          <Coins amount={-1 * (milestone.cost - cost)} />
                        </td>
                      ) : (
                        <td>{getRewardLabel(milestone, true)}</td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Only.Desktop>
        </Row.Column>
      </Row>
      <PageMeta
        title='Brawl Calculator'
        description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      />
    </>
  )
})
