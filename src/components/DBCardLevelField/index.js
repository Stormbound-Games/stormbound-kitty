import React from 'react'
import './index.css'

const DBCardLevelField = props => (
  <div className="DBCardLevelField">
    <label htmlFor="level" className="DBCardLevelField__label">
      Cards level
      <span className="DBCardLevelField__hint">(keyboard 1-5)</span>
    </label>
    <select
      name="level"
      id="level"
      value={props.cardLevel}
      onChange={event => props.setCardLevel(+event.target.value)}
      required
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
)

export default DBCardLevelField
