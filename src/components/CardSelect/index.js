import React from 'react'
import { useFela } from 'react-fela'
import Select from 'react-select'
import inputStyles from '~/components/Input/styles'
import VisuallyHidden from '~/components/VisuallyHidden'
import { FACTIONS } from '~/constants/game'
import getCardsByFaction from '~/helpers/getCardsByFaction'
import getRawCardData from '~/helpers/getRawCardData'
import useSelectStyles from '~/hooks/useSelectStyles'

const ORDER = [...Object.keys(FACTIONS), 'tokens']
const cardsByFaction = getCardsByFaction()

export default React.memo(function CardSelect(props) {
  const { css } = useFela()
  const styles = useSelectStyles({
    noBorder: props.noBorder,
    withClear: props.withClear,
  })

  return (
    <>
      {props.hideLabel ? (
        <VisuallyHidden as='label' htmlFor={props.id}>
          {props.label}
        </VisuallyHidden>
      ) : (
        <label htmlFor={props.id} className={css(inputStyles.label)}>
          {props.label}
        </label>
      )}

      <Select
        name={props.name}
        id={props.id}
        isDisabled={props.disabled}
        required={props.required}
        isClearable={props.withClear}
        value={{
          id: props.current,
          label: getRawCardData(props.current).name || 'Pick a card',
        }}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder='Pick a card'
        styles={styles}
        className={['CardSelect', props.className].filter(Boolean).join(' ')}
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
    </>
  )
})
