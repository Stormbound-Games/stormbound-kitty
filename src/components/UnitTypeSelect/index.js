import React from 'react'
import dynamic from 'next/dynamic'
import { UNIT_TYPES } from '~/constants/game'
import Label from '~/components/Label'
import VisuallyHidden from '~/components/VisuallyHidden'
import useSelectStyles from '~/hooks/useSelectStyles'
import capitalize from '~/helpers/capitalize'

const Select = dynamic(() => import('react-select'))
const Creatable = dynamic(() => import('react-select/creatable'))

export default React.memo(function UnitTypeSelect(props) {
  const styles = useSelectStyles({ withClear: props.withClear })
  const Component = props.isCreatable ? Creatable : Select
  const label = props.label || 'Unit types'
  const id = props.id || 'unit-types'

  return (
    <>
      {props.hideLabel ? (
        <VisuallyHidden as='label' htmlFor={props.id}>
          {label}
        </VisuallyHidden>
      ) : (
        <Label htmlFor={props.id + '-input'}>{label}</Label>
      )}

      <Component
        {...props}
        onChange={options =>
          options.length <= (props.max || Infinity) && props.onChange(options)
        }
        id={id}
        name={props.name || id}
        isMulti
        inputId={id + '-input'}
        instanceId={id}
        isDisabled={props.disabled}
        isClearable={props.withClear}
        value={props.value.map(unitType => ({
          label: capitalize(unitType),
          value: unitType,
        }))}
        styles={styles}
        className={['UnitTypeSelect', props.className]
          .filter(Boolean)
          .join(' ')}
        classNamePrefix='UnitTypeSelect'
        options={UNIT_TYPES.map(unitType => ({
          label: capitalize(unitType),
          value: unitType,
        }))}
      />
    </>
  )
})
