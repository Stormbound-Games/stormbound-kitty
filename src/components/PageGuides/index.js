import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import ListHeader from '~/components/ListHeader'
import ListLayoutItem from '~/components/ListLayoutItem'
import MemberList from '~/components/MemberList'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import Teasers from '~/components/Teasers'
import parseDate from '~/helpers/parseDate'

export default React.memo(function PageGuides(props) {
  const [layout, setLayout] = React.useState('GRID')
  const [order, setOrder] = React.useState('DATE')
  const items = React.useMemo(
    () =>
      props.guides.slice(0).sort((a, b) => {
        if (order === 'TITLE') return a.name.localeCompare(b.name)
        if (order === 'AUTHOR')
          return a.authors[0].name.localeCompare(b.authors[0].name)
        if (order === 'DATE') return parseDate(b.date) - parseDate(a.date)
        return 0
      }),
    [props.guides, order]
  )

  return (
    <>
      <Page
        title={props.category.name.long}
        description='Find guides from the community about Stormbound and improve your gameplay and knowledge about the game'
        isEditorialContent
      >
        <ListHeader
          layout={layout}
          setLayout={setLayout}
          order={order}
          setOrder={setOrder}
          sorting={[
            { title: 'Date', value: 'DATE' },
            { title: 'Title', value: 'TITLE' },
            { title: 'Author', value: 'AUTHOR' },
          ]}
        >
          {items.length} {items.length === 1 ? 'guide' : 'guides'}
        </ListHeader>

        {layout === 'GRID' ? (
          <Teasers
            items={items.map(guide => ({
              cardId: guide.cardId,
              title: guide.name,
              meta: (
                <>
                  Written by <MemberList members={guide.authors} />
                </>
              ),
              excerpt: guide.excerpt,
              to: '/guides/' + guide.slug,
            }))}
          />
        ) : layout === 'LIST' ? (
          items.map(guide => (
            <ListLayoutItem
              key={guide.name}
              title={guide.name}
              authors={guide.authors}
              date={guide.date}
              path={'/guides/' + guide.slug}
              excerpt={guide.excerpt}
              icon='compass'
            />
          ))
        ) : null}
      </Page>
      <Notice icon='compass'>
        Looking to teach others and guide them towards glorious battles?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-guide' }}>
          Have your own guide published
        </Link>
        .
      </Notice>
    </>
  )
})
