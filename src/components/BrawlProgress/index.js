import React from 'react'
import { MILESTONES } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import './index.css'

export default React.memo(function BrawlProgress(props) {
  const { crowns } = React.useContext(BrawlContext)

  return (
    <ul className='BrawlProgress'>
      {MILESTONES.map((milestone, index) => (
        <li
          key={index}
          className={[
            'BrawlProgress__item',
            props.active === index && 'BrawlProgress__item--active',
            crowns >= milestone.crowns && 'BrawlProgress__item--passed',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            onClick={() => props.setActive(index)}
            className='ButtonAsLink BrawlProgress__button'
          >
            <span className='VisuallyHidden'>Select milestone {index + 1}</span>
          </button>
        </li>
      ))}
    </ul>
  )
})
