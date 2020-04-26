import React from 'react'
import './index.css'

const TogglableContent = React.memo(props => {
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

export default TogglableContent
