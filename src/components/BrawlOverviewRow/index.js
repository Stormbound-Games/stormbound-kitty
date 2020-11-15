import React from 'react'
import { Link } from 'react-router-dom'
import { BrawlContext } from '../BrawlProvider'
import BrawlMilestone from '../BrawlMilestone'
import BrawlOutcome from '../BrawlOutcome'
import BrawlStatusChart from '../BrawlStatusChart'
import Row from '../Row'
import { BRAWL_INDEX, MILESTONES } from '../../constants/brawl'
import './index.css'

export default React.memo(function BrawlOverviewRow(props) {
  const { id, brawl, meta } = React.useContext(BrawlContext)
  const slug = id.toLowerCase().replace(/_/g, '-')

  if (brawl.matches.length === 0) return null

  const milestone = MILESTONES[meta.milestone - 1]

  return (
    <div className='BrawlOverviewRow'>
      <Row desktopOnly>
        <Row.Column width='1/3'>
          <h2 className='BrawlOverviewRow__title'>
            <Link to={`/brawl/${slug}`}>{props.title}</Link>
          </h2>
          <BrawlOutcome />
        </Row.Column>
        <Row.Column width='1/3'>
          <BrawlStatusChart />
        </Row.Column>
        <Row.Column width='1/3'>
          {milestone && (
            <BrawlMilestone {...milestone} cardId={BRAWL_INDEX[id].cardId} />
          )}
        </Row.Column>
      </Row>
    </div>
  )
})
