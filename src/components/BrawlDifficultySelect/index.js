import React from 'react'

const BrawlDifficultySelect = props => (
  <div className={props.className}>
    <label htmlFor='difficulty'>Brawl difficulty</label>
    <select
      id='difficulty'
      name='difficulty'
      value={props.value}
      onChange={props.onChange}
    >
      <option value='CASUAL'>Casual</option>
      <option value='WARRIOR'>Warrior</option>
      <option value='ULTIMATE'>Ultimate</option>
    </select>
  </div>
)

export default React.memo(BrawlDifficultySelect)
