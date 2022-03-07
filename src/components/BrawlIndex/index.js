import React from 'react'
import Page from '~/components/Page'
import Teasers from '~/components/Teasers'
import microMarkdown from '~/helpers/microMarkdown'

export default React.memo(function BrawlIndex(props) {
  const items = props.brawls.map(brawl => ({
    'data-testid': 'teaser',
    title: brawl.name,
    cardId: brawl.cardId,
    excerpt: microMarkdown(brawl.description),
    to: `/brawl/${brawl.slug}`,
  }))

  return (
    <Page
      title='Brawl Tracker'
      description='Find all the Brawl modes from Stormbound and their ideal decks'
      action={{
        to: '/calculators/brawl',
        children: 'Brawl calculator',
        icon: 'arrow-right',
      }}
    >
      <Teasers items={items} />
    </Page>
  )
})
