import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../CardBuilderShareButton'
import formatCardStats from '../../helpers/formatCardStats'
import './index.css'

export default React.memo(function CardBuilderCardForm(props) {
  const match = useRouteMatch()
  const isPristine = !match.params.cardId
  return (
    <>
      <form onSubmit={event => event.preventDefault()}>
        <p>
          Attributes leveling can be expressed using slashes (<code>/</code>) to
          separate dynamic values across levels, for instance “3/4/5/5/6”.
          Exactly one or five values need to be expressed for it to be valid.
        </p>

        <Row>
          <Row.Column>
            <label htmlFor='strength'>Strength</label>
            <input
              type='text'
              name='strength'
              id='strength'
              value={
                props.strength.display === null ? '' : props.strength.display
              }
              onChange={event => props.setStrength(event.target.value)}
              disabled={props.type === 'spell'}
              required
              placeholder='e.g. “3” or “1/2/3/4/5”'
              data-testid='cb-strength-input'
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='mana'>Mana</label>
            <input
              type='text'
              name='mana'
              id='mana'
              value={props.mana.display === null ? '' : props.mana.display}
              onChange={event => props.setMana(event.target.value)}
              required
              placeholder='e.g. “3” or “5/5/4/4/3”'
              data-testid='cb-mana-input'
            />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <label htmlFor='ability'>Ability</label>
            <input
              type='text'
              name='ability'
              id='ability'
              maxLength={160}
              value={
                props.ability.display === null ? '' : props.ability.display
              }
              placeholder='e.g. Give 2/3/4/5/6 strength to a *bordering* friendly unit.'
              onChange={event => props.setAbility(event.target.value)}
              data-testid='cb-ability-input'
            />
          </Row.Column>
        </Row>

        <div className='CardBuilderCoreForm__buttons'>
          <Row>
            <Row.Column>
              <ResetButton
                label='Reset form'
                confirm='Are you sure you want to reset the form to its initial state?'
                reset={props.reset}
                disabled={isPristine}
              />
            </Row.Column>
            <Row.Column>
              <ShareButton
                title={props.name}
                content={formatCardStats(props)}
                disabled={isPristine}
              />
            </Row.Column>
          </Row>
        </div>
      </form>
    </>
  )
})
