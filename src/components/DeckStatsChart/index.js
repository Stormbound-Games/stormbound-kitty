import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import computeDeckChartData from '~/helpers/computeDeckChartData'
import useIsMounted from '~/hooks/useIsMounted'
import { TOOLTIP_STYLES } from '~/constants/stats'
import styles from './styles'

export default React.memo(function DeckStatsChart(props) {
  const isMounted = useIsMounted()
  const { css } = useFela()

  if (!isMounted) return null

  const data = computeDeckChartData(props.deck, props.modifier)

  return (
    <>
      <div className={css(styles.chart)}>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: -23, bottom: 5 }}
            syncId={props.syncId}
          >
            <XAxis dataKey='mana' />
            <YAxis />
            <Tooltip
              {...TOOLTIP_STYLES}
              labelFormatter={mana => 'Mana ' + mana}
              formatter={(value, entry, index) => `${value}%`}
            />
            <Legend align='left' wrapperStyle={{ paddingLeft: '40px' }} />
            <Line
              name='Chances to spend all mana'
              type='monotone'
              dataKey='usingAllMana'
              stroke='#3985af'
              strokeWidth={2}
            />
            <Line
              name='Chances to play all cards'
              type='monotone'
              dataKey='playingAllCards'
              stroke='var(--affordable)'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {props.withHowTo && (
          <Link to='/guides/mana-curve' className={css(styles.howTo)}>
            How to read this graph?
          </Link>
        )}
      </div>

      {props.withModifiers && (
        <Spacing top='BASE' bottom='LARGE'>
          <Select
            label='Brawl modifier'
            id='brawl-modifier'
            data-testid='brawl-modifier'
            value={props.modifier}
            onChange={event => props.setModifier(event.target.value)}
          >
            <option value='NONE'>None</option>
            {props.brawls.map(brawl => (
              <option key={brawl.id} value={brawl.id}>
                {brawl.name}
              </option>
            ))}
          </Select>
        </Spacing>
      )}
    </>
  )
})
