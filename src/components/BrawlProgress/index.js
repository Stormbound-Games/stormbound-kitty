import React from 'react'
import { useFela } from 'react-fela'
import { BRAWL_MILESTONES } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import styles from './styles'

export default React.memo(function BrawlProgress(props) {
  const { css } = useFela()
  const { meta } = React.useContext(BrawlContext)
  // The rewards have no impact here, only the crowns are considered, so any
  // Brawl difficulty can be used for that.
  const milestones = BRAWL_MILESTONES.LEGACY

  return (
    <ul className={css(styles.progress)}>
      {milestones.map((milestone, index) => (
        <li
          key={index}
          className={css(
            styles.item({
              isActive: props.active === index,
              isPassed: meta.crowns >= milestone.crowns,
            })
          )}
        >
          <button
            onClick={() => props.setActive(index)}
            className={'ButtonAsLink ' + css(styles.button)}
            data-testid='milestone-diamond'
          >
            <span className='VisuallyHidden'>Select milestone {index + 1}</span>
          </button>
        </li>
      ))}
    </ul>
  )
})
