import React from 'react'
import Icon from '../Icon'
import { BrawlContext } from '../BrawlProvider'
import './index.css'

const BrawlLossCounter = props => {
  const { meta } = React.useContext(BrawlContext)

  return (
    <div className='BrawlLossCounter'>
      {meta.hearts
        .slice(0)
        .reverse()
        .map((heart, index) => (
          <div
            className='BrawlLossCounter__slot'
            key={[heart.isFull, heart.isPermanent, heart.isProtected, index]
              .map(Number)
              .join('')}
          >
            <Icon
              icon={heart.isFull ? 'heart' : 'heart-broken'}
              className={[
                'BrawlLossCounter__icon',
                !heart.isPermanent && 'BrawlLossCounter__icon--iron',
                heart.isFull && 'BrawlLossCounter__icon--full',
                !heart.isFull && 'BrawlLossCounter__icon--empty',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            {heart.isProtected && (
              <Icon icon='shield' className='BrawlLossCounter__shield' />
            )}
          </div>
        ))}
    </div>
  )
}

export default React.memo(BrawlLossCounter)
