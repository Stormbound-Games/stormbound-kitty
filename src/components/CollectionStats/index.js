import React from 'react'
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  YAxis,
  XAxis,
  Legend,
  Cell,
  Tooltip,
  PieChart,
  Pie,
} from 'recharts'
import { CollectionContext } from '../CollectionProvider'
import Checkbox from '../Checkbox'
import CollectionFigures from '../CollectionFigures'
import Column from '../Column'
import ImportCollection from '../ImportCollection'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import cards from '../../data/cards'
import getRawCardData from '../../helpers/getRawCardData'
import capitalise from '../../helpers/capitalise'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import { getCardCost } from '../../helpers/getCollectionCost'
import { getRarityColor } from '../../helpers/getRarity'
import { RARITIES, RARITY_COPIES } from '../../constants/game'
import { TOOLTIP_STYLES } from '../../constants/stats'
import './index.css'

const COLORS = [
  'rgb(222, 215, 164)',
  'rgb(202, 210, 170)',
  'rgb(182, 205, 176)',
  'rgb(162, 200, 182)',
  'rgb(142, 195, 188)',
  'rgb(122, 190, 194)',
]

const getLevelData = collection => {
  const data = [1, 2, 3, 4, 5].map(level => ({
    name: 'Level ' + level,
    value: 0,
    color: COLORS[level],
  }))

  data.unshift({ name: 'Missing', value: 0, color: COLORS[0] })

  collection.forEach(card => {
    if (card.missing) data[0].value++
    else data[card.level].value++
  })

  return data.reverse()
}

const getFactionData = collection => {
  const data = {
    neutral: { name: 'Neutral', color: 'var(--beige)', value: 0 },
    swarm: { name: 'Swarm', color: 'var(--swarm)', value: 0 },
    ironclad: { name: 'Ironclad', color: 'var(--ironclad)', value: 0 },
    winter: { name: 'Winter', color: 'var(--winter)', value: 0 },
    shadowfen: { name: 'Shadowfen', color: 'var(--shadowfen)', value: 0 },
  }

  collection.forEach(card => {
    const resolvedCard = getResolvedCardData(card)

    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (resolvedCard) {
      data[resolvedCard.faction].value += getCardCost(resolvedCard)
    }
  })

  return Object.keys(data).map(faction => data[faction])
}

const getRarityData = collection => {
  const data = {
    common: { name: 'Common', value: 0 },
    rare: { name: 'Rare', value: 0 },
    epic: { name: 'Epic', value: 0 },
    legendary: { name: 'Legendary', value: 0 },
  }

  collection.forEach(card => {
    const resolvedCard = getResolvedCardData(card)

    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (resolvedCard) {
      data[resolvedCard.rarity].value += getCardCost(resolvedCard)
    }
  })

  return Object.keys(data).map(rarity => data[rarity])
}

const getStatusData = collection => {
  const data = {
    upgradable: { name: 'Upgradable', color: 'var(--upgradable)', value: 0 },
    notUpgradable: {
      name: 'Not upgradable',
      color: 'rgb(162, 185, 182)',
      value: 0,
    },
    missing: { name: 'Missing', color: 'rgb(222, 215, 164)', value: 0 },
    maxedOut: { name: 'Maxed out', color: 'rgb(122, 190, 194)', value: 0 },
  }

  collection.forEach(card => {
    if (card.missing) data.missing.value++
    else if (isCardUpgradable(card)) data.upgradable.value++
    else if (card.level === 5) data.maxedOut.value++
    else data.notUpgradable.value++
  })

  return Object.keys(data).map(status => data[status])
}

const getTotalCopiesForCard = card => {
  if (card.missing) return 0

  const { rarity } = getRawCardData(card.id)
  const maxCopies = RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)
  const levelCopies = RARITY_COPIES[rarity].copies.reduce(
    (acc, copies, index) => (card.level < index + 2 ? acc : acc + copies),
    1
  )

  return Math.min(maxCopies, levelCopies + card.copies)
}

const getCopiesData = collection => {
  return Object.keys(RARITIES).map(rarity => {
    const owned = collection
      .filter(card => getRawCardData(card.id).rarity === rarity)
      .reduce((acc, card) => acc + getTotalCopiesForCard(card), 0)
    const total =
      cards.filter(card => card.rarity === rarity).length *
      RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)

    return {
      name: capitalise(rarity),
      Owned: owned,
      Missing: total - owned,
      total,
    }
  })
}
const getProgressData = collection => {
  return Object.keys(RARITIES)
    .map(rarity => {
      return collection
        .filter(card => getRawCardData(card.id).rarity === rarity)
        .reduce(
          (acc, card) => {
            acc[card.level === 5 ? 0 : 1].value++

            return acc
          },
          [
            {
              color: getRarityColor(rarity, 'bright'),
              name: 'Maxed out ' + capitalise(rarity),
              value: 0,
            },
            {
              color: getRarityColor(rarity, 'light'),
              name: 'In progress ' + capitalise(rarity),
              value: 0,
            },
          ]
        )
    })
    .flat()
}

