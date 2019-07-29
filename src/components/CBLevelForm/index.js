import React, { Fragment } from 'react'
import Row from '../Row'
import Column from '../Column'
import ResetButton from '../ResetButton'
import ShareButton from '../CBShareButton'
import formatCardStats from '../../helpers/formatCardStats'
import './index.css'

const CBCardForm = props => (
  <Fragment>
    <form onSubmit={event => event.preventDefault()}>
      <p>
        Attributes leveling can be expressed using slashes (<code>/</code>) to
        separate dynamic values across levels, for instance “3/4/5/5/6”. Exactly
        one or five values need to be expressed for it to be valid.
      </p>

      <Row>
        <Column>
          <label htmlFor="strength">Strength</label>
          <input
            type="text"
            name="strength"
            id="strength"
            value={
              props.strength.display === null ? '' : props.strength.display
            }
            onChange={event => props.setStrength(event.target.value)}
            disabled={props.type === 'spell'}
            required
            placeholder="e.g. “3” or “1/2/3/4/5”"
          />
        </Column>
        <Column>
          <label htmlFor="mana">Mana</label>
          <input
            type="text"
            name="mana"
            id="mana"
            value={props.mana.display === null ? '' : props.mana.display}
            onChange={event => props.setMana(event.target.value)}
            required
            placeholder="e.g. “3” or “5/5/4/4/3”"
          />
        </Column>
      </Row>

      <Row>
        <Column>
          <label htmlFor="ability">Ability</label>
          <input
            type="text"
            name="ability"
            id="ability"
            maxLength={160}
            value={props.ability.display === null ? '' : props.ability.display}
            placeholder="e.g. Give 2/3/4/5/6 strength to a *bordering* friendly unit."
            onChange={event => props.setAbility(event.target.value)}
          />
        </Column>
      </Row>

      <div className="CBCoreForm__buttons">
        <Row>
          <Column>
            <ResetButton
              label="Reset form"
              confirm="Are you sure you want to reset the form to its initial state?"
              reset={props.reset}
            />
          </Column>
          <Column>
            <ShareButton title={props.name} content={formatCardStats(props)} />
          </Column>
        </Row>
      </div>
    </form>
  </Fragment>
)

export default CBCardForm
