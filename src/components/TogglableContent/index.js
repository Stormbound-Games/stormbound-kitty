import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function TogglableContent(props) {
  const [isExpanded, setIsExpanded] = React.useState(props.isExpanded)
  const { css } = useFela({ isHidden: !isExpanded })

  React.useEffect(() => setIsExpanded(props.isExpanded), [props.isExpanded])

  return (
    <>
      {props.renderToggle({
        id: props.id,
        'aria-controls': props.id + '-target',
        'aria-expanded': isExpanded,
      })}

      <div
        className={css(styles.target)}
        id={props.id + '-target'}
        aria-labelledby={props.id}
        aria-hidden={!isExpanded}
      >
        {props.children}
      </div>
    </>
  )
})
