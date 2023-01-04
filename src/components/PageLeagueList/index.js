import React from 'react'
import { TIER_COLORS } from '#constants/list'
import Error from '#components/Error'
import Page from '#components/Page'
import Row from '#components/Row'
import ListBuilderTier from '#components/ListBuilderTier'
import ListBuilderToc from '#components/ListBuilderToc'
import Title from '#components/Title'
import capitalize from '#helpers/capitalize'

export default React.memo(function PageListBuilderDisplay(props) {
  const { tiers, error } = props
  const league = capitalize(props.league)
  const count = tiers.map(tier => tier.cards.length).reduce((a, b) => a + b, 0)
  const meta = error ? null : `${count} cards in ${tiers.length} tiers`

  return (
    <Page
      title={`${league} Tier List`}
      description={`Find the most used cards for the ${league} league over the last 30 days.`}
      action={{
        to: `/tier-list`,
        children: 'Lists index',
      }}
      meta={meta}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Information</Title>

          <p>
            This list features the most used cards for the {league} league. The
            data is extracted directly from the game (with Stormbound-Games’
            help) based on the last 30 days of usage.
          </p>

          <p>
            The name of a tier corresponds to the presence ratio of the cards
            that make it. For instance <code>0.5 – 0.6</code> means cards that
            were found in 50 to 60% of all decks played in {league} league over
            the last month.
          </p>

          {!error && <ListBuilderToc tiers={tiers} />}
        </Row.Column>
        <Row.Column width='2/3'>
          {props.error ? (
            <Error error={props.error.name + ': ' + props.error.type} />
          ) : (
            <>
              <Title>Tier list</Title>

              {tiers.map((tier, index) => (
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
