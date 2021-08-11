import React from 'react'
import { useFela } from 'react-fela'
import { AnimatePresence, motion } from 'framer-motion'
import { BrawlContext } from '../BrawlProvider'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import Select from '../Select'
import VisuallyHidden from '../VisuallyHidden'
import useViewportSize from '../../hooks/useViewportSize'
import { VICTORY_BONUSES } from '../../constants/brawl'
import styles from './styles'

export default React.memo(function BrawlMatchForm(props) {
  const { css } = useFela()
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
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        className={css(styles.form)}
      >
        <td>
          {viewportWidth >= 700 ? (
            <button
              form='add-match-form'
              type='submit'
              className={css(styles.button) + ' ButtonAsLink'}
              data-testid='match-btn'
            >
              ✔
            </button>
          ) : (
            <CTA
              form='add-match-form'
              type='submit'
              extend={styles.button}
              data-testid='match-btn'
            >
              {isEdit ? 'Edit match' : 'Record match'}
            </CTA>
          )}
        </td>
        <td data-label='Opponent’s health'>
          <VisuallyHidden htmlFor='opponent-health' as='label'>
            Opponent’s health
          </VisuallyHidden>
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
            className={css(styles.field)}
          />
        </td>
        <td data-label='Opponent’s faction'>
          <FactionSelect
            hideLabel
            form='add-match-form'
            name='opponent-faction'
            id='opponent-faction'
            data-testid='opponent-faction'
            withEmpty
            defaultValue={props.opponentFaction}
            className={css(styles.field)}
          />
        </td>
        <td data-label='Match outcome'>
          <Select
            hideLabel
            label='Status'
            id='status'
            required
            form='add-match-form'
            data-testid='outcome'
            value={status}
            onChange={event => setStatus(event.target.value)}
            className={css(styles.field)}
          >
            <option value=''>Set game outcome</option>
            <option value='WON'>Won</option>
            <option value='FORFEIT'>Won by forfeit</option>
            <option value='DRAW'>Draw</option>
            <option value='SURRENDERED'>Forfeited</option>
            <option value='LOST'>Lost</option>
          </Select>
        </td>
        <td>
          <Select
            hideLabel
            label='Victory bonus'
            id='bonus'
            form='add-match-form'
            data-testid='bonus'
            disabled={!['WON', 'FORFEIT'].includes(status)}
            required={['WON', 'FORFEIT'].includes(status)}
            value={bonus}
            onChange={event => setBonus(event.target.value)}
            className={css(styles.field)}
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
          </Select>
        </td>
      </motion.tr>
    </AnimatePresence>
  )
})
