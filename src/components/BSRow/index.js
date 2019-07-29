import React from 'react'
import findFrontRow from '../../helpers/findFrontRow'
import './index.css'

const BSRow = props => (
  <div
    data-testid="row"
    className={[
      'BSRow',
      props.index === 0 && 'BSRow--RED',
      props.index === 0 && `BSRow--RED-${findFrontRow(props.board, 'RED')}`,
      props.index === 4 && 'BSRow--BLUE',
      props.index === 4 && `BSRow--BLUE-${findFrontRow(props.board, 'BLUE')}`
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {props.children}
  </div>
)

export default BSRow
