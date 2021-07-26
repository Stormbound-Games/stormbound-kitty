import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrawlContext } from '../BrawlProvider'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import useViewportSize from '../../hooks/useViewportSize'
import { VICTORY_BONUSES } from '../../constants/brawl'
import './index.css'

export default React.memo(function BrawlMatchForm(props) {
  const { meta } = React.useContext(BrawlContext)
  const { viewportWidth } = useViewportSize()
  const { isEdit, status: editedStatus, bonus: editedBonus } = props
  const [status, setStatus] = React.useState(editedStatus || '')
  const [bonus, setBonus] = React.useState(editedBonus || '')

  React.useEffect(() => {
    if (!['WON', 'FORFEIT'].includes(status)) setBonus('')
  }, [status])

  React.useEffect(() => {
    if (isEdit) setStatus(editedStatus)
  }, [isEdit, editedStatus])

  React.useEffect(() => {
    if (isEdit) setBonus(editedBonus)
  }, [isEdit, editedBonus])

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.tr
        className='BrawlMatchForm'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
      >
        <td>
          {viewportWidth >= 700 ? (
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
              {isEdit ? 'Edit match' : 'Record match'}
            </CTA>
          )}
        </td>
        <td data-label='Opponent’s health'>
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
        <td data-label='Opponent’s faction'>
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
        <td data-label='Match outcome'>
          <label htmlFor='status' className='VisuallyHidden'>
            Status
          </label>
          <select
            id='status'
            name='status'
            required
            form='add-match-form'
            data-testid='outcome'
            value={status}
            onChange={event => setStatus(event.target.value)}
          >
            <option value=''>Set game outcome</option>
            <option value='WON'>Won</option>
            <option value='FORFEIT'>Won by forfeit</option>
            <option value='DRAW'>Draw</option>
            <option value='SURRENDERED'>Forfeited</option>
            <option value='LOST'>Lost</option>
          </select>
        </td>
        <td>
          <label htmlFor='bonus' className='VisuallyHidden'>
            Victory bonus
          </label>
          <select
            id='bonus'
            name='bonus'
            form='add-match-form'
            data-testid='bonus'
            disabled={!['WON', 'FORFEIT'].includes(status)}
            required={['WON', 'FORFEIT'].includes(status)}
            value={bonus}
            onChange={event => setBonus(event.target.value)}
          >
            <option value=''>Pick a bonus</option>
            {Object.keys(VICTORY_BONUSES).map(bonus => (
              <option
                value={bonus}
                key={bonus}
                disabled={!VICTORY_BONUSES[bonus].isAvailable(meta)}
              >
                {VICTORY_BONUSES[bonus].label}
              </option>
            ))}
          </select>
        </td>
      </motion.tr>
    </AnimatePresence>
  )
})
