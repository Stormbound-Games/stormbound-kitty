import React from 'react'
import { BrawlContext } from '~/components/BrawlProvider'
import BrawlCoinsChart from '~/components/BrawlCoinsChart'
import BrawlStatusChart from '~/components/BrawlStatusChart'
import Row from '~/components/Row'

export default React.memo(function BrawlCharts(props) {
  const { session } = React.useContext(BrawlContext)

  if (session.matches.length === 0) {
    return null
  }

  return (
    <div data-testid='charts'>
      <Row isDesktopOnly>
        <Row.Column>
          <BrawlStatusChart />
        </Row.Column>
        <Row.Column>
          <BrawlCoinsChart income={props.income} />
        </Row.Column>
      </Row>
    </div>
  )
})
