import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

export default React.memo(function BrawlMatchForm(props) {
  const viewportWith = useViewportWidth()

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.tr
        className='BrawlMatchForm'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
      >
        <td>
          {viewportWith >= 700 ? (
            <button
              form='add-match-form'
              type='submit'
              className='ButtonAsLink BrawlMatchForm__button'
              data-testid='match-btn'
            >
              ✔
            </button>
          ) : (
            <CTA
              form='add-match-form'
              type='submit'
              className='BrawlMatchForm__button'
              data-testid='match-btn'
            >
              {props.opponentHealth || props.opponentFaction || props.status
                ? 'Edit match'
                : 'Record match'}
            </CTA>
          )}
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
            data-testid='opponent-health'
            placeholder='e.g. 18'
            defaultValue={props.opponentHealth || ''}
          />
        </td>
        <td>
          <FactionSelect
            form='add-match-form'
            labelClassName='VisuallyHidden'
            name='opponent-faction'
            id='opponent-faction'
            data-testid='opponent-faction'
            withEmpty
            defaultValue={props.opponentFaction}
          />
        </td>
        <td>
          <label htmlFor='status' className='VisuallyHidden'>
            Status
          </label>
          <select
            id='status'
            name='status'
            required
            form='add-match-form'
            data-testid='outcome'
            defaultValue={props.status}
          >
            <option value=''>Set game outcome</option>
            <option value='WON'>Won</option>
            <option value='FORFEIT'>Won by forfeit</option>
            <option value='SURRENDERED'>Forfeited</option>
            <option value='LOST'>Lost</option>
          </select>
        </td>
      </motion.tr>
    </AnimatePresence>
  )
})
