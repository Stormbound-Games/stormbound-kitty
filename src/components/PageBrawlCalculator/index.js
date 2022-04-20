import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import BrawlCalculatorDiscount from '~/components/BrawlCalculatorDiscount'
import BrawlCalculatorLegendaryToggle from '~/components/BrawlCalculatorLegendaryToggle'
import BrawlCalculatorMode from '~/components/BrawlCalculatorMode'
import BrawlCalculatorOutcome from '~/components/BrawlCalculatorOutcome'
import BrawlCalculatorSettings from '~/components/BrawlCalculatorSettings'
import BrawlCalculatorSetup from '~/components/BrawlCalculatorSetup'
import BrawlDifficultySelect from '~/components/BrawlDifficultySelect'
import Info from '~/components/Info'
import Only from '~/components/Only'
import PremiumPassCheckbox from '~/components/PremiumPassCheckbox'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Table from '~/components/Table'
import { Coins, Crowns } from '~/components/Resource'
import Title from '~/components/Title'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import getMilestoneCost from '~/helpers/getMilestoneCost'
import getResourceLabel from '~/helpers/getResourceLabel'

export default React.memo(function PageBrawlCalculator() {
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
    <Page
      title='Brawl Calculator'
      description='Find a calculator for making the best out of the Brawl based on your current savins or your objectives'
      action={{ to: '/brawl', children: 'Brawl tracker', icon: 'arrow-right' }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Goal</Title>
          <Spacing bottom='LARGE'>
            <BrawlDifficultySelect
              value={difficulty}
              onChange={event => setDifficulty(event.target.value)}
            />
          </Spacing>
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
            <p>
              To keep track of your expenses and win ratio during the Brawl, use
              the <Link to='/brawl'>Brawl tracker</Link>. New to the Brawl?{' '}
              <Link to='/brawl-mode'>Read the guide</Link>.
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='1/3'>
          <Spacing bottom='LARGER'>
            <Title>Setup</Title>
            <BrawlCalculatorSetup setup={setup} setSetup={setSetup} />
            <PremiumPassCheckbox
              checked={withPremiumPass}
              onChange={event => setWithPremiumPass(event.target.checked)}
            />
            <BrawlCalculatorLegendaryToggle
              mode={mode}
              milestone={milestone}
              checked={hasLegendary5}
              onChange={event => setHasLegendary5(event.target.checked)}
            />
          </Spacing>
          <BrawlCalculatorDiscount
            discount={discount}
            setDiscount={setDiscount}
          />
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
                    <td>{getResourceLabel(milestone, true)}</td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Only.Desktop>
    </Page>
  )
})
