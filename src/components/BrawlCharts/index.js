import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import BrawlCoinsChart from '../BrawlCoinsChart'
import BrawlStatusChart from '../BrawlStatusChart'
import BrawlWeighedStatusChart from '../BrawlWeighedStatusChart'
import Row from '../Row'
import './index.css'

export default React.memo(function BrawlCharts(props) {
  const { brawl } = React.useContext(BrawlContext)

  if (brawl.matches.length === 0) {
    return null
  }

  return (
    <div className='BrawlCharts' data-testid='charts'>
      <Row desktopOnly>
        <Row.Column>
          <BrawlStatusChart />
        </Row.Column>
        <Row.Column>
          <BrawlCoinsChart setup={props.setup} />
        </Row.Column>
      </Row>
      <BrawlWeighedStatusChart />
    </div>
  )
})
