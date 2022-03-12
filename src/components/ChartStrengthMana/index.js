import React from 'react'
import {
  ResponsiveContainer,
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { CardsContext } from '~/components/CardsProvider'
import FactionSelect from '~/components/FactionSelect'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Title from '~/components/Title'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function ChartStrengthMana(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const [faction, setFaction] = React.useState('neutral')
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
            factions.includes(card.faction) &&
            card.type !== 'spell'
        )
        .map(card => getResolvedCardData(cardsIndex, { ...card, level })),
    [cardsIndex, level, factions]
  )
  const getFactionData = React.useCallback(
    faction => {
      const entries = cards.reduce((entries, card) => {
        const key = [card.mana, card.strength].join(',')
        if (entries[key]) entries[key].z++
        else entries[key] = { x: card.mana, y: card.strength, z: 1 }
        return entries
      }, {})

      return Object.values(entries)
    },
    [cards]
  )

  return (
    <>
      <Title>Strength to mana ratio</Title>
      <Row isDesktopOnly>
        <Row.Column>
          <FactionSelect
            value={faction}
            onChange={event => setFaction(event.target.value)}
            name='csm-faction'
            id='csm-faction'
            withNeutral
            withExtendedVersions
          />
        </Row.Column>
        <Row.Column>
          <Select
            label='Level'
            id='csm-level'
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
      <ResponsiveContainer width='100%' height={350}>
        <ScatterChart margin={{ top: 20, right: 0, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' dataKey='x' name='Mana' unit=' mana' />
          <YAxis type='number' dataKey='y' name='Strength' unit=' str' />
          <ZAxis type='number' dataKey='z' name='cards' range={[50, 500]} />
          <Tooltip {...TOOLTIP_STYLES} />
          <Scatter
            name={faction}
            data={getFactionData(faction)}
            fill={`var(--light-${mainFaction}, var(--beige))`}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
})
