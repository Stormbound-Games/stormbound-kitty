import React from 'react'
import Link from '~/components/Link'
import CardUpgradeStats from '~/components/CardUpgradeStats'
import Checkbox from '~/components/Checkbox'
import NumberInput from '~/components/NumberInput'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Title from '~/components/Title'

export default React.memo(function CollectionActiveCardForm(props) {
  return (
    <>
      <Title>{props.activeCard.name}</Title>

      <form onSubmit={props.onActiveCardFormSubmit}>
        <Row>
          <Row.Column>
            <Select
              label='Card level'
              id='level'
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
          <Link to={`/cards/${props.activeCard.id}`}>
            Open this card in the card builder
          </Link>
          . You will be able to browse your collection from that page as well.
        </p>
      </form>
    </>
  )
})
