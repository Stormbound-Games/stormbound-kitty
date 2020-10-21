import React from 'react'
import './index.css'

export default React.memo(function CardChangesLegend(props) {
  return (
    <ul className='CardChangesLegend'>
      <li className=' CardChangesLegend__item CardChangesLegend__item--buff'>
        Buff, improvement
      </li>
      <li className=' CardChangesLegend__item CardChangesLegend__item--nerf'>
        Nerf, degradation
      </li>
      <li className=' CardChangesLegend__item CardChangesLegend__item--mixed'>
        Mixed results
      </li>
      <li className=' CardChangesLegend__item CardChangesLegend__item--game'>
        Game addition
      </li>
    </ul>
  )
})
