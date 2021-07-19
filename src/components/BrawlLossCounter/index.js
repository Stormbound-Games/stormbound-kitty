import React from 'react'
import Icon from '../Icon'
import { BrawlContext } from '../BrawlProvider'
import './index.css'

const getImageProps = heart => {
  const basePath = '/assets/images/iconography/'

  if (heart.isProtected)
    return {
      src: `${basePath}/heart_protected.png`,
      alt: 'Protected heart',
      title: 'Protected heart',
    }
  if (heart.isFull && heart.isPermanent)
    return {
      src: `${basePath}/heart_full_permanent.png`,
      alt: 'Permanent and full heart',
      title: 'Permanent and full heart',
    }
  if (heart.isFull)
    return {
      src: `${basePath}/heart_full_temporary.png`,
      alt: 'Non-permanent and full heart',
      title: 'Non-permanent and full heart',
    }
  if (!heart.isFull && heart.isPermanent)
    return {
      src: `${basePath}/heart_empty_permanent.png`,
      alt: 'Permanent and empty heart',
      title: 'Permanent and empty heart',
    }
  if (!heart.isFull)
    return {
      src: `${basePath}/heart_empty_temporary.png`,
      alt: 'Non-permanent and empty heart',
      title: 'Non-permanent and empty heart',
    }
}

const BrawlLossCounter = props => {
  const { meta } = React.useContext(BrawlContext)

  return (
    <div className='BrawlLossCounter'>
      {meta.hearts
        .slice(0)
        .reverse()
        .map((heart, index) => (
          <img
            key={[heart.isFull, heart.isPermanent, heart.isProtected, index]
              .map(Number)
              .join('')}
            className='BrawlLossCounter__heart'
            {...getImageProps(heart)}
          />
        ))}
    </div>
  )
}

export default React.memo(BrawlLossCounter)
