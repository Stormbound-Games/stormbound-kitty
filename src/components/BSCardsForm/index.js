import React, { Fragment } from 'react'
import getRawCardData from '../../helpers/getRawCardData'
import { DEFAULT_CARD } from '../../constants/battle'
import CardSelect from '../CardSelect'
import Row from '../Row'
import Column from '../Column'
import DeckImport from '../BSDeckImport'
import './index.css'

const CardsFormRow = ({ index, ...props }) => (
  <div className="BSCardsForm__row" hidden={!props.expanded && index >= 4}>
    <Row>
      <Column width={66}>
        <label className="visually-hidden" htmlFor={`card-${index}`}>
          Slot #{index + 1}’s card
        </label>
        <CardSelect
          id={`card-${index}`}
          name={`card-${index}`}
          current={props.cards[index] ? props.cards[index].id : ''}
          onChange={option => {
            !option
              ? props.setCard(index)({ ...DEFAULT_CARD })
              : props.setCard(index)({
                  id: option.value,
                  level: Math.min(props.cards[index].level, 5)
                })
          }}
          withSpells={true}
          disabledOptions={props.cards.map(card => card.id)}
        />
      </Column>
      <Column width={33}>
        <Row>
          <Column>
            <label
              className={'visually-hidden'}
              htmlFor={`card-${index}-level`}
            >
              Slot #{index + 1}’s level
            </label>
            {getRawCardData(props.cards[index].id).token ? (
              <input
                type="number"
                name={`card-${index}-level`}
                id={`card-${index}-level`}
                required
                min={1}
                value={props.cards[index].level || 1}
                onChange={event =>
                  props.setCard(index)({ level: +event.target.value })
                }
                data-testid={`cards-form-strength-${index}`}
              />
            ) : (
              <select
                className="BSCardsForm__level"
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
              </select>
            )}
          </Column>
          <Column>
            <button
              type="button"
              className="BSCardsForm__hand-button"
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
          </Column>
        </Row>
      </Column>
    </Row>
  </div>
)

const BSCardsForm = props => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <Fragment>
      <fieldset className="BSCardsForm" data-testid="cards-form">
        <legend>
          Cards
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="ButtonAsLink BSCardsForm__expand-button"
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
    </Fragment>
  )
}

export default BSCardsForm
