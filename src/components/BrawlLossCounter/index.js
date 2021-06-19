import React from 'react'
import Icon from '../Icon'
import { BrawlContext } from '../BrawlProvider'
import './index.css'

const Diamond = ({ isFilled }) => (
  <span className='BrawlLossDiamond'>{isFilled && <Icon icon='cross' />}</span>
)

const BrawlLossCounter = props => {
  const { meta } = React.useContext(BrawlContext)

  return (
    <div className='BrawlLossCounter'>
      <Diamond isFilled={meta.losses > 0} />
      <Diamond isFilled={meta.losses > 1} />
      <Diamond isFilled={meta.losses > 2} />
    </div>
  )
}

export default React.memo(BrawlLossCounter)
