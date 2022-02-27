import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import ListBuilderTierList from '~/components/ListBuilderTierList'
import ListBuilderToc from '~/components/ListBuilderToc'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function ListBuilderDisplayView(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const isMounted = useIsMounted()
  const [faction, setFaction] = React.useState('*')
  const tiers = props.list
    .map(tier => ({
      name: tier.name,
      cards: tier.cards.filter(id => {
        const card = cardsIndex[id]
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
    <Page
      title='Ranked Tier List'
      description='Find a Tier List for ‘Ranked Mode’ of all the most  effective and popular Stormbound cards'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <p>
            This tier list is computed from the{' '}
            <Link to='/deck/featured'>featured decks</Link>. It orders cards
            based on how frequently they appear in top-ranking decks. This does
            not necessarily reflect the actual power of each card individually;
            it is more a popularity list that way.
          </p>

          <p>
            The name of each tier corresponds to the inclusion ratio. For
            instance, <span className='Highlight'>0.9 – 1.0</span> contains
            cards that are included in over 90% of decks that can include them.
          </p>

          <ListBuilderToc tiers={tiers} />

          {isMounted && (
            <Spacing bottom='LARGE'>
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
        </Row.Column>

        <Row.Column width='2/3'>
          <ListBuilderTierList tiers={tiers} />
        </Row.Column>
      </Row>
    </Page>
  )
})
