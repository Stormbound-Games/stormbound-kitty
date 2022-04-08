import React from 'react'
import { useFela } from 'react-fela'
import Label from '~/components/Label'
import Link from '~/components/Link'
import Footnotes, { Footnote } from '~/components/Footnotes'
import Image from '~/components/Image'
import Radio from '~/components/Radio'
import Page from '~/components/Page'
import Title from '~/components/Title'
import NumberInput from '~/components/NumberInput'
import { HeroCrowns } from '~/components/Resource'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import getHeroScore from '~/helpers/getHeroScore'
import styles from './styles'

export default React.memo(function PageHeroScoreCalculator(props) {
  const { css } = useFela()
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
    <Page
      title='Hero Calculator'
      description='Figure out how to optimize your Hero Score in the Heroes League with this elo rating inspired calculator!'
    >
      <Row isDesktopOnly>
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

          <Spacing bottom='LARGE'>
            <Image
              src='/assets/images/formulas/hero.png'
              alt='Hero Score computing formula'
              width={364}
              height={47}
              withoutWebp
              lazy
            />
          </Spacing>

          <p>
            As of <Link to='/releases/05-2021'>May 2021</Link>, losses are
            limited to <HeroCrowns amount={-10} /> and gains are at least of{' '}
            <HeroCrowns amount={+5} />.
          </p>

          <p>Here are the terms:</p>

          <Spacing bottom='LARGER'>
            <ul className={css(styles.explanation)}>
              <li>
                <var className='Highlight'>
                  S’<sub>A</sub>
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
                (sometimes named “K-factor” in elo rating systems) and works
                like in FIDE:
                <ul className={css({ margin: 'var(--s-smaller) 0' })}>
                  <li>
                    K = 40 for players until they have been in{' '}
                    <Footnote id='matches-30'>
                      30 matches in Diamond and then 30 matches in Heroes League
                    </Footnote>
                  </li>
                  <li>K = 20 for players rated below 2400</li>
                  <li>
                    K = 10 for players who ever reached 2400 during the current
                    season, regardless of their current Hero Score
                  </li>
                </ul>
              </li>
              <li>
                <var className='Highlight'>W</var> is either 1 in case of a win,
                0 for a loss
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
                is capped to 400 to avoid causing too much fluctuations in case
                of uneven matchmaking
              </li>
            </ul>
          </Spacing>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Configuration</Title>
          <Row withNarrowGutter>
            <Row.Column>
              <NumberInput
                label='Current Score'
                id='current'
                name='current'
                value={current}
                onChange={setCurrent}
                required
              />
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Opponent’s Score'
                id='opponent'
                name='opponent'
                value={opponent}
                onChange={setOpponent}
                required
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Select
                label='Coefficient factor'
                id='coefficient'
                value={coefficient}
                onChange={event => setCoefficient(event.target.value)}
                required
              >
                <option value='40'>40 (first 30 ranked matches)</option>
                <option value='20'>20 (scoring below 2400)</option>
                <option value='10'>10 (once scored above 2400)</option>
              </Select>
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <fieldset>
                <Label as='legend'>Game outcome</Label>
                <Radio
                  id='outcome-won'
                  extend={styles.radio}
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
                  extend={styles.radio}
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

          <div className={css(styles.container)}>
            <Image
              src='/assets/images/rank_hero.png'
              alt='Heroes League banner iconography'
              withoutWebp
              width={364}
              height={192}
              lazy
            />
            <span className={css(styles.score)}>{Math.round(newScore)}</span>
          </div>
        </Row.Column>
      </Row>

      <Footnotes>
        <p id='matches-30'>
          (*) The coefficient factor (K) is 40 until the player has done at
          least 30 matches in Diamond—regardless of their outcome—or if they
          have reached the Heroes League with less matches then that. Then it
          resets to 0. And then for another 30 matches in Heroes League, the
          coefficient is 40 again.
          <Link href='#matches-30-ref' aria-label='Back to content'>
            ↩
          </Link>
        </p>
      </Footnotes>
    </Page>
  )
})
