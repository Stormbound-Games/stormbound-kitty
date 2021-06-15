import React from 'react'
import { Link } from 'react-router-dom'
import BrawlCalculatorDiscount from '../BrawlCalculatorDiscount'
import BrawlCalculatorLegendaryToggle from '../BrawlCalculatorLegendaryToggle'
import BrawlCalculatorMode from '../BrawlCalculatorMode'
import BrawlCalculatorOutcome from '../BrawlCalculatorOutcome'
import BrawlCalculatorSettings from '../BrawlCalculatorSettings'
import BrawlCalculatorSetup from '../BrawlCalculatorSetup'
import BrawlDifficultySelect from '../BrawlDifficultySelect'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Only from '../Only'
import PageMeta from '../PageMeta'
import PremiumPassCheckbox from '../PremiumPassCheckbox'
import Row from '../Row'
import Table from '../Table'
import { Coins, Crowns } from '../Resource'
import Title from '../Title'
import { BRAWL_MILESTONES } from '../../constants/brawl'
import getMilestoneCost from '../../helpers/getRewardLabel'
import getRewardLabel from '../../helpers/getRewardLabel'
import './index.css'

export default React.memo(function BrawlCalculator(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
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
        <Row.Column width='2/3'>
          <Row desktopOnly wideGutter>
            <Row.Column>
              <Title>Goal</Title>
              <BrawlDifficultySelect
                className='BrawlCalculator__difficulty'
                value={difficulty}
                onChange={event => setDifficulty(event.target.value)}
              />
              <BrawlCalculatorMode mode={mode} setMode={setMode} />
              <BrawlCalculatorSettings
                difficulty={difficulty}
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
              <Info icon='sword' title='Brawl tracker'>
                To keep track of your expenses and win ratio during the Brawl,
                use the <Link to='/brawl'>Brawl tracker</Link>. New to the
                Brawl? <Link to='/guides/brawl'>Read the guide</Link>.
              </Info>
            </Row.Column>
            <Row.Column>
              <div className='BrawlCalculator__section'>
                <Title>Setup</Title>
                <BrawlCalculatorSetup setup={setup} setSetup={setSetup} />
                <PremiumPassCheckbox
                  checked={withPremiumPass}
                  onChange={event => setWithPremiumPass(event.target.checked)}
                  withFootnote
                />
                <BrawlCalculatorLegendaryToggle
                  mode={mode}
                  milestone={milestone}
                  checked={hasLegendary5}
                  onChange={event => setHasLegendary5(event.target.checked)}
                />
              </div>
              <BrawlCalculatorDiscount
                discount={discount}
                setDiscount={setDiscount}
              />
            </Row.Column>
          </Row>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Outcome</Title>
          <BrawlCalculatorOutcome
            coins={coins}
            crowns={crowns}
            difficulty={difficulty}
            discount={discount}
            hasLegendary5={hasLegendary5}
            milestone={milestone}
            mode={mode}
            setup={setup}
            winRate={winRate}
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
              <th>Cost per match {withPremiumPass ? '(Premium)' : ''}</th>
              {discount > 0 ? (
                <th>Discount per match</th>
              ) : (
                <th>Reward once reached</th>
              )}
            </tr>
          </thead>
          <tbody>
            {BRAWL_MILESTONES[difficulty].map(milestone => {
              // While this is not confirmed yet, there seem to be no plan
              // to add multiple discounts, so we take the highest discount
              // (hence lowest cost modifier).
              // discount = 100% -> multiplier = 0.00
              // discount =   0% -> multiplier = 1.00
              // discount =  50% -> multiplier = 0.50
              // discount =  25% -> multiplier = 0.75
              const costModifier = Math.min(
                withPremiumPass ? 0.9 : 1,
                (100 - discount) / 100
              )

              const cost = getMilestoneCost(milestone, costModifier)

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

      <footer style={{ marginTop: '2em' }}>
        <h2 className='VisuallyHidden' id='footnotes'>
          Footnotes
        </h2>
        <p id='multiple-discounts'>
          (*) At this stage, there is no intention to have cumulative Brawl
          discounts in case the owner of the Premium Pass takes part in a
          discounted Brawl. The exact outcome of such situation is not confirmed
          yet, but it is likely only the highest discount will be applied.{' '}
          <a href='#multiple-discounts-ref' aria-label='Back to content'>
            ↩
          </a>
        </p>
      </footer>
      <PageMeta
        title='Brawl Calculator'
        description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      />
    </>
  )
})
