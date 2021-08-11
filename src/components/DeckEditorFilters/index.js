import React from 'react'
import { useFela } from 'react-fela'
import { TYPES, RACES, RARITIES } from '../../constants/game'
import AdvancedCardSearch from '../AdvancedCardSearch'
import Checkbox from '../Checkbox'
import Icon from '../Icon'
import Input from '../Input'
import FactionSelect from '../FactionSelect'
import Row from '../Row'
import Select from '../Select'
import Spacing from '../Spacing'
import MobileTogglableContent from '../MobileTogglableContent'
import capitalise from '../../helpers/capitalise'
import styles from './styles'

const isButtonDisabled = props =>
  props.faction === '*' &&
  props.type === '*' &&
  props.mana === '*' &&
  props.movement === '*' &&
  props.rarity === '*' &&
  props.race === '*' &&
  props.ability === '*' &&
  !props.text &&
  !props.elder &&
  !props.hero

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
    <MobileTogglableContent
      id='deck-filters'
      withSymbols
      labelCollapsed='Expand collection filters'
      labelExpanded='Collapse collection filters'
      className={css(styles.toggle)}
    >
      <div
        className={css(styles.filters)}
        onSubmit={event => event.preventDefault()}
      >
        <Spacing bottom='BASE'>
          <Row desktopOnly spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
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
                    {Object.keys(TYPES).map(type => (
                      <option value={type} key={type}>
                        {capitalise(type)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
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

          <Row desktopOnly spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
                <Row.Column>
                  <Select
                    label='Rarity'
                    id='rarity'
                    value={props.rarity}
                    onChange={event => props.setRarity(event.target.value)}
                    data-testid='rarity-select'
                  >
                    <option value='*'>Any</option>
                    {Object.keys(RARITIES).map(rarity => (
                      <option value={rarity} key={rarity}>
                        {capitalise(rarity)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>

                <Row.Column>
                  <Select
                    label='Race'
                    id='race'
                    value={props.race}
                    onChange={event => props.setRace(event.target.value)}
                    data-testid='race-select'
                  >
                    <option value='*'>Any</option>
                    {Object.keys(RACES).map(race => (
                      <option value={race} key={race}>
                        {capitalise(race)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
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

          <Row desktopOnly spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
                <Row.Column>
                  <Checkbox
                    id='elder'
                    checked={props.elder}
                    onChange={event => props.setElder(event.target.checked)}
                    data-testid='elder-checkbox'
                  >
                    Elder
                  </Checkbox>
                </Row.Column>
                <Row.Column>
                  <Checkbox
                    id='hero'
                    checked={props.hero}
                    onChange={event => props.setHero(event.target.checked)}
                    data-testid='hero-checkbox'
                  >
                    Hero
                  </Checkbox>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row>
                <Row.Column extend={{ justifyContent: 'center' }}>
                  <button
                    type='button'
                    onClick={props.toggleAdvancedSearch}
                    className='ButtonAsLink'
                  >
                    <Icon icon='search' extend={styles.icon} /> Advanced search
                  </button>
                </Row.Column>
                <Row.Column extend={{ alignSelf: 'flex-end' }}>
                  <button
                    onClick={props.resetFilters}
                    type='button'
                    className='ButtonAsLink'
                    data-testid='reset-filters-btn'
                    disabled={isButtonDisabled(props)}
                  >
                    <span className={css(styles.icon, styles.cross)}>
                      &times;
                    </span>{' '}
                    Reset filters
                  </button>
                </Row.Column>
              </Row>
            </Row.Column>
          </Row>
        </Spacing>{' '}
      </div>
    </MobileTogglableContent>
  )
})
