import React from 'react'
import './index.css'

export default React.memo(function TogglableContent(props) {
  const [isExpanded, setIsExpanded] = React.useState(props.isExpanded)

  React.useEffect(() => setIsExpanded(props.isExpanded), [props.isExpanded])

  return (
    <>
      {props.renderToggle({
        id: props.id,
        'aria-controls': props.id + '-target',
        'aria-expanded': isExpanded,
      })}

      <div
        className='TogglableContent__target'
        id={props.id + '-target'}
        aria-labelledby={props.id}
        aria-hidden={!isExpanded}
      >
        {props.children}
      </div>
    </>
  )
})
