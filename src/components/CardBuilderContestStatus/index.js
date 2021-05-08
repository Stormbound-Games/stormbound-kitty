import React from 'react'
import getCalendarWeek from '../../helpers/getCalendarWeek'
import { getNextWeekDay } from '../../helpers/getWeekDay'
import swcc from '../../data/swcc'
import './index.css'

const DATE_OPTIONS = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}

const DATE_TIME_OPTIONS = {
  ...DATE_OPTIONS,
  hour: 'numeric',
  minute: 'numeric',
}

export default React.memo(function CardBuilderContestStatus(props) {
  const calendarWeek = getCalendarWeek()
  const contest = swcc.find(
    contest => contest.season === 2 && contest.week === calendarWeek
  )
  const weekDay = new Date().getDay()
  const isWeekEnd = weekDay === 7 || weekDay === 0

  // If Saturday, Sunday, or Monday before the new contest is announced, display
  // a message to ask the visitor to come back later
  if (isWeekEnd || !contest) {
    return (
      <p className='CardBuilderContestStatus'>
        This week’s contest is now over. Come back on{' '}
        {getNextWeekDay('SUNDAY').toLocaleDateString('en', DATE_OPTIONS)} to
        know who won and to discover next week’s contest!
      </p>
    )
  }

  return (
    <>
      <p className='CardBuilderContestStatus'>
        This week’s theme is{' '}
        <span className='CardBuilderContestStatus__theme'>{contest.name}</span>!
        You have until{' '}
        <span className='CardBuilderContestStatus__date'>
          {getNextWeekDay('FRIDAY', { endOfDay: true }).toLocaleDateString(
            'en',
            DATE_TIME_OPTIONS
          )}
        </span>{' '}
        CDT to{' '}
        <a
          href='https://forms.gle/oHWRj45WoJc2q8ps5'
          target='_blank'
          rel='noopener noreferrer'
        >
          submit your entry
        </a>
        !
      </p>
      {contest.description && (
        <p className='CardBuilderContestStatus CardBuilderContestStatus--info'>
          {contest.description}
        </p>
      )}
    </>
  )
})
