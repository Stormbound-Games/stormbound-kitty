import React from 'react'
import dynamic from 'next/dynamic'
import { BrawlContext } from '~/components/BrawlProvider'
import Row from '~/components/Row'

const BrawlCoinsChart = dynamic(() => import('~/components/BrawlCoinsChart'))
const BrawlStatusChart = dynamic(() => import('~/components/BrawlStatusChart'))

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