export default function CollectionStats(props) {
  const { collection } = React.useContext(CollectionContext)
  const [ignoreNeutral, setIgnoreNeutral] = React.useState(false)
  const levelData = React.useMemo(() => getLevelData(collection), [collection])
  const rarityData = React.useMemo(() => getRarityData(collection), [
    collection,
  ])
  const statusData = React.useMemo(() => getStatusData(collection), [
    collection,
  ])
  const copiesData = React.useMemo(() => getCopiesData(collection), [
    collection,
  ])
  const progressData = React.useMemo(() => getProgressData(collection), [
    collection,
  ])
  const factionData = React.useMemo(
    () =>
      ignoreNeutral
        ? getFactionData(collection).slice(1)
        : getFactionData(collection),
    [collection, ignoreNeutral]
  )

  return (
    <>
      <h1 className='VisuallyHidden'>Stats</h1>
      <Row desktopOnly>
        <Column width='1/3'>
          <Row desktopOnly>
            <Column>
              <Title>What is this</Title>
              <p>
                On this page, you can find some data visualisation for your card
                collection.{' '}
                <Only.DefaultCollection>
                  Start by importing your card collection. In the mean time, the
                  visualised collection contains all cards in the game at level
                  1.
                </Only.DefaultCollection>
              </p>
              <p>
                All charts titled with “(Stones)” rely on the cost of each card.
                A card cost is computed based on its current level in your
                collection and the amount of extra copies you have of that card
                before the next level.
              </p>
              <Only.DefaultCollection>
                <Row desktopOnly>
                  <Column>
                    <ImportCollection />
                  </Column>
                  <Column />
                </Row>
              </Only.DefaultCollection>
            </Column>
          </Row>
          <Row desktopOnly>
            <Column>
              <CollectionFigures collection={collection} />
            </Column>
          </Row>
        </Column>
        <Column width='2/3'>
          <Row desktopOnly>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>
                  Level repartition
                </Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip {...TOOLTIP_STYLES} />
                    <Legend verticalAlign='bottom' />
                    <Pie
                      data={levelData}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      label
                      startAngle={90}
                      endAngle={360 + 90}
                    >
                      {levelData.map(level => (
                        <Cell key={`cell-${level}`} fill={level.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Column>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>
                  Faction (stones)
                </Title>

                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip {...TOOLTIP_STYLES} />
                    <Legend verticalAlign='bottom' />
                    <Pie
                      data={factionData}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {factionData.map(faction => (
                        <Cell key={`cell-${faction}`} fill={faction.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className='CollectionStats__checkbox'>
                  <Checkbox
                    name='ignore-neutral'
                    id='ignore-neutral'
                    value={ignoreNeutral}
                    onChange={event => setIgnoreNeutral(event.target.checked)}
                  >
                    Ignore neutral cards
                  </Checkbox>
                </div>
              </div>
            </Column>
          </Row>
          <Row desktopOnly>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>
                  Rarity (stones)
                </Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip {...TOOLTIP_STYLES} />
                    <Legend verticalAlign='bottom' />
                    <Pie
                      data={rarityData}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {rarityData.map(rarity => (
                        <Cell
                          key={`cell-${rarity}`}
                          fill={getRarityColor(
                            rarity.name.toLowerCase(),
                            'light'
                          )}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Column>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>Statuses</Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip {...TOOLTIP_STYLES} />
                    <Legend verticalAlign='bottom' />
                    <Pie
                      data={statusData}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {statusData.map(level => (
                        <Cell key={`cell-${level}`} fill={level.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Column>
          </Row>

          <Row desktopOnly>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>Card copies</Title>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart
                    width={500}
                    height={300}
                    data={copiesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip
                      {...TOOLTIP_STYLES}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      formatter={(value, name, props) =>
                        `${value} copies (${(
                          (value / props.payload.total) *
                          100
                        ).toFixed(2)}%)`
                      }
                    />
                    <Legend />
                    <pattern
                      id='pattern-stripe'
                      width='8'
                      height='8'
                      patternUnits='userSpaceOnUse'
                      patternTransform='rotate(45)'
                    >
                      <rect
                        width='4'
                        height='8'
                        transform='translate(0,0)'
                        fill='white'
                      ></rect>
                    </pattern>
                    <mask id='mask-stripe'>
                      <rect
                        x='0'
                        y='0'
                        width='100%'
                        height='100%'
                        fill='url(#pattern-stripe)'
                      />
                    </mask>
                    <Bar
                      dataKey='Owned'
                      stackId='a'
                      fill='var(--light-shadowfen)'
                    />
                    <Bar
                      dataKey='Missing'
                      stackId='a'
                      fill='var(--light-ironclad)'
                      fillOpacity='.5'
                      mask='url(#mask-stripe)'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Column>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>Progress data</Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip {...TOOLTIP_STYLES} />
                    <Legend verticalAlign='bottom' />
                    <Pie
                      data={progressData}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {progressData.map(level => (
                        <Cell key={`cell-${level}`} fill={level.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Column>
          </Row>
        </Column>
      </Row>

      <PageMeta
        title='Collection Stats'
        description='Get insights about your own card collection and visualise it'
      />
    </>
  )
}
