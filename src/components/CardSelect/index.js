import React from 'react'
import Select from 'react-select'
import getRawCardData from '../../helpers/getRawCardData'
import { getRarityImage } from '../../helpers/getRarity'
import getCardsByFaction from '../../helpers/getCardsByFaction'
import './index.css'

const ORDER = ['swarm', 'winter', 'ironclad', 'shadowfen', 'neutral']
const cardsByFaction = getCardsByFaction()

const CardSelect = props => (
  <Select
    name={props.name}
    id={props.id}
    required={props.required}
    isClearable={true}
    value={{
      id: props.current,
      label: getRawCardData(props.current).name || 'Pick a card'
    }}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    placeholder="Pick a card"
    styles={{
      menu: provided => ({ ...provided, zIndex: 10 }),
      option: (provided, { data, isFocused, isDisabled }) => ({
        ...provided,
        color: 'var(--black)',
        background: `url(${getRarityImage(
          getRawCardData(data.value).rarity
        )}) ${
          isFocused ? 'rgba(25, 93, 156, 0.15)' : 'transparent'
        } no-repeat center left 1em`,
        opacity: isDisabled ? 0.5 : 1,
        backgroundSize: '0.75em',
        paddingLeft: '2.5em'
      })
    }}
    className="CardSelect"
    classNamePrefix="CardSelect"
    isOptionDisabled={option => option.disabled}
    options={Object.keys(cardsByFaction)
      .sort((a, b) => (ORDER.indexOf(a) > ORDER.indexOf(b) ? 1 : -1))
      .map(faction => ({
        label: faction,
        options: cardsByFaction[faction]
          .filter(card => (props.withSpells ? true : card.type !== 'spell'))
          .map(card => ({
            value: card.id,
            label: card.name,
            disabled: (props.disabledOptions || []).includes(card.id)
          }))
      }))}
  />
)

export default CardSelect
