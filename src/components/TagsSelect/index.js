import React from 'react'
import { useFela } from 'react-fela'
import dynamic from 'next/dynamic'
import { TAGS } from '~/constants/deck'
import inputStyles from '~/components/Input/styles'
import useSelectStyles from '~/hooks/useSelectStyles'

const Select = dynamic(() => import('react-select'))

export default React.memo(function TagsSelect(props) {
  const { css } = useFela()
  const styles = useSelectStyles()
  // Default to the base tags (without the Brawl ones), in case available tags
  // are not passed.
  const availableTags = props.availableTags || TAGS
  const value = props.tags.map(value => ({
    value,
    label: availableTags[value] || value,
  }))
  const options = Object.entries(availableTags).map(([value, label]) => ({
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
