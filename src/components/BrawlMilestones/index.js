import React from 'react'
import { motion } from 'framer-motion'
import { BRAWL_INDEX, BRAWL_MILESTONES } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import BrawlMilestone from '../BrawlMilestone'
import BrawlProgress from '../BrawlProgress'
import './index.css'

export default React.memo(function BrawlMilestones(props) {
  const container = React.useRef()
  const { id, meta } = React.useContext(BrawlContext)
  const milestones = BRAWL_MILESTONES[props.difficulty]
  const index = milestones.findIndex(
    milestone => milestone.crowns >= meta.crowns
  )
  const [active, setActive] = React.useState(index)

  React.useEffect(() => {
    setActive(milestones.findIndex(milestone => milestone.crowns > meta.crowns))
  }, [meta.crowns, milestones])

  const handleDrag = React.useCallback(
    (event, info) => {
      const DRAG_THRESHOLD = 80
      const isNotFirstMilestone = active > 0
      const isNotLastMilestone = active < milestones.length - 1

      if (info.point.x > DRAG_THRESHOLD && isNotFirstMilestone) {
        setActive(current => current - 1)
      } else if (info.point.x < DRAG_THRESHOLD * -1 && isNotLastMilestone) {
        setActive(current => current + 1)
      }
    },
    [active, setActive, milestones]
  )

  return (
    <div className='BrawlMilestones'>
      <div
        ref={container}
        className='BrawlMilestones__inner'
        style={{
          '--count': milestones.length,
          transform: `translateX(calc(-11.5em - ${
            active * milestones.length
          }%))`,
        }}
      >
        <motion.div
          drag='x'
          dragConstraints={container}
          onDragEnd={handleDrag}
          className='BrawlMilestones__wrapper'
        >
          {milestones.map((milestone, index) => (
            <div className='BrawlMilestones__item' key={index}>
              <BrawlMilestone
                index={index + 1}
                {...milestone}
                cardId={BRAWL_INDEX[id].cardId}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <BrawlProgress active={active} setActive={setActive} />
    </div>
  )
})
