import React from 'react'
import Checkbox from '../Checkbox'
import FactionSelect from '../FactionSelect'
import './index.css'

export default React.memo(function BrawlMatchForm(props) {
  return (
    <tr className='BrawlMatchForm'>
      <td>
        <button
          form='add-match-form'
          type='submit'
          className='ButtonAsLink BrawlMatchForm__button'
        >
          ✔
        </button>
      </td>
      <td>
        <label htmlFor='opponent-health' className='VisuallyHidden'>
          Opponent’s health
        </label>
        <input
          form='add-match-form'
          type='number'
          min={10}
          max={20}
          name='opponent-health'
          id='opponent-health'
          required
          placeholder='18'
        />
      </td>
      <td>
        <FactionSelect
          form='add-match-form'
          labelClassName='VisuallyHidden'
          name='opponent-faction'
          id='opponent-faction'
          withEmpty
          required
        />
      </td>
      <td>
        <Checkbox id='won' name='won' form='add-match-form'>
          Won
        </Checkbox>
      </td>
    </tr>
  )
})
