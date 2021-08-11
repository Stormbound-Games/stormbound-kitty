import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Loader from '../Loader'
import Select from '../Select'
import computeDeckChances from '../../helpers/computeDeckChances'
import { TOOLTIP_STYLES } from '../../constants/stats'
import { BRAWLS } from '../../constants/brawl'
import styles from './styles'

const computeData = async (deck, modifier) => {
  const data = []
  let mana = 3
  let odds = computeDeckChances(deck, mana, modifier)

  // This avoids an edge case where no cards are playable on the first turn
  // (yielding 0% on both lines, and therefore never entering the loop).
  while (
    (odds.usingAllMana === 0 && odds.playingAllCards === 0) ||
    (odds.usingAllMana > 0 && odds.playingAllCards < 100)
  ) {
    data.push({
      mana,
      usingAllMana: +odds.usingAllMana.toFixed(2),
      playingAllCards: +odds.playingAllCards.toFixed(2),
    })
    mana += 1
    odds = computeDeckChances(deck, mana, modifier)
  }

  data.push({
    mana,
    usingAllMana: +odds.usingAllMana.toFixed(2),
    playingAllCards: +odds.playingAllCards.toFixed(2),
  })

  return data
}

export default React.memo(function DeckStatsChart(props) {
  const { css } = useFela()
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)

    computeData(props.deck, props.modifier)
      .then(response => setData(response))
      .finally(() => setLoading(false))
  }, [props.deck, props.modifier])

  // Only enable the loading state when there is no data to begin with, but
  // not when re-rendering the chart, so the visualisation animates from the
  // current state to the new state without display a spinner in between.
  if (loading && data.length === 0) return <Loader />

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
        <div className={css(styles.select)}>
          <Select
            label='Brawl modifier'
            id='brawl-modifier'
            data-testid='brawl-modifier'
            value={props.modifier}
            onChange={event => props.setModifier(event.target.value)}
          >
            <option value='NONE'>None</option>
            {BRAWLS.map(brawl => (
              <option key={brawl.id} value={brawl.id}>
                {brawl.label}
              </option>
            ))}
          </Select>
        </div>
      )}
    </>
  )
})
