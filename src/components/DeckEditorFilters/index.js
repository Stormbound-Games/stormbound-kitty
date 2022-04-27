import React from 'react'
import { useFela } from 'react-fela'
import { TYPES, UNIT_TYPES, RARITIES } from '~/constants/game'
import AdvancedCardSearch from '~/components/AdvancedCardSearch'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import FactionSelect from '~/components/FactionSelect'
import Link from '~/components/Link'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import MobileTogglableContent from '~/components/MobileTogglableContent'
import capitalize from '~/helpers/capitalize'
import styles from './styles'

const isButtonDisabled = props =>
  props.faction === '*' &&
  props.type === '*' &&
  props.mana === '*' &&
  props.movement === '*' &&
  props.rarity === '*' &&
  props.unitType === '*' &&
  props.ability === '*' &&
  !props.text

export default React.memo(function DeckEditorFilters(props) {
  const { css } = useFela()

  if (props.advanced) {
    return (
      <AdvancedCardSearch
        onSubmit={props.runAdvancedSearch}
        value={props.search}
        setSearch={props.setAdvancedSearch}
        cancel={props.toggleAdvancedSearch}
      />
    )
  }

  return (
    <MobileTogglableContent label='Display collection filters'>
      <div
        className={css(styles.filters)}
        onSubmit={event => event.preventDefault()}
      >
        <Spacing bottom='BASE'>
          <Row isDesktopOnly withNarrowGutter spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <FactionSelect
                    value={props.faction}
                    onChange={event => props.setFaction(event.target.value)}
                    withNeutral
                    withAny
                    withExtendedVersions
                    data-testid='faction-select'
                  />
                </Row.Column>

                <Row.Column>
                  <Select
                    label='Type'
                    id='type'
                    value={props.type}
                    onChange={event => props.setType(event.target.value)}
                    data-testid='type-select'
                  >
                    <option value='*'>Any</option>
                    {TYPES.map(type => (
                      <option value={type} key={type}>
                        {capitalize(type)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <Select
                    label='Mana'
                    id='mana'
                    value={props.mana}
                    onChange={event => props.setMana(event.target.value)}
                    data-testid='mana-select'
                  >
                    <option value='*'>Any</option>
                    <option value='1-3'>1, 2 or 3</option>
                    <option value='4-5'>4 or 5</option>
                    <option value='6-7'>6 or 7</option>
                    <option value='8-Infinity'>8 or plus</option>
                  </Select>
                </Row.Column>

                <Row.Column>
                  <Select
                    label='Movement'
                    id='movement'
                    value={props.movement}
                    onChange={event => props.setMovement(event.target.value)}
                    data-testid='movement-select'
                  >
                    <option value='*'>Any</option>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
          </Row>

          <Row isDesktopOnly withNarrowGutter spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <Select
                    label='Rarity'
                    id='rarity'
                    value={props.rarity}
                    onChange={event => props.setRarity(event.target.value)}
                    data-testid='rarity-select'
                  >
                    <option value='*'>Any</option>
                    {RARITIES.map(rarity => (
                      <option value={rarity} key={rarity}>
                        {capitalize(rarity)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>

                <Row.Column>
                  <Select
                    label='Unit type'
                    id='unitType'
                    value={props.unitType}
                    onChange={event => props.setUnitType(event.target.value)}
                    data-testid='unit-type-select'
                  >
                    <option value='*'>Any</option>
                    {UNIT_TYPES.map(unitType => (
                      <option value={unitType} key={unitType}>
                        {capitalize(unitType)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <Select
                    label='Ability'
                    id='ability'
                    value={props.ability}
                    onChange={event => props.setAbility(event.target.value)}
                    data-testid='ability-select'
                  >
                    <option value='*'>Any</option>
                    <option value='ATTACKING'>Attacking Effect</option>
                    <option value='CHIP'>Chip</option>
                    <option value='COMMAND'>Command</option>
                    <option value='CONFUSION'>Confusion</option>
                    <option value='DISABLE'>Disable</option>
                    <option value='DRAIN'>Drain</option>
                    <option value='MOVING'>Moving Effect</option>
                    <option value='ON_DEATH'>On-death Effect</option>
                    <option value='FREEZE'>Freeze</option>
                    <option value='POISON'>Poison</option>
                    <option value='PUSH_PULL'>Push/Pull</option>
                    <option value='SPAWN'>Spawn</option>
                    <option value='SURVIVING'>Surviving Effect</option>
                    <option value='VITALITY'>Vitality</option>
                  </Select>
                </Row.Column>

                <Row.Column>
                  <Input
                    label='Text'
                    type='search'
                    id='text'
                    value={props.text}
                    onChange={event => props.setText(event.target.value)}
                    placeholder='e.g. ‘Faun’ or ‘poison’'
                    data-testid='name-input'
                  />
                </Row.Column>
              </Row>
            </Row.Column>
          </Row>

          <Row isDesktopOnly withNarrowGutter spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}></Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column extend={{ justifyContent: 'center' }}>
                  <Link onClick={props.toggleAdvancedSearch}>
                    <Icon icon='search' extend={styles.icon} /> Advanced search
                  </Link>
                </Row.Column>
                <Row.Column extend={{ alignSelf: 'flex-end' }}>
                  <Link
                    onClick={props.resetFilters}
                    data-testid='reset-filters-btn'
                    disabled={isButtonDisabled(props)}
                  >
                    <span className={css(styles.icon, styles.cross)}>
                      &times;
                    </span>{' '}
                    Reset filters
                  </Link>
                </Row.Column>
              </Row>
            </Row.Column>
          </Row>
        </Spacing>
      </div>
    </MobileTogglableContent>
  )
})
