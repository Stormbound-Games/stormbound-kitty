import React from 'react'
import Select from '~/components/Select'

export default React.memo(function BrawlDifficultySelect(props) {
  return (
    <Select
      label='Brawl difficulty'
      id='difficulty'
      value={props.value}
      onChange={props.onChange}
      extend={props.extend}
    >
      <option value='CASUAL'>Casual</option>
      <option value='WARRIOR'>Warrior</option>
      <option value='ULTIMATE'>Ultimate</option>
    </Select>
  )
})
