import React from 'react'
import { Link } from 'react-router-dom'
import { EQUALS_TIER_LIST, TIER_COLORS } from '../../constants/list'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ListBuilderTier from '../ListBuilderTier'
import ListBuilderToc from '../ListBuilderToc'
import getInitialListData from '../../helpers/getInitialListData'
import getRawCardData from '../../helpers/getRawCardData'
import { formatDate } from '../../helpers/formatDate'
import RELEASES from '../../data/releases.json'

export default React.memo(function ListBuilderDisplayView(props) {
  const { date, value: id } = EQUALS_TIER_LIST
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
  const [month, year] = date.split('/')
  const lastUpdate = new Date(+year, +month - 1, 1)
  const release = RELEASES.find(release => release.date === date)

  return (
    <>
      <HeaderBanner title='Equals Tier List' />

      <Row wideGutter desktopOnly>
        <Row.Column width='1/3'>
          <p>
            This tier list was made by the Stormbound community, with strong
            involvement from competitive tournament players. It is their take at
            ranking cards by efficiency in Equals mode. Your mileage may vary.
          </p>

          <p>
            It was last updated{' '}
            {release ? (
              <>
                following the{' '}
                <Link to={'/releases/' + release.slug}>{release.name}</Link>{' '}
              </>
            ) : null}
            in <span className='Highlight'>{formatDate(lastUpdate)}</span>.
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
        </Row.Column>

        <Row.Column width='2/3'>
          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Row.Column>
      </Row>

      <PageMeta
        title='Equals Tier List'
        description='Find a Tier List for ‘Equals Mode’ of all the Stormbound cards, ranked by effectiveness and popularity'
      />
    </>
  )
})
