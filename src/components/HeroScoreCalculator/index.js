import React from 'react'
import Radio from '../Radio'
import HeaderBanner from '../HeaderBanner'
import Title from '../Title'
import NumberInput from '../NumberInput'
import Row from '../Row'
import getHeroScore from '../../helpers/getHeroScore'
import './index.css'

const HeroScoreCalculator = props => {
  const [current, setCurrent] = React.useState(1000)
  const [opponent, setOpponent] = React.useState(1000)
  const [coefficient, setCoefficient] = React.useState(20)
  const [outcome, setOutcome] = React.useState('LOST')
  const newScore = getHeroScore({
    current,
    opponent,
    coefficient,
    won: outcome === 'WON',
  })

  return (
    <>
      <HeaderBanner title='Hero Calculator' />

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>What is this</Title>

          <p>
            The Hero Score is a player’s score defined by the amount of Hero
            Crowns they possess. These crowns are gained or lost after every
            game played in the Diamond and the Heroes league.
          </p>

          <p>
            The new Hero Score is computed from the former Hero Score with the
            following formula:
          </p>

          <img
            src='/assets/images/releases/hero_score_formula.png'
            alt='Hero Score computing formula'
            className='HeroScoreCalculator__formula'
          />

          <p>Here are the terms:</p>

          <ul style={{ marginBottom: '3em' }}>
            <li>
              <var className='Highlight'>
                S'<sub>A</sub>
              </var>{' '}
              is the new Hero Score
            </li>
            <li>
              <var className='Highlight'>
                S<sub>A</sub>
              </var>{' '}
              is the current Hero Score
            </li>
            <li>
              <var className='Highlight'>K</var> is the coefficient factor
              (sometimes named “K-factor” in elo rating systems) and works like
              in FIDE:
              <ul style={{ margin: '0.5em 0' }}>
                <li>
                  K = 40 for new players until they have played 30 matches in
                  Diamond
                </li>
                <li>K = 20 for players rated below 2400</li>
                <li>
                  K = 10 for players who ever reached 2400, regardless of their
                  current Hero Score
                </li>
              </ul>
            </li>
            <li>
              <var className='Highlight'>W</var> is either 1 in case of a win, 0
              for a loss
            </li>
            <li>
              <var className='Highlight'>
                S<sub>B</sub>
              </var>{' '}
              is the opponent’s score; the difference between{' '}
              <var className='Highlight'>
                S<sub>A</sub>
              </var>{' '}
              and{' '}
              <var className='Highlight'>
                S<sub>B</sub>
              </var>{' '}
              is capped to 400 to avoid causing too much fluctuations in case of
              uneven matchmaking
            </li>
          </ul>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Configuration</Title>
          <Row>
            <Row.Column>
              <label htmlFor='current'>Current Hero Score</label>
              <NumberInput
                id='current'
                name='current'
                value={current}
                min={1000}
                onChange={setCurrent}
                required
              />
            </Row.Column>
            <Row.Column>
              <label htmlFor='current'>Opponent’s Hero Score</label>
              <NumberInput
                id='opponent'
                name='opponent'
                value={opponent}
                min={1000}
                onChange={setOpponent}
                required
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <label htmlFor='coefficient'>Coefficient factor</label>
              <select
                name='coefficient'
                id='coefficient'
                value={coefficient}
                onChange={event => setCoefficient(event.target.value)}
                required
              >
                <option value='40'>40 (first 30 ranked matches)</option>
                <option value='20'>20 (scoring below 2400)</option>
                <option value='10'>10 (once scored above 2400)</option>
              </select>
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <fieldset>
                <legend>Game outcome</legend>
                <Radio
                  id='outcome-won'
                  className='HeroScoreCalculator__radio'
                  name='outcome'
                  value='WON'
                  checked={outcome === 'WON'}
                  onChange={() => setOutcome('WON')}
                  required
                >
                  Game won
                </Radio>

                <Radio
                  id='outcome-lost'
                  className='HeroScoreCalculator__radio'
                  name='outcome'
                  value='LOST'
                  checked={outcome === 'LOST'}
                  onChange={() => setOutcome('LOST')}
                  required
                >
                  Game lost
                </Radio>
              </fieldset>
            </Row.Column>
          </Row>
        </Row.Column>

        <Row.Column width='1/3'>
          <Title>Outcome</Title>

          <p>
            Given a current Hero Score of {current} (with a coefficient of{' '}
            {coefficient}), and having {outcome.toLowerCase()} against an
            opponent with a Hero Score of {opponent}, your new Hero Score is
            estimated to be:
          </p>

          <div className='HeroScore'>
            <img
              className='HeroScore__image'
              src='/assets/images/releases/rank_hero.png'
              alt=''
            />
            <span className='HeroScore__score'>{Math.round(newScore)}</span>
          </div>
        </Row.Column>
      </Row>
    </>
  )
}

export default React.memo(HeroScoreCalculator)
