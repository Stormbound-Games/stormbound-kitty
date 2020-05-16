import React from 'react'
import Only from '../Only'
import './index.css'

export default React.memo(function DeckCardLevelField(props) {
  return (
    <div className='DeckCardLevelField'>
      <label htmlFor='level' className='DeckCardLevelField__label'>
        Cards level
        <Only.Desktop>
          <span className='DeckCardLevelField__hint'>(keyboard 1-5)</span>
        </Only.Desktop>
      </label>
      <select
        data-testid='level-select'
        name='level'
        id='level'
        value={props.cardLevel}
        onChange={event => props.setCardLevel(+event.target.value)}
        required
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    </div>
  )
})
