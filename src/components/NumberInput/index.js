import React from 'react'

export default React.memo(function NumberInput(props) {
  const { value, onChange, onKeyDown } = props
  const max = typeof props.max === 'number' ? props.max : Infinity
  const min = typeof props.min === 'number' ? props.min : -Infinity
  const step = typeof props.step === 'number' ? props.step : 1

  // If the boundaries (or the value) are updated, clamp the value between them.
  React.useEffect(() => {
    if (typeof value === 'number' && max < value) onChange(max)
    if (typeof value === 'number' && min > value) onChange(min)
  }, [min, max, value, onChange])

  const handleChange = React.useCallback(
    event => {
      const value = Number(event.target.value)

      // If the value is not empty and not a number, or above the maximum, or
      // below the mininum, do not update it.
      if (event.target.value && (isNaN(value) || value < min || value > max))
        return

      // If the field is empty, let it be empty and do not force a 0, which cannot
      // be removed and cause confusion.
      onChange(event.target.value ? value : '')
    },
    [min, max, onChange]
  )

  // If pressing the up arrow while being below the max, bump the value by 1
  // step; same for down.
  const handleKeyDown = React.useCallback(
    event => {
      const value = Number(event.target.value)

      if (event.keyCode === 38 && value < max) {
        onChange(Math.min(value + step, max))
      } else if (event.keyCode === 40 && value > min) {
        onChange(Math.max(value - step, min))
      }

      if (typeof onKeyDown === 'function') onKeyDown(event)
    },
    [min, max, step, onChange, onKeyDown]
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
