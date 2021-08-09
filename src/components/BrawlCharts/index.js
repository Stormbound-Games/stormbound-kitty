import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '../BrawlProvider'
import BrawlCoinsChart from '../BrawlCoinsChart'
import BrawlStatusChart from '../BrawlStatusChart'
import Row from '../Row'

export default React.memo(function BrawlCharts(props) {
  const { css } = useFela()
  const { brawl } = React.useContext(BrawlContext)

  if (brawl.matches.length === 0) {
    return null
  }

  return (
    <div className={css({ marginBottom: '2em' })} data-testid='charts'>
      <Row desktopOnly>
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
