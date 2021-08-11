import React from 'react'
import Select from '../Select'

export default React.memo(function LeagueSelect(props) {
  return (
    <Select
      label={props.label || 'League'}
      name='league'
      id='league'
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      disabled={props.disabled}
    >
      <option value=''>Select a league</option>
      <option value='HEROES'>Heroes</option>
      <option value='DIAMOND'>Diamond</option>
      <option value='PLATINUM'>Platinum</option>
      <option value='GOLD'>Gold</option>
      <option value='SILVER'>Silver</option>
      <option value='BRONZE'>Bronze</option>
      <option value='IRON'>Iron</option>
    </Select>
  )
})
