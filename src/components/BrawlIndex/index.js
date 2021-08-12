import React from 'react'
import Page from '../Page'
import Teasers from '../Teasers'
import getBrawlDescription from '../../helpers/getBrawlDescription'
import microMarkdown from '../../helpers/microMarkdown'
import { BRAWLS } from '../../constants/brawl'

const ITEMS = BRAWLS.map(brawl => ({
  large: brawl.large,
  'data-testid': 'teaser',
  meta: brawl.label,
  title: brawl.title,
  cardId: brawl.cardId,
  excerpt: microMarkdown(getBrawlDescription(brawl.id)),
  to: `/brawl/${brawl.id.toLowerCase().replace(/_/g, '-')}`,
}))

export default React.memo(function BrawlIndex() {
  return (
    <Page
      title='Brawl Tracker'
      description='Find all the Brawl modes from Stormbound and their ideal decks'
    >
      <Teasers items={ITEMS} />
    </Page>
  )
})
