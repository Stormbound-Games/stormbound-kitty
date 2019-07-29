import React from 'react'
import './index.css'

const Checkbox = props => (
  <label className={`Checkbox ${props.className || ''}`} htmlFor={props.id}>
    <input
      type="checkbox"
      {...props}
      children={undefined}
      className="Checkbox__input"
    />
    <span className="Checkbox__icon" />
    <span className="Checkbox__label">{props.children}</span>
  </label>
)

export default Checkbox
