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
import { CardsContext } from '~/components/CardsProvider'
import FactionSelect from '~/components/FactionSelect'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Title from '~/components/Title'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function ChartMana(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const [faction, setFaction] = React.useState('*')
  const [level, setLevel] = React.useState(5)
  const factions = faction.split(',')
  const mainFaction =
    factions.length > 1
      ? factions.filter(faction => faction !== 'neutral')
      : factions[0]

  const cards = React.useMemo(
    () =>
      Object.values(cardsIndex)
        .filter(
          card =>
            !card.token &&
            (factions[0] === '*' || factions.includes(card.faction))
        )
        .map(card => getResolvedCardData(cardsIndex, { ...card, level })),
    [cardsIndex, level, factions]
  )

  const data = Object.values(
    cards
      .filter(card => !card.token)
      .reduce((acc, card) => {
        if (typeof acc[card.mana] === 'undefined') {
          acc[card.mana] = { name: card.mana, value: 0 }
        }

        acc[card.mana].value++
        return acc
      }, {})
  )

  return (
    <>
      <Title>Card Mana cost</Title>
      <Row isDesktopOnly>
        <Row.Column>
          <FactionSelect
            value={faction}
            onChange={event => setFaction(event.target.value)}
            name='cm-faction'
            id='cm-faction'
            withNeutral
            withAny
            withExtendedVersions
          />
        </Row.Column>
        <Row.Column>
          <Select
            label='Level'
            id='cm-level'
            value={level}
            onChange={event => setLevel(+event.target.value)}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Select>
        </Row.Column>
      </Row>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, bottom: 0, left: -25 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip
            {...TOOLTIP_STYLES}
            labelFormatter={label => label + ' mana'}
            formatter={label => label + ' cards'}
          />
          <Line
            type='monotone'
            dataKey='value'
            stroke={`var(--light-${
              faction === '*' ? 'neutral' : mainFaction
            }, var(--beige))`}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
})
