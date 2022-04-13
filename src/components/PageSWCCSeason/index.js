import React from 'react'
import ListHeader from '~/components/ListHeader'
import Page from '~/components/Page'
import SWCCSeasonCards from '~/components/SWCCSeasonCards'
import parseDate from '~/helpers/parseDate'

export default React.memo(function PageSWCCSeason(props) {
  const [layout, setLayout] = React.useState('GRID')
  const [order, setOrder] = React.useState('DATE')
  const items = React.useMemo(
    () =>
      props.contests.slice(0).sort((a, b) => {
        if (order === 'THEME') return a.name.localeCompare(b.name)
        if (order === 'AUTHOR')
          return a.winner.user.name.localeCompare(b.winner.user.name)
        if (order === 'DATE') return parseDate(b.date) - parseDate(a.date)
        return 0
      }),
    [props.contests, order]
  )

  return (
    <Page
      title={'SWCC Season ' + props.number}
      description={`Find all the cards created by the community from the Stormbound Weekly Card Contest season ${props.number}`}
      authors={[
        { name: 'TaKo_G', slug: 'tako_g' },
        props.number >= 4 && { name: 'Grimm', slug: 'grimm' },
      ].filter(Boolean)}
      action={{ to: '/swcc', children: 'Back to SWCC' }}
      meta={`${props.contests.length} weeks`}
      isEditorialContent
    >
      <ListHeader
        layout={layout}
        setLayout={setLayout}
        order={order}
        setOrder={setOrder}
        sorting={[
          { title: 'Date', value: 'DATE' },
          { title: 'Author', value: 'AUTHOR' },
          { title: 'Theme', value: 'THEME' },
        ]}
      >
        {items.length} {items.length === 1 ? 'week' : 'weeks'}
      </ListHeader>

      <SWCCSeasonCards layout={layout} contests={items} />
    </Page>
  )
})
