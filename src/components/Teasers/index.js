import React from 'react'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'

export default React.memo(function Teasers(props) {
  const columns = props.columns || 3

  return chunk(props.items, columns).map((row, index) => (
    <Row key={index} isDesktopOnly wideGutter>
      {Array.from({ length: columns }, (_, index) => (
        <Row.Column key={index} width='1/3'>
          {row[index] && <Teaser {...row[index]} />}
        </Row.Column>
      ))}
    </Row>
  ))
})
