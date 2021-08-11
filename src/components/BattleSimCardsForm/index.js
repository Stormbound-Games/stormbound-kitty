import React from 'react'
import { useFela } from 'react-fela'
import { DEFAULT_CARD } from '../../constants/deck'
import CardSelect from '../CardSelect'
import DeckImport from '../BattleSimDeckImport'
import NumberInput from '../NumberInput'
import Row from '../Row'
import Select from '../Select'
import VisuallyHidden from '../VisuallyHidden'
import getRawCardData from '../../helpers/getRawCardData'
import styles from './styles'

const CardsFormRow = React.memo(({ index, ...props }) => {
  const { css } = useFela()

  return (
    <div
      className={css(styles.row)}
      hidden={!props.expanded && index >= 4}
      data-testid='battle-sim-cards-form'
    >
      <Row extend={{ marginBottom: 0 }}>
        <Row.Column width='2/3'>
          <VisuallyHidden as='label' htmlFor={`card-${index}`}>
            Slot #{index + 1}’s card
          </VisuallyHidden>
          <CardSelect
            id={`card-${index}`}
            name={`card-${index}`}
            current={props.cards[index] ? props.cards[index].id : ''}
            onChange={option => {
              !option
                ? props.setCard(index)({ ...DEFAULT_CARD })
                : props.setCard(index)({
                    id: option.value,
                    level: Math.min(props.cards[index].level, 5),
                  })
            }}
            withSpells
            withTokens
            disabledOptions={props.cards.map(card => card.id)}
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Row>
            <Row.Column>
              {getRawCardData(props.cards[index].id).token ? (
                <NumberInput
                  isLabelHidden
                  label={`Slot #${index + 1}’s level`}
                  name={`card-${index}-level`}
                  id={`card-${index}-level`}
                  required
                  min={1}
                  value={props.cards[index].level || 1}
                  onChange={level => props.setCard(index)({ level })}
                  data-testid={`cards-form-strength-${index}`}
                />
              ) : (
                <Select
                  isLabelHidden
                  label={`Slot #${index + 1}’s level`}
                  disabled={getRawCardData(props.cards[index].id).token}
                  name={`card-${index}-level`}
                  id={`card-${index}-level`}
                  value={Math.min(props.cards[index].level, 5) || 1}
                  onChange={event =>
                    props.setCard(index)({ level: +event.target.value })
                  }
                  data-testid={`cards-form-level-${index}`}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
              )}
            </Row.Column>
            <Row.Column>
              <button
                type='button'
                className={css(styles.handButton)}
                aria-pressed={props.hand.includes(props.cards[index].id)}
                disabled={
                  !props.cards[index].id ||
                  (props.hand.length === 4 &&
                    !props.hand.includes(props.cards[index].id))
                }
                onClick={() => props.addToHand({ id: props.cards[index].id })}
                title={
                  !props.cards[index].id
                    ? ''
                    : props.hand.includes(props.cards[index].id)
                    ? 'Remove card from hand'
                    : 'Add card to hand'
                }
                aria-label={
                  props.hand.includes(props.cards[index].id)
                    ? 'Remove card from hand'
                    : 'Add card to hand'
                }
              >
                {props.hand.includes(props.cards[index].id) ? '-' : '+'}
              </button>
            </Row.Column>
          </Row>
        </Row.Column>
      </Row>
    </div>
  )
})

export default React.memo(function BattleSimCardsForm(props) {
  const { css } = useFela()
  const [expanded, setExpanded] = React.useState(false)

  return (
    <>
      <fieldset className={css(styles.form)} data-testid='cards-form'>
        <legend className={css(styles.legend)}>
          Cards
          <button
            type='button'
            onClick={() => setExpanded(e => !e)}
            className={'ButtonAsLink ' + css(styles.expandButton)}
          >
            {expanded ? 'Collapse deck' : 'Expand deck'}
          </button>
        </legend>

        {props.cards.map((card, index) => (
          <CardsFormRow
            {...props}
            index={index}
            key={card.id || index}
            expanded={expanded}
          />
        ))}
      </fieldset>
      <DeckImport importDeck={props.importDeck} />
    </>
  )
})
