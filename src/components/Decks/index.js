import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import CTA from '~/components/CTA'
import Loader from '~/components/Loader'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import useLazyLoad from '~/hooks/useLazyLoad'
import useViewportSize from '~/hooks/useViewportSize'
import useNavigator from '~/hooks/useNavigator'

export default React.memo(function Decks(props) {
  const { viewportWidth } = useViewportSize()
  const columns = viewportWidth < 700 ? 1 : props.columns || 2
  const navigator = useNavigator()
  const { loadMore, loading, items } = useLazyLoad(
    props.decks,
    columns * 3,
    false
  )

  if (props.decks.length === 0) return null

  const navigateToCard = card => navigator.push('/card/' + card.id + '/display')
  const rows = chunk(items, columns)

  return (
    <>
      {rows.map((row, rowIndex) => (
        <Row isDesktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Row.Column
              key={index}
              width={columns > 2 ? `1/${columns}` : undefined}
            >
              {row[index] ? (
                <FeaturedDeck
                  {...row[index]}
                  showUpgrades={props.showUpgrades}
                  onClick={navigateToCard}
                  actions={
                    typeof props.actions === 'function'
                      ? props.actions(row[index])
                      : undefined
                  }
                />
              ) : null}
            </Row.Column>
          ))}
        </Row>
      ))}

      {loading && <Loader />}
      {loadMore && (
        <Row>
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
