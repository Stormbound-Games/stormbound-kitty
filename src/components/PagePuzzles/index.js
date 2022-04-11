import React from 'react'
import Page from '~/components/Page'
import Link from '~/components/Link'
import Notice from '~/components/Notice'
import ListHeader from '~/components/ListHeader'
import ListLayoutItem from '~/components/ListLayoutItem'
import Teasers from '~/components/Teasers'
import capitalize from '~/helpers/capitalize'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'
import { CATEGORIES, RESTRICTIONS } from '~/constants/puzzles'

const getCardForPuzzle = puzzle => ({
  name: puzzle.name,
  type: 'unit',
  race: puzzle.category,
  mana: '0',
  rarity: 'common',
  faction: 'neutral',
  image: puzzle.image,
  ability: puzzle.restrictions
    .map(restriction => RESTRICTIONS[restriction].name)
    .join(', '),
})

const Restrictions = props =>
  props.restrictions.length > 0
    ? props.restrictions
        .slice(0)
        .sort()
        .map((restriction, index) => (
          <React.Fragment key={restriction}>
            <span title={RESTRICTIONS[restriction].description}>
              {RESTRICTIONS[restriction].name}
            </span>
            {index !== props.restrictions.length - 1 && ', '}
          </React.Fragment>
        ))
    : 'No restrictions'

const getExcerptForPuzzle = puzzle => (
  <>
    {CATEGORIES[puzzle.category]}{' '}
    <Restrictions restrictions={puzzle.restrictions} />.
  </>
)

export default React.memo(function PagePuzzles(props) {
  const [layout, setLayout] = React.useState('GRID')
  const [order, setOrder] = React.useState('DATE')
  const items = React.useMemo(
    () =>
      props.puzzles.slice(0).sort((a, b) => {
        if (order === 'NAME') return a.name.localeCompare(b.name)
        if (order === 'CATEGORY') return a.category.localeCompare(b.category)
        if (order === 'AUTHOR') return a.user.name.localeCompare(b.user.name)
        if (order === 'DATE') return parseDate(b.date) - parseDate(a.date)
        return 0
      }),
    [props.puzzles, order]
  )

  return (
    <>
      <Page
        title='Puzzles'
        description='Test your skills and resolve interesting and creative puzzles made by the Stormbound community'
        isEditorialContent
      >
        <ListHeader
          layout={layout}
          setLayout={setLayout}
          order={order}
          setOrder={setOrder}
          sorting={[
            { title: 'Date', value: 'DATE' },
            { title: 'Name', value: 'NAME' },
            { title: 'Category', value: 'CATEGORY' },
            { title: 'Author', value: 'AUTHOR' },
          ]}
        >
          {items.length} {items.length === 1 ? 'puzzle' : 'puzzles'}
        </ListHeader>

        {layout === 'GRID' ? (
          <Teasers
            items={items.map(puzzle => ({
              card: getCardForPuzzle(puzzle),
              title: puzzle.name,
              meta: (
                <>
                  By{' '}
                  <Link to={'/members/' + puzzle.user.slug}>
                    {puzzle.user.name}
                  </Link>{' '}
                  in {formatDate(parseDate(puzzle.date))}
                </>
              ),
              to: `/puzzles/${puzzle.slug}`,
              excerpt: getExcerptForPuzzle(puzzle),
              'data-testid': `puzzle ${puzzle.name} ${puzzle.category} ${
                puzzle.difficulty
              }/3 ${puzzle.restrictions.join(' ')}`,
            }))}
          />
        ) : layout === 'LIST' ? (
          items.map(puzzle => (
            <ListLayoutItem
              key={puzzle.slug}
              title={puzzle.name}
              author={puzzle.user}
              date={puzzle.date}
              path={`/puzzles/${puzzle.slug}`}
              excerpt={getExcerptForPuzzle(puzzle)}
              icon='sword'
            />
          ))
        ) : null}
      </Page>

      <Notice icon='sword'>
        Design your own puzzles and{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-puzzle' }}>
          have them added
        </Link>{' '}
        to the list!
      </Notice>
    </>
  )
})
