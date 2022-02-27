import React from 'react'
import { useFela } from 'react-fela'
import { DEFAULT_CELL } from '~/constants/battle'
import { CardsContext } from '~/components/CardsProvider'
import CardSelect from '~/components/CardSelect'
import Checkbox from '~/components/Checkbox'
import CTA from '~/components/CTA'
import Label from '~/components/Label'
import NumberInput from '~/components/NumberInput'
import Radio from '~/components/Radio'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import unfoldValue from '~/helpers/unfoldValue'
import styles from './styles'

const getActiveCellCard = ({ board, activeCell }) =>
  activeCell ? board[activeCell[0]][activeCell[1]] : { ...DEFAULT_CELL }

export default React.memo(function BattleSimCellForm(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const activeCellCard = getActiveCellCard(props)
  const { setCardSelectValue } = props
  const [strength, setStrength] = React.useState(activeCellCard.strength || 1)
  const [level, setLevel] = React.useState(activeCellCard.level || 1)
  const [poisoned, setPoisoned] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.poisoned : false
  )
  const [vitalized, setVitalized] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.vitalized : false
  )
  const [frozen, setFrozen] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.frozen : false
  )
  const [confused, setConfused] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.confused : false
  )
  const [disabled, setDisabled] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.disabled : false
  )
  const [card, setCard] = React.useState(activeCellCard.card.id || '')

  React.useEffect(() => {
    const activeCellCard = getActiveCellCard({
      board: props.board,
      activeCell: props.activeCell,
    })
    const isStructure = activeCellCard.card.type !== 'structure'
    const isToken = (activeCellCard.card.id || '').startsWith('T')

    setStrength(activeCellCard.strength || 1)
    setPoisoned(isStructure ? activeCellCard.poisoned : false)
    setVitalized(isStructure ? activeCellCard.vitalized : false)
    setFrozen(isStructure ? activeCellCard.frozen : false)
    setConfused(isStructure ? activeCellCard.confused : false)
    setDisabled(isStructure ? activeCellCard.disabled : false)
    setLevel(isToken ? 1 : activeCellCard.level || 1)
    setCard(activeCellCard.card.id || '')
    setCardSelectValue(activeCellCard.card.id || '')
  }, [props.activeCell, props.board, setCardSelectValue])

  React.useEffect(() => {
    // When changing the value of the card select, unset poisoned and frozen
    // checkboxes if the selected card is a structure
    if (cardsIndex[card].type === 'structure') {
      setPoisoned(false)
      setVitalized(false)
      setFrozen(false)
      setConfused(false)
      setDisabled(false)
    }
  }, [cardsIndex, card])

  const updateStrengthField = (card, level) => {
    const resolvedCard = cardsIndex[card]
    const strength = unfoldValue(resolvedCard.strength)[+level - 1]
    if (resolvedCard.id) setStrength(strength)
    else setStrength(1)
  }

  return (
    <form
      className={css(styles.form)}
      onSubmit={props.onUnitSubmit}
      data-testid='cell-form'
    >
      <div>
        <Row withNarrowGutter>
          <Row.Column width='3/4'>
            <CardSelect
              label='Card'
              name='card'
              id='card'
              required
              current={card}
              onChange={option => {
                if (!option) {
                  setCard('')
                  props.setCardSelectValue('')
                } else {
                  setCard(option.value)
                  props.setCardSelectValue(option.value)
                  updateStrengthField(option.value, level)
                }
              }}
              withSpells={false}
              withTokens
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Select
              label='Level'
              disabled={(card || '').startsWith('T')}
              id='level'
              value={level}
              onChange={event => {
                setLevel(+event.target.value)
                updateStrengthField(card, +event.target.value)
              }}
              required
              data-testid='cell-level-select'
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </Row.Column>
        </Row>
      </div>

      <div>
        <Row withNarrowGutter>
          <Row.Column>
            <NumberInput
              label='Strength'
              name='strength'
              id='strength'
              required
              min={1}
              max={99}
              value={strength}
              onChange={setStrength}
              data-testid='cell-strength-input'
            />
          </Row.Column>
          <Row.Column>
            <fieldset>
              <Label as='legend'>Active player</Label>
              <div className={css(styles.radios)}>
                <Radio
                  id='activePlayerBlue'
                  name='activePlayer'
                  value='BLUE'
                  checked={props.activePlayer === 'BLUE'}
                  onChange={event => props.setActivePlayer(event.target.value)}
                  data-testid='cell-player-BLUE-radio'
                  required
                >
                  Blue
                </Radio>

                <Radio
                  id='activePlayerRed'
                  name='activePlayer'
                  value='RED'
                  checked={props.activePlayer === 'RED'}
                  onChange={event => props.setActivePlayer(event.target.value)}
                  data-testid='cell-player-RED-radio'
                  required
                >
                  Red
                </Radio>
              </div>
            </fieldset>
          </Row.Column>
        </Row>
      </div>

      <fieldset>
        <Label as='legend'>Statuses</Label>
        <Spacing bottom='BASE'>
          <div className={css(styles.checkboxes)}>
            <Checkbox
              extend={styles.checkbox}
              id='poisoned'
              disabled={cardsIndex[card].type === 'structure'}
              checked={poisoned}
              onChange={event => {
                setPoisoned(event.target.checked)
                if (event.target.checked) setVitalized(false)
              }}
              data-testid='cell-poisoned-checkbox'
            >
              Poisoned
            </Checkbox>
            <Checkbox
              extend={styles.checkbox}
              id='vitalized'
              disabled={cardsIndex[card].type === 'structure'}
              checked={vitalized}
              onChange={event => {
                setVitalized(event.target.checked)
                if (event.target.checked) setPoisoned(false)
              }}
              data-testid='cell-vitalized-checkbox'
            >
              Vitalized
            </Checkbox>
            <Checkbox
              extend={styles.checkbox}
              id='frozen'
              disabled={cardsIndex[card].type === 'structure'}
              checked={frozen}
              onChange={event => setFrozen(event.target.checked)}
              data-testid='cell-frozen-checkbox'
            >
              Frozen
            </Checkbox>
            <Checkbox
              extend={styles.checkbox}
              id='confused'
              disabled={cardsIndex[card].type === 'structure'}
              checked={confused}
              onChange={event => setConfused(event.target.checked)}
              data-testid='cell-confused-checkbox'
            >
              Confused
            </Checkbox>
            <Checkbox
              extend={styles.checkbox}
              id='disabled'
              disabled={cardsIndex[card].type === 'structure'}
              checked={disabled}
              onChange={event => setDisabled(event.target.checked)}
              data-testid='cell-disabled-checkbox'
            >
              Disabled
            </Checkbox>
          </div>
        </Spacing>
      </fieldset>

      <Row withNarrowGutter>
        <Row.Column>
          {activeCellCard.card.id !== card ||
          activeCellCard.strength !== +strength ||
          activeCellCard.level !== +level ||
          activeCellCard.poisoned !== poisoned ||
          activeCellCard.vitalized !== vitalized ||
          activeCellCard.frozen !== frozen ||
          activeCellCard.confused !== confused ||
          activeCellCard.disabled !== disabled ||
          activeCellCard.player !== props.activePlayer ? (
            <CTA type='submit' disabled={!card} data-testid='cell-form-btn'>
              {activeCellCard.card.id
                ? 'Update ' + activeCellCard.card.type
                : 'Add ' + (cardsIndex[card].type || '')}
            </CTA>
          ) : null}
        </Row.Column>
        <Row.Column>
          {!!activeCellCard.card.id ? (
            <CTA
              type='button'
              disabled={!card}
              onClick={props.emptyActiveCell}
              data-testid='cell-form-remove-btn'
            >
              Remove {activeCellCard.card.type}
            </CTA>
          ) : null}
        </Row.Column>
      </Row>
    </form>
  )
})
