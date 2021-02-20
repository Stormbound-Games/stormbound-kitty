import React from 'react'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import Row from '../Row'
import getHeroScore from '../../helpers/getHeroScore'

const HeroScoreCalculator = props => {
  const [current, setCurrent] = React.useState(1000)
  const [opponent, setOpponent] = React.useState(1000)
  const [coefficient, setCoefficient] = React.useState(20)
  const [won, setWon] = React.useState(false)
  const outcome = getHeroScore({ current, opponent, coefficient, won })

  return (
    <Row desktopOnly>
      <Row.Column>
        <p>
          <label htmlFor='current'>Current Elo ranking</label>
          <NumberInput
            id='current'
            name='current'
            value={current}
            min={1000}
            onChange={setCurrent}
            required
          />
        </p>
        <p>
          <label htmlFor='current'>Opponent’s Elo ranking</label>
          <NumberInput
            id='opponent'
            name='opponent'
            value={opponent}
            min={1000}
            onChange={setOpponent}
            required
          />
        </p>
      </Row.Column>
      <Row.Column>
        <p>
          <label htmlFor='coefficient'>Coefficient factor</label>
          <select
            name='coefficient'
            id='coefficient'
            value={coefficient}
            onChange={event => setCoefficient(event.target.value)}
            required
          >
            <option value='40'>40 (first 30 ranked matches)</option>
            <option value='20'>20 (ranking below 2400)</option>
            <option value='10'>10 (once ranked above 2400)</option>
          </select>
        </p>
        <p>
          <Checkbox
            name='won'
            id='won'
            checked={won}
            onChange={event => setWon(event.target.checked)}
          >
            Match won
          </Checkbox>
        </p>
        <p>
          Expected new Elo ranking: <span className='Highlight'>{outcome}</span>
        </p>
      </Row.Column>
    </Row>
  )
}

export default React.memo(HeroScoreCalculator)
