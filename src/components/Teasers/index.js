import React from 'react'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'

export default React.memo(function Teasers(props) {
  return chunk(props.items, 3).map((row, index) => (
    <Row key={index} desktopOnly wideGutter>
      <Row.Column width='1/3'>{row[0] && <Teaser {...row[0]} />}</Row.Column>
      <Row.Column width='1/3'>{row[1] && <Teaser {...row[1]} />}</Row.Column>
      <Row.Column width='1/3'>{row[2] && <Teaser {...row[2]} />}</Row.Column>
    </Row>
  ))
})
