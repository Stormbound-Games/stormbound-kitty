import React from 'react'
import Input from '~/components/Input'

export default React.memo(function NumberInput(props) {
  const { min, max, onChange } = props

  const handleBlur = React.useCallback(
    event => {
      if (event.target.value === '') return

      if (max && max < +event.target.value) onChange(max)
      if (min && min > +event.target.value) onChange(min)
    },
    [min, max, onChange]
  )

  return (
    <Input
      {...props}
      type='number'
      onChange={event =>
        onChange(
          event.target.value !== '' ? +event.target.value : event.target.value
        )
      }
      onBlur={handleBlur}
    />
  )
})
