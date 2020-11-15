import React from 'react'
import NumberInput from '../NumberInput'
import Row from '../Row'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import { MILESTONES } from '../../constants/brawl'

export default React.memo(function BrawlCalculatorSettings(props) {
  const { setMilestone } = props

  React.useEffect(() => {
    const current = MILESTONES.findIndex(
      milestone => milestone.crowns > props.crowns
    )
    // If the amount of obtained crowns changes and end up being the equivalent
    // of a milestone higher than or equal to the one aimed at, reset the
    // expected milestone.
    if (current > props.milestone) setMilestone('')
  }, [props.crowns, props.milestone, setMilestone])

  return (
    <>
      <Row>
        <Row.Column>
          <label htmlFor='winRate'>Win rate (%)</label>
          <NumberInput
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
          <label htmlFor='crowns'>Crowns</label>
          <NumberInput
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
              <label htmlFor='coins'>Coins</label>
              <NumberInput
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
                  <option
                    key={milestone.crowns}
                    value={index}
                    disabled={milestone.crowns <= props.crowns}
                  >
                    {index + 1}. {getBrawlRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </Row.Column>
      </Row>
    </>
  )
})
