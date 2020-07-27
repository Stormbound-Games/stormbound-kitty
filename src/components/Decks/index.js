import React from 'react'
import { useHistory } from 'react-router-dom'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import CTA from '../CTA'
import Loader from '../Loader'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import useLazyLoad from '../../hooks/useLazyLoad'
import useViewportWidth from '../../hooks/useViewportWidth'

export default React.memo(function Decks(props) {
  const viewportWidth = useViewportWidth()
  const columns = viewportWidth < 700 ? 1 : props.columns || 2
  const history = useHistory()
  const { loadMore, loading, items } = useLazyLoad(
    props.decks,
    columns * 2,
    false
  )

  if (props.decks.length === 0) return null

  const navigateToCard = card => history.push('/card/' + card.id + '/display')
  const rows = chunk(items, columns)

  return (
    <>
      {rows.map((row, rowIndex) => (
        <Row desktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Column
              key={index}
              width={columns > 2 ? `1/${columns}` : undefined}
            >
              {row[index] ? (
                <FeaturedDeck
                  {...row[index]}
                  showUpgrades={props.showUpgrades}
                  data-testid={props['data-testid']}
                  onClick={navigateToCard}
                  actions={
                    typeof props.actions === 'function'
                      ? props.actions(row[index])
                      : undefined
                  }
                />
              ) : null}
            </Column>
          ))}
        </Row>
      ))}
      {loading && <Loader />}
      <Row>
        <Column align='center'>
          <CTA onClick={loadMore} type='button'>
            Load more
          </CTA>
        </Column>
      </Row>
    </>
  )
})
