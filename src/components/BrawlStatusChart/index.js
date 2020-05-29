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
import './index.css'

const SELECT_LENGTH_MULTIPLIER = {
  '*': '1ch',
  swarm: '1.3ch',
  shadowfen: '1.25ch',
  ironclad: '1.1ch',
  winter: '1.15ch',
}

export default React.memo(function BrawlCharts(props) {
  const [faction, setFaction] = React.useState('*')
  const { brawl } = React.useContext(BrawlContext)

  const data = [
    {
      name: 'Wins',
      value: brawl.matches.filter(
        match =>
          match.status === 'WON' &&
          (faction === '*' ||
            match.opponentFaction === faction ||
            (!faction && !match.opponentFaction))
      ).length,
      color: 'var(--light-shadowfen)',
    },
    {
      name: 'Wins by forfeit',
      value: brawl.matches.filter(
        match =>
          match.status === 'FORFEIT' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--light-swarm)',
    },
    {
      name: 'Losses',
      value: brawl.matches.filter(
        match =>
          match.status === 'LOST' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--light-ironclad)',
    },
  ]

  return (
    <div
      className='BrawlStatusChart'
      style={{
        '--length': (faction === '*' ? 'all factions' : faction).length,
        '--multiplier': SELECT_LENGTH_MULTIPLIER[faction],
      }}
    >
      <Title className='BrawlStatusChart__title'>
        Ratio vs.{' '}
        <FactionSelect
          labelClassName='VisuallyHidden'
          anyLabel='all factions'
          withAny
          withEmpty
          emptyLabel='Unknown faction'
          label='Against faction'
          faction={faction}
          onChange={event => setFaction(event.target.value)}
        />
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
    </div>
  )
})
