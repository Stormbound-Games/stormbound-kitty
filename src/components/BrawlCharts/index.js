import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Column from '../Column'
import BrawlStatusChart from '../BrawlStatusChart'
import BrawlCoinsChart from '../BrawlCoinsChart'
import Row from '../Row'
import './index.css'

export default React.memo(function BrawlCharts(props) {
  const { brawl } = React.useContext(BrawlContext)

  if (brawl.matches.length === 0) {
    return null
  }

  return (
    <div className='BrawlCharts'>
      <Row desktopOnly>
        <Column>
          <BrawlStatusChart />
        </Column>
        <Column>
          <BrawlCoinsChart setup={props.setup} />
        </Column>
      </Row>
    </div>
  )
})
