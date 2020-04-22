import React from 'react'
import {
  ResponsiveContainer,
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
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import { getCardCost } from '../../helpers/getCollectionCost'
import { getRarityColor } from '../../helpers/getRarity'
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
    const resolvedCard = resolveCardForLevel(card)
    resolvedCard.copies = 0
    data[resolvedCard.faction].value += getCardCost(resolvedCard)
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
    const resolvedCard = resolveCardForLevel(card)
    resolvedCard.copies = 0
    data[resolvedCard.rarity].value += getCardCost(resolvedCard)
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

const CollectionStats = props => {
  const { collection } = React.useContext(CollectionContext)
  const [ignoreNeutral, setIgnoreNeutral] = React.useState(false)
  const levelData = React.useMemo(() => getLevelData(collection), [collection])
  const rarityData = React.useMemo(() => getRarityData(collection), [
    collection,
  ])
  const statusData = React.useMemo(() => getStatusData(collection), [
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
        <Column width={33}>
          <Row desktopOnly>
            <Column>
              <Title>What is this</Title>
              <div className='CollectionStats__info'>
                <p>
                  On this page, you can find some data visualisation for your
                  card collection.{' '}
                  <Only.DefaultCollection>
                    Start by importing your card collection. In the mean time,
                    the visualised collection contains all cards in the game at
                    level 1.
                  </Only.DefaultCollection>
                </p>
                <p>
                  All charts titled with “(Stones)” rely on the cost of each
                  card. A card cost is computed based on its current level in
                  your collection and the amount of extra copies you have of
                  that card before the next level.
                </p>
              </div>
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
        <Column width={66}>
          <Row desktopOnly>
            <Column>
              <div className='CollectionStats__chart'>
                <Title className='CollectionStats__title'>Level data</Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip />
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
                  Faction data (stones)
                </Title>

                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip />
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
                  Rarity data (stones)
                </Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip />
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
                <Title className='CollectionStats__title'>Status data</Title>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Tooltip />
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
        </Column>
      </Row>

      <PageMeta
        title='Collection Stats'
        description='Get insights about your collection and visualise it.'
      />
    </>
  )
}

export default CollectionStats
