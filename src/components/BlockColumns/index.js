import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'

export default React.memo(function BlockColumns({ value }) {
  const columns = value.columns
  const Container = columns.length === 2 ? React.Fragment : PageEmbed

  return (
    <Container>
      <Row isDesktopOnly>
        {columns.map(column => (
          <Row.Column width={'1/' + columns.length} key={column._key}>
            <BlocksRenderer value={column.content} isInColumn />
          </Row.Column>
        ))}
      </Row>
    </Container>
  )
})
