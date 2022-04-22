import React from 'react'
import { components } from 'react-select'
import Creatable from 'react-select/creatable'
import { RARITIES, TYPES, RACES } from '~/constants/game'
import CardSelect from '~/components/CardSelect'
import Checkbox from '~/components/Checkbox'
import FactionSelect from '~/components/FactionSelect'
import ImageErrorDialog from '~/components/CardBuilderImageErrorDialog'
import Input from '~/components/Input'
import Label from '~/components/Label'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import capitalize from '~/helpers/capitalize'
import useSelectStyles from '~/hooks/useSelectStyles'

const CustomInput = React.memo(function Input(props) {
  return <components.Input {...props} maxLength={props.selectProps.maxLength} />
})

export default React.memo(function CardBuilderCoreForm(props) {
  const [imageFocusedColumn, setImageFocusedColumn] = React.useState(null)
  const styles = useSelectStyles({ withClear: true })

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
          <Label htmlFor='race-input'>Race</Label>
          <Creatable
            components={{ Input: CustomInput }}
            label='Race'
            id='race'
            instanceId='race'
            inputId='race-input'
            name='race'
            required
            value={{
              id: props.race || '',
              label: capitalize(props.race || ''),
            }}
            isDisabled={props.type !== 'unit'}
            onChange={option => {
              if (option?.value.toLowerCase() === 'ancient') {
                props.setAncient(true)
              } else if (option?.value.toLowerCase() === 'hero') {
                props.setHero(true)
              } else if (option?.value.toLowerCase() === 'elder') {
                props.setElder(true)
              } else {
                props.setRace(option ? option.value : '')
              }
            }}
            maxLength={25}
            isClearable
            styles={styles}
            options={RACES.map(race => ({
              value: race,
              label: capitalize(race),
            }))}
            className={['RaceSelect', props.className]
              .filter(Boolean)
              .join(' ')}
            classNamePrefix='RaceSelect'
            data-testid='cb-race-select'
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
      <Row isDesktopOnly>
        <Row.Column>
          <fieldset>
            <Label as='legend'>Race modifiers</Label>
            <Spacing top={['SMALL', 'NONE']}>
              <Row>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='elder'
                    checked={props.elder}
                    onChange={event => props.setElder(event.target.checked)}
                    disabled={props.type !== 'unit'}
                    data-testid='cb-elder-checkbox'
                  >
                    Elder
                  </Checkbox>
                </Row.Column>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='hero'
                    checked={props.hero}
                    onChange={event => props.setHero(event.target.checked)}
                    disabled={props.type !== 'unit'}
                    data-testid='cb-hero-checkbox'
                  >
                    Hero
                  </Checkbox>
                </Row.Column>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='ancient'
                    checked={props.ancient}
                    onChange={event => props.setAncient(event.target.checked)}
                    data-testid='cb-ancient-checkbox'
                  >
                    Ancient
                  </Checkbox>
                </Row.Column>
              </Row>
            </Spacing>
          </fieldset>
        </Row.Column>
        <Row.Column />
      </Row>
    </>
  )
})
