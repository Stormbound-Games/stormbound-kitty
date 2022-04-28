import React from 'react'
import { components } from 'react-select'
import { RARITIES, TYPES } from '~/constants/game'
import CardSelect from '~/components/CardSelect'
import Checkbox from '~/components/Checkbox'
import FactionSelect from '~/components/FactionSelect'
import ImageErrorDialog from '~/components/CardBuilderImageErrorDialog'
import Input from '~/components/Input'
import Row from '~/components/Row'
import Select from '~/components/Select'
import UnitTypeSelect from '~/components/UnitTypeSelect'
import capitalize from '~/helpers/capitalize'

const CustomInput = React.memo(function Input(props) {
  return <components.Input {...props} maxLength={props.selectProps.maxLength} />
})

export default React.memo(function CardBuilderCoreForm(props) {
  const [imageFocusedColumn, setImageFocusedColumn] = React.useState(null)

  return (
    <>
      <Row withNarrowGutter>
        <Row.Column>
          <Input
            label='Name'
            id='name'
            maxLength={20}
            required
            value={props.name}
            onChange={event => props.setName(event.target.value)}
            data-testid='cb-name-input'
          />
        </Row.Column>
        <Row.Column>
          <Input
            label='Movement'
            id='movement'
            value={props.movement === null ? '' : props.movement}
            onKeyPress={event =>
              !/[0-9]/.test(event.key) && event.preventDefault()
            }
            onChange={event => props.setMovement(event.target.value)}
            required
            disabled={props.type !== 'unit'}
            data-testid='cb-movement-input'
            pattern='[0-9]*'
          />
          <Checkbox
            id='fixed-movement'
            checked={props.fixedMovement}
            onChange={event => props.setFixedMovement(event.target.checked)}
            disabled={props.type !== 'unit'}
            data-testid='cb-fixed-movement-checkbox'
            extend={{ marginTop: 'var(--s-small)' }}
          >
            Has forward-fixed movement
          </Checkbox>
        </Row.Column>
      </Row>

      <Row withNarrowGutter>
        <Row.Column>
          <Select
            label='Rarity'
            id='rarity'
            required
            value={props.rarity}
            onChange={event => props.setRarity(event.target.value)}
            data-testid='cb-rarity-select'
          >
            {RARITIES.map(rarity => (
              <option value={rarity} key={rarity}>
                {capitalize(rarity)}
              </option>
            ))}
          </Select>
        </Row.Column>
        <Row.Column>
          <Select
            label='Type'
            id='type'
            required
            value={props.type}
            onChange={event => props.setType(event.target.value)}
            data-testid='cb-type-select'
          >
            {TYPES.map(type => (
              <option value={type} key={type}>
                {capitalize(type)}
              </option>
            ))}
          </Select>
        </Row.Column>
      </Row>

      <Row withNarrowGutter>
        <Row.Column>
          <FactionSelect
            value={props.faction}
            onChange={event => props.setFaction(event.target.value)}
            withNeutral
            required
            data-testid='cb-faction-select'
          />
        </Row.Column>
        <Row.Column>
          <UnitTypeSelect
            components={{ Input: CustomInput }}
            max={3}
            value={props.unitTypes}
            disabled={props.type !== 'unit'}
            isCreatable
            onChange={options =>
              props.setUnitTypes(options.map(option => option.value))
            }
            data-testid='cb-unit-types-select'
          />
        </Row.Column>
      </Row>

      <Row withNarrowGutter>
        <Row.Column
          width={
            imageFocusedColumn === 'imageCardId'
              ? '2/3'
              : imageFocusedColumn === 'imageURL'
              ? '1/3'
              : undefined
          }
        >
          <CardSelect
            label='Official image'
            id='imageCardId'
            name='imageCardId'
            current={props.imageCardId}
            onChange={option =>
              props.setImageCardId(option ? option.value : null)
            }
            onFocus={() => setImageFocusedColumn('imageCardId')}
            onBlur={() => setImageFocusedColumn(null)}
            withSpells
            withTokens
            withClear
          />
          <ImageErrorDialog dialogRef={props.imageErrorDialogRef} />
        </Row.Column>
        <Row.Column
          width={
            imageFocusedColumn === 'imageURL'
              ? '2/3'
              : imageFocusedColumn === 'imageCardId'
              ? '1/3'
              : undefined
          }
        >
          <Input
            label='Or image from URL'
            type='url'
            id='imageURL'
            value={props.imageURL}
            onChange={event => props.setImageURL(event.target.value)}
            onPaste={props.onImagePaste}
            onFocus={() => setImageFocusedColumn('imageURL')}
            onBlur={() => setImageFocusedColumn(null)}
            data-testid='cb-image-input'
          />
        </Row.Column>
      </Row>
    </>
  )
})
