import React from 'react'
import { Link } from 'react-router-dom'
import CardUpgradeStats from '../CardUpgradeStats'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import Row from '../Row'
import Select from '../Select'
import Title from '../Title'

export default React.memo(function CollectionActiveCardForm(props) {
  return (
    <>
      <Title>{props.resolvedActiveCard.name}</Title>

      <form onSubmit={props.onActiveCardFormSubmit}>
        <Row>
          <Row.Column>
            <Select
              label='Card level'
              id='level'
              name='level'
              required
              value={props.activeCard.missing ? '1' : props.activeCard.level}
              onChange={props.setActiveCardLevel}
              ref={props.levelFieldRef}
              disabled={props.activeCard.missing}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </Row.Column>

          <Row.Column>
            <NumberInput
              label='Copies'
              id='copies'
              name='copies'
              required
              value={
                props.activeCard.level === 5 || props.activeCard.missing
                  ? 0
                  : props.activeCard.copies || ''
              }
              onChange={props.setActiveCardCopies}
              disabled={
                props.activeCard.level === 5 || props.activeCard.missing
              }
              min={0}
            />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <Checkbox
              name='missing'
              id='missing'
              checked={props.activeCard.missing}
              onChange={props.setActiveCardMissing}
            >
              Missing card
            </Checkbox>
          </Row.Column>
        </Row>

        <CardUpgradeStats {...props.activeCard} />

        <p>
          <Link to={`/card/${props.activeCard.id}/display`}>
            Open this card in the card builder
          </Link>
          . You will be able to browse your collection from that page as well.
        </p>
      </form>
    </>
  )
})
