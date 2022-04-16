import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import CTA from '~/components/CTA'
import Loader from '~/components/Loader'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import useLazyLoad from '~/hooks/useLazyLoad'
import useViewportSize from '~/hooks/useViewportSize'

export default React.memo(function Decks(props) {
  const { viewportWidth } = useViewportSize()
  const columns = viewportWidth < 700 ? 1 : props.columns || 2
  const { loadMore, loading, items } = useLazyLoad(
    props.decks,
    columns * 3,
    false
  )

  if (props.decks.length === 0) return null

  const rows = chunk(items, columns)

  return (
    <>
      {rows.map(row => (
        <Row isDesktopOnly key={row.map(deck => deck.id).join('+')}>
          {Array.from({ length: columns }, (_, index) => (
            <Row.Column
              key={row[index]?.id ?? index}
              width={columns > 2 ? `1/${columns}` : undefined}
            >
              {row[index] ? (
                <FeaturedDeck
                  {...row[index]}
                  key={row[index].id}
                  showUpgrades={props.showUpgrades}
                  actions={
                    typeof props.actions === 'function'
                      ? props.actions(row[index])
                      : undefined
                  }
                  spacing={{ bottom: 'SMALL' }}
                />
              ) : null}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      {loadMore && (
        <Row spacing={{ top: 'LARGE' }}>
          <Row.Column align='center'>
            <CTA onClick={loadMore} type='button' disabled={loading}>
              Load more
            </CTA>
          </Row.Column>
        </Row>
      )}
    </>
  )
})
