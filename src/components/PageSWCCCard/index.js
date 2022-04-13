import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardDisplay from '~/components/CardDisplay'
import Link from '~/components/Link'
import Info from '~/components/Info'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import getCardBuilderMetaTags from '~/helpers/getCardBuilderMetaTags'
import parseDate from '~/helpers/parseDate'
import { formatPreciseDate } from '~/helpers/formatDate'

export default React.memo(function PageSWCCCard(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { season, week, winner } = props.contest
  const metaTags = getCardBuilderMetaTags(cardsIndex, props.card)

  return (
    <Page
      {...metaTags}
      title={`SWCC S${season}W${week}`}
      author={winner.user}
      meta={formatPreciseDate(parseDate(props.contest.date))}
      action={{
        to: '/swcc',
        children: 'Back to season ' + season,
      }}
      isEditorialContent
    >
      <Spacing bottom='LARGEST'>
        <CardDisplay {...props.card} mode='DISPLAY' id={winner.id} />
      </Spacing>

      <Page.Narrow>
        {props.card.hasSingleLevel && (
          <Info icon='hammer' title='Single-level card'>
            This card was created before it was possible to define all 5 levels,
            or without consideration for leveling, therefore only the level{' '}
            {props.card.level} is relevant.
          </Info>
        )}

        <p>
          This card was created by{' '}
          <Link to={`/members/${winner.user.slug}`}>{winner.user.name}</Link>{' '}
          for week {week} of season {season} of the{' '}
          <Link to='/swcc'>Stormbound Weekly Card Contest</Link>. The theme was{' '}
          <span className='Highlight'>{props.contest.name}</span>, and this was
          the winning card for that week.
        </p>
      </Page.Narrow>
    </Page>
  )
})
