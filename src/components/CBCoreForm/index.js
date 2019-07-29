import React, { Fragment } from 'react'
import CardSelect from '../CardSelect'
import Row from '../Row'
import Column from '../Column'
import FactionSelect from '../FactionSelect'
import { RARITIES, TYPES, RACES } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import './index.css'

const CBCardForm = props => {
  const [imageFocusedColumn, setImageFocusedColumn] = React.useState(null)

  return (
    <Fragment>
      <form onSubmit={event => event.preventDefault()}>
        <Row>
          <Column>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength={20}
              required
              value={props.name}
              onChange={event => props.setName(event.target.value)}
            />
          </Column>
          <Column>
            <label htmlFor="movement">Movement</label>
            <input
              type="text"
              name="movement"
              id="movement"
              value={props.movement === null ? '' : props.movement}
              onChange={event => props.setMovement(event.target.value)}
              required
              disabled={props.type !== 'unit'}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <label htmlFor="rarity">Rarity</label>
            <select
              name="rarity"
              id="rarity"
              required
              value={props.rarity}
              onChange={event => props.setRarity(event.target.value)}
            >
              {Object.keys(RARITIES).map(rarity => (
                <option value={rarity} key={rarity}>
                  {capitalise(rarity)}
                </option>
              ))}
            </select>
          </Column>
          <Column>
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              required
              value={props.type}
              onChange={event => props.setType(event.target.value)}
            >
              {Object.keys(TYPES).map(type => (
                <option value={type} key={type}>
                  {capitalise(type)}
                </option>
              ))}
            </select>
          </Column>
        </Row>

        <Row>
          <Column>
            <FactionSelect
              value={props.faction}
              onChange={event => props.setFaction(event.target.value)}
              withNeutral
              required
            />
          </Column>
          <Column>
            <label htmlFor="race">Race</label>
            <select
              name="race"
              id="race"
              required
              value={props.race || ''}
              disabled={props.type !== 'unit'}
              onChange={event => props.setRace(event.target.value)}
            >
              <option value="" disabled>
                Race
              </option>
              {Object.keys(RACES).map(race => (
                <option value={race} key={race}>
                  {capitalise(race)}
                </option>
              ))}
            </select>
          </Column>
        </Row>

        <Row>
          <Column
            width={
              imageFocusedColumn === 'imageCardId'
                ? 66
                : imageFocusedColumn === 'imageURL'
                ? 33
                : undefined
            }
          >
            <label className="CBCardForm__image-label" htmlFor="imageCardId">
              Existing card image
            </label>
            <CardSelect
              id="imageCardId"
              name="imageCardId"
              current={props.imageCardId}
              onChange={option =>
                props.setImageCardId(option ? option.value : null)
              }
              onFocus={() => setImageFocusedColumn('imageCardId')}
              onBlur={() => setImageFocusedColumn(null)}
              withSpells={true}
            />
          </Column>
          <Column
            width={
              imageFocusedColumn === 'imageURL'
                ? 66
                : imageFocusedColumn === 'imageCardId'
                ? 33
                : undefined
            }
          >
            <label className="CBCardForm__image-label" htmlFor="imageURL">
              Or image from URL
            </label>
            <input
              type="url"
              name="imageURL"
              id="imageURL"
              value={props.imageURL}
              onChange={event => props.setImageURL(event.target.value)}
              onPaste={props.onImagePaste}
              onFocus={() => setImageFocusedColumn('imageURL')}
              onBlur={() => setImageFocusedColumn(null)}
            />
          </Column>
        </Row>
      </form>
    </Fragment>
  )
}

export default CBCardForm
