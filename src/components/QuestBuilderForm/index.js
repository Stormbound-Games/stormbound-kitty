import React from 'react'
import Input from '~/components/Input'
import NumberInput from '~/components/NumberInput'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import Select from '~/components/Select'
import ShareButton from '~/components/QuestBuilderShareButton'
import Spacing from '~/components/Spacing'

export default React.memo(function QuestBuilderForm(props) {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <Row>
        <Row.Column>
          <Input
            label='Name'
            id='name'
            maxLength={40}
            required
            value={props.name}
            onChange={event => props.setName(event.target.value)}
          />
        </Row.Column>
      </Row>

      <Row withNarrowGutter>
        <Row.Column width='1/3'>
          <NumberInput
            label='Amount'
            name='amount'
            id='amount'
            min={0}
            required
            step={props.currency === 'coins' ? 10 : 1}
            value={props.amount}
            onChange={props.setAmount}
          />
        </Row.Column>

        <Row.Column width='1/3'>
          <Select
            label='Currency'
            id='currency'
            value={props.currency}
            onChange={event => props.setCurrency(event.target.value)}
            required
          >
            <option value='coins'>Coins</option>
            <option value='rubies'>Rubies</option>
            <option value='stones'>Fusion stones</option>
          </Select>
        </Row.Column>

        <Row.Column width='1/3'>
          <Select
            label='Difficulty'
            id='difficulty'
            value={props.difficulty}
            onChange={event => props.setDifficulty(+event.target.value)}
            required
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </Row.Column>
      </Row>

      <Row>
        <Row.Column>
          <Input
            label='Description'
            id='description'
            maxLength={100}
            required
            value={props.description}
            onChange={event => props.setDescription(event.target.value)}
          />
        </Row.Column>
      </Row>

      <Spacing top='LARGE'>
        <Row isDesktopOnly>
          <Row.Column>
            <ShareButton />
          </Row.Column>
          <Row.Column>
            <ResetButton
              label='Reset form'
              confirm='Are you sure you want to reset the form to its initial state?'
              reset={props.reset}
            />
          </Row.Column>
        </Row>
      </Spacing>
    </form>
  )
})
