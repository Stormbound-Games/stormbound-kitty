import React from 'react'
import { useHistory } from 'react-router-dom'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Row from '../Row'
import chunk from '../../helpers/chunk'

export default React.memo(function Decks(props) {
  const history = useHistory()

  if (props.decks.length === 0) return null

  const navigateToCard = card => history.push('/card/' + card.id + '/display')
  const columns = props.columns || 2
  const rows = chunk(props.decks, columns)

  return rows.map((row, rowIndex) => (
    <Row desktopOnly key={rowIndex}>
      {Array.from({ length: columns }, (_, index) => (
        <Column key={index} width={columns > 2 ? `1/${columns}` : undefined}>
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
  ))
})
