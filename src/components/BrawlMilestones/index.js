import React from 'react'
import { useFela } from 'react-fela'
import { motion } from 'framer-motion'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import { BrawlContext } from '~/components/BrawlProvider'
import BrawlMilestone from '~/components/BrawlMilestone'
import BrawlProgress from '~/components/BrawlProgress'
import styles from './styles'

export default React.memo(function BrawlMilestones(props) {
  const { css } = useFela()
  const container = React.useRef()
  const { info, meta } = React.useContext(BrawlContext)
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
    <div className={css(styles.milestones)}>
      <div
        ref={container}
        className={css(styles.inner)}
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
          className={css(styles.wrapper)}
        >
          {milestones.map((milestone, index) => (
            <div className={css(styles.item)} key={milestone.crowns}>
              <BrawlMilestone
                booksIndex={props.booksIndex}
                index={index + 1}
                {...milestone}
                cardId={info.cardId}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <BrawlProgress active={active} setActive={setActive} />
    </div>
  )
})
