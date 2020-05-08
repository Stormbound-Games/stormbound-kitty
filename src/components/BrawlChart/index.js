import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Title from '../Title'
import { BrawlContext } from '../BrawlProvider'
import { TOOLTIP_STYLES } from '../../constants/stats'
import FactionSelect from '../FactionSelect'
import capitalise from '../../helpers/capitalise'
import './index.css'
export default React.memo(function BrawlChart(props) {
  const [faction, setFaction] = React.useState('*')
  const { brawl } = React.useContext(BrawlContext)

  if (brawl.matches.length === 0) {
    return null
  }

  const data = [
    {
      name: 'Wins',
      value: brawl.matches.filter(
        match =>
          match.status === 'WON' &&
          (faction === '*' || match.oFaction === faction)
      ).length,
      color: 'var(--light-shadowfen)',
    },
    {
      name: 'Wins by forfeit',
      value: brawl.matches.filter(
        match =>
          match.status === 'FORFEIT' &&
          (faction === '*' || match.oFaction === faction)
      ).length,
      color: 'var(--light-swarm)',
    },
    {
      name: 'Losses',
      value: brawl.matches.filter(
        match =>
          match.status === 'LOST' &&
          (faction === '*' || match.oFaction === faction)
      ).length,
      color: 'var(--light-ironclad)',
    },
  ]

  return (
    <>
      <Title className='BrawlChart__title'>
        Ratio{faction !== '*' && ' against ' + capitalise(faction)}
      </Title>
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

      <FactionSelect
        withAny
        label='Against faction'
        faction={faction}
        onChange={event => setFaction(event.target.value)}
      />
    </>
  )
})
