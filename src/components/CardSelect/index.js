import React from 'react'
import Select from 'react-select'
import { FACTIONS } from '../../constants/game'
import getCardsByFaction from '../../helpers/getCardsByFaction'
import getRawCardData from '../../helpers/getRawCardData'
import useSelectStyles from '../../hooks/useSelectStyles'

const ORDER = [...Object.keys(FACTIONS), 'tokens']
const cardsByFaction = getCardsByFaction()

export default React.memo(function CardSelect(props) {
  const styles = useSelectStyles({
    noBorder: props.noBorder,
    withClear: props.withClear,
  })

  return (
    <Select
      name={props.name}
      id={props.id}
      required={props.required}
      isClearable={props.withClear}
      value={{
        id: props.current,
        label:
          getRawCardData(props.current).name || props.label || 'Pick a card',
      }}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      placeholder='Pick a card'
      styles={styles}
      className='CardSelect'
      classNamePrefix='CardSelect'
      isOptionDisabled={option => option.disabled}
      options={Object.keys(cardsByFaction)
        .sort((a, b) => (ORDER.indexOf(a) > ORDER.indexOf(b) ? 1 : -1))
        .map(faction => ({
          label: faction,
          options: cardsByFaction[faction]
            .filter(card => {
              if (!props.withSpells && card.type === 'spell') return false
              if (!props.withTokens && card.token) return false
              return true
            })
            .map(card => ({
              value: card.id,
              label: card.name,
              disabled: (props.disabledOptions || []).includes(card.id),
            })),
        }))}
    />
  )
})
