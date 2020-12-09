import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import NumberInput from '../NumberInput'
import Row from '../Row'
import Title from '../Title'
import { BrawlContext } from '../BrawlProvider'
import { TOOLTIP_STYLES } from '../../constants/stats'
import './index.css'

const getWeighedScore = baseHealth => match => {
  // If the opponent’s health is not provided, consider it equal to base health.
  const opponentHealth = match.opponentHealth || baseHealth

  switch (baseHealth - opponentHealth) {
    // If the two base health are in a +1/-1 range, count the victory/loss as
    // normal
    case -1:
    case 0:
    case +1:
      return 1

    // If over-leveling the opponent by +2 or +3, downrank a victory, uprank a
    // loss
    case +2:
    case +3:
      return match.status === 'WON' ? 0.75 : 1.25

    // If under-leveling the opponent by +2 or +3, uprank a victory, downrank a
    // loss
    case -2:
    case -3:
      return match.status === 'WON' ? 1.25 : 0.75

    default:
      // If over-leveling the opponent by +4+, downrank a victory and uprank a
      // loss and if under-leveling the opponent by +4+, uprank a victory and
      // downrank a loss
      return (baseHealth > opponentHealth && match.status === 'WON') ||
        (baseHealth < opponentHealth && match.status === 'LOST')
        ? 0.5
        : 1.5
  }
}

const BrawlBaseHealthInput = props => (
  <div className='BrawlBaseHealthInput'>
    <label htmlFor='base-health'>Base health</label>
    <NumberInput
      min={10}
      max={20}
      id='base-health'
      name='base-health'
      value={props.baseHealth}
      onChange={props.setBaseHealth}
    />
  </div>
)

export default React.memo(function BrawlCharts(props) {
  const [baseHealth, setBaseHealth] = React.useState(18)
  const { brawl } = React.useContext(BrawlContext)
  const wins = brawl.matches.filter(match => match.status === 'WON')
  const losses = brawl.matches.filter(match => match.status === 'LOST')
  const getScore = getWeighedScore(baseHealth)
  const getWinValue = () =>
    wins.reduce((score, match) => score + getScore(match), 0) /
    (wins.length + losses.length)
  const getLossValue = () =>
    losses.reduce((score, match) => score + getScore(match), 0) /
    (losses.length + wins.length)
  const data = [
    {
      name: 'Win index',
      value: wins.length ? +getWinValue().toFixed(2) : 0,
      color: 'var(--light-shadowfen)',
    },
    {
      name: 'Loss index',
      value: losses.length ? +getLossValue().toFixed(2) : 0,
      color: 'var(--light-ironclad)',
    },
  ]

  return (
    <div className='BrawlWeighedStatusChart'>
      <Title className='BrawlWeighedStatusChart__title'>
        Weighed win ratio
      </Title>
      <Row desktopOnly>
        <Row.Column>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Tooltip {...TOOLTIP_STYLES} />
              <Legend verticalAlign='bottom' />
              <Pie
                data={data}
                dataKey='value'
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={80}
                label
                startAngle={90}
                endAngle={360 + 90}
              >
                {data.map(level => (
                  <Cell key={`cell-${level}`} fill={level.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Row.Column>
        <Row.Column>
          <BrawlBaseHealthInput
            baseHealth={baseHealth}
            setBaseHealth={setBaseHealth}
          />
          <p>
            By specifying your base health, you can get more accurate insights
            into your performance with weighed win/rate ratio. In that case:
          </p>
          <ul className='BrawlWeighedStatusChart__list'>
            <li>Wins by forfeit do not count</li>
            <li>
              Wins vs. a <span className='Highlight'>-4+</span> opponent count
              for <span className='Highlight'>50%</span>
            </li>
            <li>
              Wins vs. a <span className='Highlight'>-2/-3</span> opponent count
              for <span className='Highlight'>75%</span>
            </li>
            <li>
              Wins vs. a <span className='Highlight'>-1/+1</span> opponent count
              as <span className='Highlight'>normal</span>
            </li>
            <li>
              Wins vs. a <span className='Highlight'>+2/+3</span> opponent count
              for <span className='Highlight'>125%</span>
            </li>
            <li>
              Wins vs. a <span className='Highlight'>+4+</span> opponent count
              for <span className='Highlight'>150%</span>
            </li>
          </ul>
        </Row.Column>
      </Row>
    </div>
  )
})
