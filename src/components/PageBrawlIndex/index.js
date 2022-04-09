import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import ListHeader from '~/components/ListHeader'
import ListLayoutItem from '~/components/ListLayoutItem'
import Page from '~/components/Page'
import Teasers from '~/components/Teasers'
import microMarkdown from '~/helpers/microMarkdown'

export default React.memo(function PageBrawlIndex(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const [layout, setLayout] = React.useState('GRID')
  const items = props.brawls
    .map(brawl => ({
      'data-testid': 'teaser',
      title: brawl.name,
      cardId: brawl.cardId,
      excerpt: microMarkdown(brawl.description),
      to: `/brawl/${brawl.slug}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <Page
      title='Brawl Tracker'
      description='Find all the Brawl modes from Stormbound and their ideal decks'
      action={{
        to: '/calculators/brawl',
        children: 'Brawl calculator',
        icon: 'arrow-right',
      }}
      isEditorialContent
    >
      <ListHeader layout={layout} setLayout={setLayout}>
        {items.length} {items.length === 1 ? 'Brawl' : 'Brawls'}
      </ListHeader>

      {layout === 'GRID' ? (
        <Teasers items={items} />
      ) : layout === 'LIST' ? (
        items.map(brawl => (
          <ListLayoutItem
            key={brawl.title}
            title={brawl.title}
            path={brawl.to}
            excerpt={brawl.excerpt}
            image={cardsIndex[brawl.cardId].image}
          />
        ))
      ) : null}
    </Page>
  )
})
