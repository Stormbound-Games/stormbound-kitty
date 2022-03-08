import React from 'react'
import dynamic from 'next/dynamic'
import Label from '~/components/Label'
import useSelectStyles from '~/hooks/useSelectStyles'
import indexArray from '~/helpers/indexArray'

const Select = dynamic(() => import('react-select'))

export default React.memo(function TagsSelect(props) {
  const styles = useSelectStyles()
  const tagsIndex = React.useMemo(
    () => indexArray(props.availableTags, 'slug'),
    [props.availableTags]
  )
  const value = props.tags.map(tag => {
    if (typeof tag === 'string') {
      return { value: tag, label: tagsIndex[tag].name }
    }
    return { value: tag.slug, label: tag.name }
  })
  const options = props.availableTags.map(tag => ({
    value: tag.slug,
    label: tag.name,
  }))
  const id = props.id || 'tags-select'

  return (
    <>
      <Label htmlFor={id}>{props.label || 'Tags'}</Label>
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
