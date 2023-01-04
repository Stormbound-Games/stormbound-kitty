import React from 'react'
import { TIER_COLORS } from '#constants/list'
import Error from '#components/Error'
import Page from '#components/Page'
import Row from '#components/Row'
import ListBuilderTier from '#components/ListBuilderTier'
import ListBuilderToc from '#components/ListBuilderToc'
import Spacing from '#components/Spacing'
import Title from '#components/Title'
import FactionSelect from '#components/FactionSelect'
import capitalize from '#helpers/capitalize'
import { getLongFaction } from '#helpers/encoding'

export default React.memo(function PageListBuilderDisplay(props) {
  const { tiers, error } = props
  const league = capitalize(props.league)
  const [faction, setFaction] = React.useState('*')
  const matchesFaction = id =>
    faction === '*' || getLongFaction(id[0]) === faction
  const filteredTiers = tiers
    .map(tier => ({
      ...tier,
      cards: tier.cards.filter(matchesFaction),
    }))
    .filter(tier => tier.cards.length > 0)
  const count = filteredTiers
    .map(tier => tier.cards.length)
    .reduce((a, b) => a + b, 0)
  const meta = error
    ? null
    : `${count} cards in ${filteredTiers.length} tier${
        filteredTiers.length === 1 ? '' : 's'
      }`

  return (
    <Page
      title={`Cards Usage in ${league}`}
      description={`Find the most used cards for the ${league} league over the last 30 days.`}
      action={{
        to: `/tier-list`,
        children: 'Card usage data',
      }}
      meta={meta}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Information</Title>

          <p>
            This list features the most used cards for the {league} league. The
            data is extracted directly from the game (courtesy of
            Stormbound-Games), based on the last 30 days of usage, and updated
            on a daily basis.
          </p>

          <p>
            The name of a tier corresponds to the presence ratio of the cards
            that make it. For instance <code>0.5 – 0.6</code> means cards that
            were found in 50 to 60% of all decks played in {league} league over
            the last month — regardless of faction.
          </p>

          <p>
            The data does not take match outcome into account, nor does it
            consider whether a card was in a deck but never played. It purely
            checks whether a card was part of a deck used in a ranked match.
          </p>

          <p>
            It also does not downscale neutral cards, which is why the most
            frequently used cards are consistently all neutral, since they are
            used in decks across all factions. This is why you can filter out
            the data by faction below:
          </p>

          <Spacing bottom='BASE'>
            <FactionSelect
              name='faction'
              id='faction'
              onChange={event => setFaction(event.target.value)}
              value={faction}
              withNeutral
              withAny
            />
          </Spacing>

          {!error && <ListBuilderToc tiers={filteredTiers} />}
        </Row.Column>
        <Row.Column width='2/3'>
          {props.error ? (
            <Error error={props.error.name + ': ' + props.error.type} />
          ) : (
            <>
              <Title>Tier list</Title>

              {filteredTiers.map((tier, index) => (
                <ListBuilderTier
                  {...tier}
                  color={TIER_COLORS[index]}
                  key={tier.name || index}
                  prefix={`tier-${index}-`}
                  isEditable={false}
                />
              ))}
            </>
          )}
        </Row.Column>
      </Row>
    </Page>
  )
})
