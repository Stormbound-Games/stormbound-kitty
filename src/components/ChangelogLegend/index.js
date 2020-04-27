import React from 'react'
import './index.css'

export default React.memo(function ChangelogLegend(props) {
  return (
    <ul className='ChangelogLegend'>
      <li className=' ChangelogLegend__item ChangelogLegend__item--buff'>
        Buff, improvement
      </li>
      <li className=' ChangelogLegend__item ChangelogLegend__item--nerf'>
        Nerf, degradation
      </li>
      <li className=' ChangelogLegend__item ChangelogLegend__item--mixed'>
        Mixed results
      </li>
      <li className=' ChangelogLegend__item ChangelogLegend__item--game'>
        Game addition
      </li>
      <li className=' ChangelogLegend__item ChangelogLegend__item--unknown'>
        Unknown, non/applicable, undetectable
      </li>
    </ul>
  )
})
