import React from 'react'
import ShareButton from '../QBShareButton'
import ResetButton from '../ResetButton'
import Row from '../Row'
import Column from '../Column'
import './index.css'

const QBForm = props => (
  <form onSubmit={event => event.preventDefault()} className="QBForm">
    <Row>
      <Column>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          maxLength={40}
          required
          value={props.name}
          onChange={event => props.setName(event.target.value)}
        />
      </Column>
    </Row>

    <Row>
      <Column width={33}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          min={0}
          required
          step={props.currency === 'COINS' ? 10 : 1}
          value={props.amount}
          onChange={event => props.setAmount(event.target.value)}
        />
      </Column>

      <Column width={33}>
        <label htmlFor="currency">Currency</label>
        <select
          name="currency"
          id="currency"
          value={props.currency}
          onChange={event => props.setCurrency(event.target.value)}
          required
        >
          <option value="coins">Coins</option>
          <option value="rubies">Rubies</option>
          <option value="stones">Fusion stones</option>
        </select>
      </Column>

      <Column width={33}>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={props.difficulty}
          onChange={event => props.setDifficulty(+event.target.value)}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </Column>
    </Row>

    <Row>
      <Column>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          maxLength={100}
          required
          value={props.description}
          onChange={event => props.setDescription(event.target.value)}
        />
      </Column>
    </Row>

    <div className=" QBForm__buttons">
      <Row>
        <Column>
          <ShareButton />
        </Column>
        <Column>
          <ResetButton
            label="Reset form"
            confirm="Are you sure you want to reset the form to its initial state?"
            reset={props.reset}
          />
        </Column>
      </Row>
    </div>
  </form>
)

export default QBForm
