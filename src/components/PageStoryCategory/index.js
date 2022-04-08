import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import ListHeader from '~/components/ListHeader'
import Stories from '~/components/Stories'
import parseDate from '~/helpers/parseDate'
import useViewportSize from '~/hooks/useViewportSize'

export default React.memo(function PageStoryCategory(props) {
  const { viewportWidth } = useViewportSize()
  const { title, background, shortName } = props.category
  const [layout, setLayout] = React.useState('GRID')
  const [order, setOrder] = React.useState('DATE')
  const items = React.useMemo(
    () =>
      // Sagas are returned in the right order from the server and therefore
      // shouldn’t be sorted on the client. Additionally, the sorting option
      // is removed.
      props.isSaga
        ? props.stories
        : props.stories.slice(0).sort((a, b) => {
            if (order === 'TITLE') return a.title.localeCompare(b.title)
            if (order === 'AUTHOR')
              return a.author.name.localeCompare(b.author.name)
            if (order === 'DATE') return parseDate(b.date) - parseDate(a.date)
            return 0
          }),
    [props.stories, props.isSaga, order]
  )

  return (
    <>
      <Page
        background={background}
        title={viewportWidth >= 700 ? title : shortName}
        description={`Read immersive stories from the community about ${title}`}
        action={{ to: '/stories', children: 'Back to stories' }}
        isEditorialContent
      >
        <ListHeader
          layout={layout}
          setLayout={setLayout}
          order={order}
          setOrder={setOrder}
          sorting={
            props.isSaga
              ? null
              : [
                  { title: 'Date', value: 'DATE' },
                  { title: 'Title', value: 'TITLE' },
                  { title: 'Author', value: 'AUTHOR' },
                ]
          }
        >
          {items.length} {items.length === 1 ? 'story' : 'stories'}
        </ListHeader>

        <Stories stories={items} layout={layout} />
      </Page>

      <Notice icon='quill'>
        Looking to contribute to the Stormbound lore?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-story' }}>
          Have your own story published
        </Link>
        .
      </Notice>
    </>
  )
})
