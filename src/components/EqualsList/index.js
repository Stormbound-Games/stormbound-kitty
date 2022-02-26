import React from 'react'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Row from '~/components/Row'
import ListBuilderTierList from '~/components/ListBuilderTierList'
import ListBuilderToc from '~/components/ListBuilderToc'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import getRawCardData from '~/helpers/getRawCardData'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function ListBuilderDisplayView(props) {
  const isMounted = useIsMounted()
  const [faction, setFaction] = React.useState('*')
  const tiers = props.list
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
  const lastUpdate = parseDate(props.date)
  const release = props.release

  return (
    <Page
      title='Equals Tier List'
      description='Find a Tier List for ‘Equals Mode’ of all the Stormbound cards, ranked by effectiveness and popularity'
      meta={'Updated in ' + formatDate(lastUpdate)}
    >
      <Row isDesktopOnly>
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
                <Link to={'/releases/' + release.slug}>{release.title}</Link>{' '}
              </>
            ) : null}
            in <span className='Highlight'>{formatDate(lastUpdate)}</span>.
          </p>

          <ListBuilderToc tiers={tiers} />

          {isMounted && (
            <Spacing bottom='BASE'>
              <Select
                label='Display factions'
                id='factions'
                value={faction}
                onChange={event => setFaction(event.target.value)}
              >
                <option value='*'>All</option>
                <option value='NOT_NEUTRAL'>All but neutral</option>
                <option value='NEUTRAL'>Neutral only</option>
                <option value='IRONCLAD'>Ironclad only</option>
                <option value='SHADOWFEN'>Shadowfen only</option>
                <option value='SWARM'>Swarm only</option>
                <option value='WINTER'>Winter only</option>
              </Select>
            </Spacing>
          )}

          <Info icon='compass' title='Intro to equals'>
            <p>
              If you are new to equal matches, be sure to read the{' '}
              <Link to='/guides/equals-intro'>introduction to equals</Link> by{' '}
              <Link to='/members/derk'>Derk</Link> to learn everything about
              this game mode.
            </p>
          </Info>
        </Row.Column>

        <Row.Column width='2/3'>
          <ListBuilderTierList tiers={tiers} />
        </Row.Column>
      </Row>
    </Page>
  )
})
