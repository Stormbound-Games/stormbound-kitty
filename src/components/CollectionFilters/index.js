import React from 'react'
import { useFela } from 'react-fela'
import { TYPES, RARITIES, RACES } from '~/constants/game'
import AdvancedCardSearch from '~/components/AdvancedCardSearch'
import Checkbox from '~/components/Checkbox'
import FactionSelect from '~/components/FactionSelect'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import Link from '~/components/Link'
import Only from '~/components/Only'
import MobileTogglableContent from '~/components/MobileTogglableContent'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import Row from '~/components/Row'
import capitalize from '~/helpers/capitalize'
import styles from './styles'

const isButtonDisabled = props =>
  props.faction === '*' &&
  props.status === '*' &&
  props.level === '*' &&
  props.rarity === '*' &&
  props.type === '*' &&
  props.race === '*' &&
  !props.text &&
  !props.elder &&
  !props.ancient &&
  !props.hero &&
  props.order === 'NATURAL'

export default React.memo(function CollectionFilters(props) {
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
      <Spacing bottom='BASE'>
        <form onSubmit={event => event.preventDefault()}>
          <Row isDesktopOnly withNarrowGutter spacing={{ bottom: 'NONE' }}>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <FactionSelect
                    value={props.faction}
                    onChange={event => props.setFaction(event.target.value)}
                    withNeutral
                    withAny
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
                    label='Status'
                    id='status'
                    value={props.status}
                    onChange={event => props.setStatus(event.target.value)}
                    data-testid='status-select'
                  >
                    <option value='*'>Any</option>
                    <option value='MISSING'>Missing</option>
                    <option value='UPGRADABLE'>Upgradable</option>
                    <option value='MAXABLE'>Maxable</option>
                    <option value='EXCESS'>Excess copies</option>
                  </Select>
                </Row.Column>
                <Row.Column>
                  <Select
                    label='Level'
                    id='level'
                    value={props.level}
                    onChange={event => props.setLevel(event.target.value)}
                    data-testid='level-select'
                  >
                    <option value='*'>Any</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
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
                    {Object.keys(RARITIES).map(rarity => (
                      <option value={rarity} key={rarity}>
                        {capitalize(rarity)}
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
                        {capitalize(race)}
                      </option>
                    ))}
                  </Select>
                </Row.Column>
              </Row>
            </Row.Column>
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column>
                  <Only.CustomCollection>
                    <Select
                      label='Order'
                      id='order'
                      value={props.order}
                      onChange={event => props.setOrder(event.target.value)}
                      data-testid='order-select'
                      disabled={props.status === 'EXCESS'}
                    >
                      <option value='NATURAL'>Natural</option>
                      <option value='VALUE'>Value</option>
                    </Select>
                  </Only.CustomCollection>
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
            <Row.Column spacing={{ bottom: 'NONE' }}>
              <Row withNarrowGutter>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='elder'
                    checked={props.elder}
                    onChange={event => props.setElder(event.target.checked)}
                    data-testid='elder-checkbox'
                  >
                    Elder
                  </Checkbox>
                </Row.Column>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='hero'
                    checked={props.hero}
                    onChange={event => props.setHero(event.target.checked)}
                    data-testid='hero-checkbox'
                  >
                    Hero
                  </Checkbox>
                </Row.Column>
                <Row.Column width='1/3'>
                  <Checkbox
                    id='ancient'
                    checked={props.ancient}
                    onChange={event => props.setAncient(event.target.checked)}
                    data-testid='ancient-checkbox'
                  >
                    Ancient
                  </Checkbox>
                </Row.Column>
              </Row>
            </Row.Column>
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
                    data-testid='reset-btn'
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
        </form>
      </Spacing>
    </MobileTogglableContent>
  )
})
