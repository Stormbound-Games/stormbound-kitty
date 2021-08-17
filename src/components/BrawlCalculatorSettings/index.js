import React from 'react'
import NumberInput from '~/components/NumberInput'
import Row from '~/components/Row'
import Select from '~/components/Select'
import getRewardLabel from '~/helpers/getRewardLabel'
import { BRAWL_MILESTONES } from '~/constants/brawl'

export default React.memo(function BrawlCalculatorSettings(props) {
  const { setMilestone } = props
  const milestones = BRAWL_MILESTONES[props.difficulty]

  React.useEffect(() => {
    const current = milestones.findIndex(
      milestone => milestone.crowns > props.crowns
    )
    // If the amount of obtained crowns changes and end up being the equivalent
    // of a milestone higher than or equal to the one aimed at, reset the
    // expected milestone.
    if (current > props.milestone) setMilestone('')
  }, [props.crowns, props.milestone, setMilestone, milestones])

  return (
    <>
      <Row>
        <Row.Column>
          <NumberInput
            label='Win rate (%)'
            id='winRate'
            name='winRate'
            value={props.winRate}
            onChange={props.setWinRate}
            min={0}
            max={100}
            placeholder='e.g. 50'
          />
        </Row.Column>
        <Row.Column>
          <NumberInput
            label='Crowns'
            id='crowns'
            name='crowns'
            value={props.crowns}
            onChange={props.setCrowns}
            min={0}
            max={250}
            placeholder='e.g. 5'
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          {props.mode === 'COINS' ? (
            <>
              <NumberInput
                label='Coins'
                id='coins'
                name='coins'
                value={props.coins}
                onChange={props.setCoins}
                min={5}
                step={5}
                placeholder='e.g. 700'
              />
            </>
          ) : props.mode === 'GOAL' ? (
            <Select
              label='Milestone'
              id='milestone'
              value={props.milestone}
              onChange={event => props.setMilestone(+event.target.value)}
            >
              <option value=''>Select a milestone</option>
              {milestones.map((milestone, index) => (
                <option
                  key={milestone.crowns}
                  value={index}
                  disabled={milestone.crowns <= props.crowns}
                >
                  {index + 1}. {getRewardLabel(milestone)}
                </option>
              ))}
            </Select>
          ) : null}
        </Row.Column>
      </Row>
    </>
  )
})
