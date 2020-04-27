import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Checkbox from '../Checkbox'
import Column from '../Column'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../BattleSimShareButton'
import './index.css'

const BattleSimGameForm = React.memo(function BattleSimGameForm(props) {
  const match = useRouteMatch()
  const isPristine = !match.params.simId

  return (
    <div className='BattleSimGameForm'>
      <Row>
        <Column>
          <label htmlFor='mana'>Current mana</label>
          <input
            type='number'
            name='mana'
            id='mana'
            min={3}
            max={99}
            value={props.mana}
            onChange={event => props.setMana(event.target.value)}
            data-testid='mana-input'
            required
          />
        </Column>
        <Column>
          <fieldset>
            <legend>Grid Markers</legend>
            <Checkbox
              name='gridMarkers'
              id='gridMarkers'
              checked={props.gridMarkers}
              onChange={props.toggleGridMarkers}
              data-testid='grid-markers'
              className='BattleSimGameForm__grid-markers'
            >
              Enable <span className='VisuallyHidden'>grid markers</span>
            </Checkbox>
          </fieldset>
        </Column>
      </Row>
      <div className='BattleSimGameForm__buttons'>
        <Row>
          <Column>
            <ResetButton
              label='Reset board'
              confirm='Are you sure you want to reset the board and all its configuration?'
              reset={props.resetBoard}
              disabled={isPristine}
            />
          </Column>
          <Column>
            <ShareButton disabled={isPristine} />
          </Column>
        </Row>
      </div>
    </div>
  )
})

export default BattleSimGameForm
