import React from 'react'
import Checkbox from '../Checkbox'
import ShareButton from '../BSShareButton'
import ResetButton from '../ResetButton'
import Row from '../Row'
import Column from '../Column'
import './index.css'

const BSGameForm = props => {
  return (
    <div className='BSGameForm'>
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
              className='BSGameForm__grid-markers'
            >
              Enable <span className='visually-hidden'>grid markers</span>
            </Checkbox>
          </fieldset>
        </Column>
      </Row>
      <div className='BSGameForm__buttons'>
        <Row>
          <Column>
            <ResetButton
              label='Reset board'
              confirm='Are you sure you want to reset the board and all its configuration?'
              reset={props.resetBoard}
            />
          </Column>
          <Column>
            <ShareButton />
          </Column>
        </Row>
      </div>
    </div>
  )
}

export default BSGameForm
