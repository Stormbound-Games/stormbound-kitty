import React from 'react'
import { EQUALS_TIER_LIST, TIER_COLORS } from '../../constants/list'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ListBuilderTier from '../ListBuilderTier'
import ListBuilderToc from '../ListBuilderToc'
import Title from '../Title'
import getInitialListData from '../../helpers/getInitialListData'
import getRawCardData from '../../helpers/getRawCardData'

export default React.memo(function ListBuilderDisplayView(props) {
  const id = EQUALS_TIER_LIST
  const [faction, setFaction] = React.useState('*')
  const tiers = getInitialListData(id)
    .map(tier => ({
      name: tier.name,
      cards: tier.cards.filter(id => {
        const card = getRawCardData(id)
        if (faction === 'NOT_NEUTRAL' && card.faction === 'neutral')
          return false
        if (faction === 'NEUTRAL' && card.faction !== 'neutral') return false
        if (faction === 'SWARM' && card.faction !== 'swarm') return false
        if (faction === 'WINTER' && card.faction !== 'winter') return false
        if (faction === 'IRONCLAD' && card.faction !== 'ironclad') return false
        if (faction === 'SHADOWFEN' && card.faction !== 'shadowfen')
          return false
        return true
      }),
    }))
    .filter(tier => tier.cards.length > 0)

  return (
    <>
      <h1 className='VisuallyHidden'>Equals Tier List</h1>
      <Row wideGutter desktopOnly>
        <Column width='1/3'>
          <Title element='h2'>Info</Title>

          <p>
            This tier list was made by HanooSt, a multiple-times winner of
            equal-levels tournaments. It is their take at ranking cards by
            efficiency in Equals mode. Your mileage may vary.
          </p>

          <ListBuilderToc tiers={tiers} />

          <label htmlFor='factions'>Display factions</label>
          <select
            id='factions'
            name='factions'
            value={faction}
            onChange={event => setFaction(event.target.value)}
            style={{ marginBottom: '1em' }}
          >
            <option value='*'>All</option>
            <option value='NOT_NEUTRAL'>All but neutral</option>
            <option value='NEUTRAL'>Neutral only</option>
            <option value='IRONCLAD'>Ironclad only</option>
            <option value='SHADOWFEN'>Shadowfen only</option>
            <option value='SWARM'>Swarm only</option>
            <option value='WINTER'>Winter only</option>
          </select>
        </Column>

        <Column width='2/3'>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Column>
      </Row>

      <PageMeta
        title='Equals Tier List'
        description='Find a Tier List for ‘Equals Mode’ of all the Stormbound cards, ranked by effectiveness and popularity'
        author='HanooSt'
      />
    </>
  )
})
