import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'

const Spacer = props => (
  <Spacing vertical={['LARGE', 'LARGER']}>{props.children}</Spacing>
)

export default React.memo(function BlockColumns({ value }) {
  const { columns, wide } = value
  const Container = wide ? PageEmbed : Spacer

  return (
    <Container>
      <Row isDesktopOnly>
        {columns.map(column => (
          <Row.Column width={'1/' + columns.length} key={column._key}>
            {/* Necessary <div> to avoid content being directly within a flex
             * container which causes margins not to collapse properly.
             */}
            <div>
              <BlocksRenderer
                value={column.content}
                columns={{ count: columns.length, wide }}
              />
            </div>
          </Row.Column>
        ))}
      </Row>
    </Container>
  )
})
