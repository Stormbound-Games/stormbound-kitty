import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import { DEFAULT_CARD } from '~/constants/battle'
import CardSelect from '~/components/CardSelect'
import Label from '~/components/Label'
import NumberInput from '~/components/NumberInput'
import Row from '~/components/Row'
import Select from '~/components/Select'
import styles from './styles'

const CardsFormRow = React.memo(function CardsFormRow({ index, ...props }) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela()

  return (
    <div className={css(styles.row)} data-testid='battle-sim-cards-form'>
      <Row withNarrowGutter extend={{ marginBottom: 0 }}>
        <Row.Column width='2/3'>
          <CardSelect
            hideLabel
            label={`Slot #${index + 1}’s card`}
            id={`card-${index}`}
            name={`card-${index}`}
            current={props.cards[index].id}
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
          <Row withNarrowGutter>
            <Row.Column>
              {cardsIndex[props.cards[index].id]?.token ? (
                <NumberInput
                  hideLabel
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
                  hideLabel
                  label={`Slot #${index + 1}’s level`}
                  disabled={cardsIndex[props.cards[index].id]?.token}
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
          </Row>
        </Row.Column>
      </Row>
    </div>
  )
})

export default React.memo(function BattleSimCardsForm(props) {
  const { css } = useFela()

  return (
    <>
      <fieldset className={css(styles.form)} data-testid='cards-form'>
        <Label as='legend' extend={styles.legend}>
          Cards
        </Label>

        {props.cards.map((card, index) => (
          <CardsFormRow {...props} key={card.id || index} index={index} />
        ))}
      </fieldset>
    </>
  )
})
