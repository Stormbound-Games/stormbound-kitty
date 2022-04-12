import React from 'react'
import dynamic from 'next/dynamic'
import Title from '~/components/Title'
import { BrawlContext } from '~/components/BrawlProvider'
import { TOOLTIP_STYLES } from '~/constants/stats'
import FactionSelect from '~/components/FactionSelect'
import styles from './styles'

const Cell = dynamic(() => import('recharts').then(module => module.Cell))
const Legend = dynamic(() => import('recharts').then(module => module.Legend))
const Pie = dynamic(() => import('recharts').then(module => module.Pie))
const PieChart = dynamic(() =>
  import('recharts').then(module => module.PieChart)
)
const ResponsiveContainer = dynamic(() =>
  import('recharts').then(module => module.ResponsiveContainer)
)
const Tooltip = dynamic(() => import('recharts').then(module => module.Tooltip))

const SELECT_LENGTH_MULTIPLIER = {
  '*': '1ch',
  swarm: '1.3ch',
  shadowfen: '1.25ch',
  ironclad: '1.1ch',
  winter: '1.15ch',
}

export default React.memo(function BrawlStatusCharts(props) {
  const [faction, setFaction] = React.useState('*')
  const { session } = React.useContext(BrawlContext)

  const data = [
    {
      name: 'Wins',
      value: session.matches.filter(
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
      value: session.matches.filter(
        match =>
          match.status === 'FORFEIT' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--light-swarm)',
    },
    {
      name: 'Draws',
      value: session.matches.filter(
        match =>
          match.status === 'DRAW' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--light-winter)',
    },
    {
      name: 'Losses by forfeit',
      value: session.matches.filter(
        match =>
          match.status === 'SURRENDERED' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--light-ironclad)',
    },
    {
      name: 'Losses',
      value: session.matches.filter(
        match =>
          match.status === 'LOST' &&
          (faction === '*' || match.opponentFaction === faction)
      ).length,
      color: 'var(--ironclad)',
    },
  ]

  return (
    <div
      style={{
        '--length': (faction === '*' ? 'all factions' : faction).length,
        '--multiplier': SELECT_LENGTH_MULTIPLIER[faction],
      }}
    >
      <Title extend={styles.title}>
        Ratio vs.{' '}
        <FactionSelect
          hideLabel
          extend={styles.select}
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
