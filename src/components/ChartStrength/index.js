import React from 'react'
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import FactionSelect from '../FactionSelect'
import Column from '../Column'
import Row from '../Row'
import Title from '../Title'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import CARDS from '../../data/cards'
import { TOOLTIP_STYLES } from '../../constants/stats'

const ChartStrength = props => {
  const [faction, setFaction] = React.useState('*')
  const [level, setLevel] = React.useState(5)

  const cards = React.useMemo(
    () =>
      CARDS.filter(
        card => !card.token && (faction === '*' || card.faction === faction)
      ).map(card => resolveCardForLevel({ ...card, level })),
    [level, faction]
  )

  const data = Object.values(
    cards.reduce((acc, card) => {
      const { strength } = card

      if (!strength) return acc

      if (typeof acc[strength] === 'undefined') {
        acc[strength] = { name: strength, value: 0 }
      }

      acc[strength].value++

      return acc
    }, {})
  )

  return (
    <>
      <Title>Unit &amp; structure Strength</Title>
      <Row desktopOnly>
        <Column>
          <FactionSelect
            value={faction}
            onChange={event => setFaction(event.target.value)}
            name='cs-faction'
            id='cs-faction'
            withNeutral
            withAny
          />
        </Column>
        <Column>
          <label htmlFor='cs-level'>Level</label>
          <select
            name='cs-level'
            id='cs-level'
            value={level}
            onChange={event => setLevel(+event.target.value)}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </Column>
      </Row>
      <ResponsiveContainer width='100%' height={350}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, bottom: 0, left: -25 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip
            {...TOOLTIP_STYLES}
            labelFormatter={label => label + ' strength'}
            formatter={label => label + ' cards'}
          />
          <Line
            type='monotone'
            dataKey='value'
            stroke={`var(--light-${
              faction === '*' ? 'neutral' : faction
            }, var(--beige))`}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default ChartStrength
