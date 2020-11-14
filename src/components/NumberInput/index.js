import React from 'react'

export default React.memo(function NumberInput(props) {
  const [value, setValue] = React.useState(props.value || '')
  const { onChange, onKeyDown } = props
  const max = typeof props.max === 'number' ? props.max : Infinity
  const min = typeof props.min === 'number' ? props.min : -Infinity
  const step = typeof props.step === 'number' ? props.step : 1

  // If the boundaries are updated, clamp the current value between them.
  React.useEffect(() => {
    if (typeof value === 'number' && max < value) setValue(max)
    if (typeof value === 'number' && min > value) setValue(min)
  }, [min, max, value])

  // When the value gets updated, fire the `onChange` callback.
  React.useEffect(() => {
    if (typeof onChange === 'function') onChange(value)
  }, [onChange, value])

  const handleChange = React.useCallback(
    event => {
      const value = Number(event.target.value)

      // If the value would result in no longer being a number, or being above the
      // maximum, or being below the mininum, do not update it.
      if (isNaN(value) || value < min || value > max) return

      // If the field is empty, let it be empty and do not force a 0, which cannot
      // be removed and cause confusion.
      setValue(event.target.value ? value : '')
    },
    [min, max]
  )

  // If pressing the up arrow while being below the max, bump the value by 1
  // step; same for down.
  const handleKeyDown = React.useCallback(
    event => {
      if (event.keyCode === 38 && value < max) {
        setValue(value => Math.min(value + step, max))
      } else if (event.keyCode === 40 && value > min) {
        setValue(value => Math.max(value - step, min))
      }

      if (typeof onKeyDown === 'function') onKeyDown(event)
    },
    [min, max, step, value, onKeyDown]
  )

  return (
    <input
      {...props}
      min={undefined}
      max={undefined}
      step={undefined}
      value={value}
      type='text'
      pattern='[0-9]*'
      inputMode='numeric'
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
})
