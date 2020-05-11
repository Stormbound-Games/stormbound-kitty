import React from 'react'
import Select from 'react-select'
import { WebpContext } from '../WebpProvider'
import { FACTIONS } from '../../constants/game'
import getCardsByFaction from '../../helpers/getCardsByFaction'
import getRawCardData from '../../helpers/getRawCardData'

const ORDER = [...Object.keys(FACTIONS), 'tokens']
const cardsByFaction = getCardsByFaction()

export default React.memo(function CardSelect(props) {
  const supportsWebp = React.useContext(WebpContext)
  const ext = supportsWebp ? 'webp' : 'png'

  return (
    <Select
      name={props.name}
      id={props.id}
      required={props.required}
      isClearable={true}
      value={{
        id: props.current,
        label:
          getRawCardData(props.current).name || props.label || 'Pick a card',
      }}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      placeholder='Pick a card'
      styles={{
        input: provided => ({ ...provided, color: 'var(--white)' }),

        // The dropdown indicator and its separator are a little superfluous
        // and can be safely hidden at all time.
        dropdownIndicator: provided => ({ display: 'none' }),
        indicatorSeparator: provided => ({ display: 'none' }),

        singleValue: provided => ({
          ...provided,
          color: 'var(--white)',
          cursor: 'pointer',

          // The border color is usually tweaked to indicated interactivity but
          // it is not an option when there is no border.
          ...(props.noBorder && { ':hover': { color: 'var(--beige)' } }),
        }),

        valueContainer: provided => ({
          ...provided,
          // When rendered without a border, it looks slightly better without
          // the  horizontal padding.
          paddingLeft: props.noBorder ? 0 : provided.paddingLeft,
          paddingRight: props.noBorder ? 0 : provided.paddingRight,
        }),

        clearIndicator: (provided, data) => ({
          ...provided,
          color: 'var(--white)',
          // If there is no chosen value, the clear button can be safely masked.
          display:
            !data.selectProps.value.id || !props.withClear
              ? 'none'
              : provided.display,
          cursor: 'pointer',
          ':hover': { color: 'var(--beige)' },
        }),

        control: (provided, { isFocused, selectProps }) => ({
          ...provided,

          // When there is no border, the width of the field should adapt to the
          // currently selected value.
          width: props.noBorder
            ? `calc(${selectProps.value.label.length}ch + ${
                selectProps.value.id ? '36px' : 0
              })`
            : provided.width,
          backgroundColor: 'transparent',
          color: 'var(--white)',
          boxShadow: 'none',

          ...(props.noBorder
            ? {
                borderColor: 'transparent',
                ':hover': { borderColor: 'transparent' },
              }
            : {
                borderColor: 'rgba(222, 215, 164, 0.5)',
                ':hover': { borderColor: 'rgba(222, 215, 164, 0.5)' },
                outline: isFocused
                  ? ['auto 2px Highlight', 'auto 5px -webkit-focus-ring-color']
                  : provided.outline,
              }),
        }),

        menu: provided => ({
          ...provided,
          zIndex: 10,
          backgroundColor: 'var(--dark-blue)',
        }),

        groupHeading: provided => ({ ...provided, color: 'var(--beige)' }),

        option: (provided, { data, isFocused, isDisabled, ...rest }) => ({
          ...provided,
          ':active': {
            backgroundColor: isDisabled ? 'transparent' : 'var(--green)',
          },
          color: 'var(--white)',
          background: `url("/assets/images/rarity-${
            getRawCardData(data.value).rarity
          }.${ext}") ${
            isFocused ? 'var(--light-blue)' : 'transparent'
          } no-repeat center left 1em`,
          opacity: isDisabled ? 0.7 : 1,
          backgroundSize: '0.75em',
          paddingLeft: '2.5em',
        }),
      }}
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
