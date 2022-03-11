import React from 'react'
import dynamic from 'next/dynamic'
import { CardsContext } from '~/components/CardsProvider'
import Label from '~/components/Label'
import VisuallyHidden from '~/components/VisuallyHidden'
import { FACTIONS } from '~/constants/game'
import getCardsByFaction from '~/helpers/getCardsByFaction'
import useSelectStyles from '~/hooks/useSelectStyles'

const Select = dynamic(() => import('react-select'))

const ORDER = [...FACTIONS, 'tokens']

export default React.memo(function CardSelect(props) {
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const cardsByFaction = getCardsByFaction(cards)
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
        <Label htmlFor={props.id}>{props.label}</Label>
      )}

      <Select
        name={props.name}
        id={props.id}
        instanceId={props.id}
        isDisabled={props.disabled}
        required={props.required}
        isClearable={props.withClear}
        value={{
          id: props.current,
          label: cardsIndex[props.current]?.name ?? 'Pick a card',
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
                rarity: card.rarity,
                disabled: (props.disabledOptions || []).includes(card.id),
              })),
          }))}
      />
    </>
  )
})
