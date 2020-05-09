import React from 'react'
import { motion } from 'framer-motion'
import { BRAWLS, MILESTONES } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import BrawlMilestone from '../BrawlMilestone'
import BrawlProgress from '../BrawlProgress'
import './index.css'

export default React.memo(function BrawlMilestones(props) {
  const container = React.useRef()
  const { id, meta } = React.useContext(BrawlContext)
  const index = MILESTONES.findIndex(
    milestone => milestone.crowns >= meta.crowns
  )
  const [active, setActive] = React.useState(index)

  React.useEffect(() => {
    setActive(MILESTONES.findIndex(milestone => milestone.crowns > meta.crowns))
  }, [meta.crowns])

  const handleDrag = React.useCallback(
    (event, info) => {
      const DRAG_THRESHOLD = 80
      const isNotFirstMilestone = active > 0
      const isNotLastMilestone = active < MILESTONES.length - 1

      if (info.point.x > DRAG_THRESHOLD && isNotFirstMilestone) {
        setActive(current => current - 1)
      } else if (info.point.x < DRAG_THRESHOLD * -1 && isNotLastMilestone) {
        setActive(current => current + 1)
      }
    },
    [active, setActive]
  )

  return (
    <div className='BrawlMilestones'>
      <div
        ref={container}
        className='BrawlMilestones__inner'
        style={{
          '--count': MILESTONES.length,
          transform: `translateX(calc(-11.5em - ${
            active * MILESTONES.length
          }%))`,
        }}
      >
        <motion.div
          drag='x'
          dragConstraints={container}
          onDragEnd={handleDrag}
          className='BrawlMilestones__wrapper'
        >
          {MILESTONES.map((milestone, index) => (
            <div className='BrawlMilestones__item' key={index}>
              <BrawlMilestone
                index={index + 1}
                {...milestone}
                cardId={BRAWLS.find(brawl => brawl.id === id).cardId}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <BrawlProgress active={active} setActive={setActive} />
    </div>
  )
})
