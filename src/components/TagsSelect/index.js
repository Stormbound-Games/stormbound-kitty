import React from 'react'
import { useFela } from 'react-fela'
import Select from 'react-select'
import inputStyles from '~/components/Input/styles'
import useSelectStyles from '~/hooks/useSelectStyles'
import { TAGS } from '~/constants/deck'

export default React.memo(function TagsSelect(props) {
  const { css } = useFela()
  const styles = useSelectStyles()
  const value = props.tags.map(value => ({ value, label: TAGS[value] }))
  const isAvailable = props.isTagAvailable || (() => true)
  const options = Object.entries(TAGS)
    .filter(([tag]) => isAvailable(tag))
    .map(([value, label]) => ({
      value,
      label,
    }))

  const id = props.id || 'tags-select'

  return (
    <>
      <label htmlFor={id} className={css(inputStyles.label)}>
        {props.label || 'Tags'}
      </label>
      <Select
        styles={styles}
        id={id}
        name={props.name || id}
        value={value}
        isMulti
        onChange={options =>
          props.updateTags(options.map(option => option.value))
        }
        options={options}
        required={props.required}
        data-testid='deck-tags-input'
      />
    </>
  )
})
