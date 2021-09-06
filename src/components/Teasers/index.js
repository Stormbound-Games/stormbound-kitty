import React from 'react'
import Row from '~/components/Row'
import Teaser from '~/components/Teaser'
import chunk from '~/helpers/chunk'

export default React.memo(function Teasers(props) {
  const columns = props.columns || 3

  return chunk(props.items, columns).map(row => (
    <Row key={row.map(item => item.id || item.title).join('+')} isDesktopOnly>
      {Array.from({ length: columns }, (_, index) => (
        <Row.Column
          key={row[index]?.id ?? row[index]?.title ?? index}
          width='1/3'
        >
          {row[index] && <Teaser {...row[index]} />}
        </Row.Column>
      ))}
    </Row>
  ))
})
