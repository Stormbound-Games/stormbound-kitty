import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Column from '../Column'
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
        <Column>
          <BrawlStatusChart />
        </Column>
        <Column>
          <BrawlCoinsChart setup={props.setup} />
        </Column>
      </Row>
      <BrawlWeighedStatusChart />
    </div>
  )
})
