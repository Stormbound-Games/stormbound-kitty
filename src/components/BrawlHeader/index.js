import React from 'react'
import { Link } from 'react-router-dom'
import { BrawlContext } from '../BrawlProvider'
import HeaderBanner from '../HeaderBanner'
import { getLongFaction } from '../../helpers/encoding'
import { BRAWLS } from '../../constants/brawl'
import './index.css'

export default React.memo(function BrawlHeader(props) {
  const { brawl } = React.useContext(BrawlContext)
  const brawlData = BRAWLS.find(b => b.id === brawl.id)
  const faction = getLongFaction(brawlData.cardId.slice(0, 1))

  return (
    <>
      <HeaderBanner
        title={brawlData.title}
        background={`/assets/images/environment_${faction}.png`}
      />
      <p className='BrawlHeader__meta'>
        <span className='BrawlHeader__author'>{brawlData.label}</span>
        <Link to='/brawl' className='BrawlHeader__backLink'>
          Back to index
        </Link>
      </p>
    </>
  )
})
