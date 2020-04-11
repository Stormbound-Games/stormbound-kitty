import React, { Fragment } from 'react'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import getNextWeekDay from '../../helpers/getNextWeekDay'
import './index.css'
import getCalendarWeek from '../../helpers/getCalendarWeek'

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

const CardBuilderContestStatus = props => {
  const calendarWeek = getCalendarWeek()
  const contest = WEEKLY_CARD_CONTEST.find(
    contest => contest.week === calendarWeek
  )
  const weekDay = new Date().getDay()
  const isWeekEnd = weekDay === 7 || weekDay === 0

  // If Saturday, Sunday, or Monday before the new contest is announced, display
  // a message to ask the visitor to come back later
  if (isWeekEnd || !contest) {
    return (
      <p className='CardBuilderContestStatus'>
        This week’s contest is now over. Come back on{' '}
        {getNextWeekDay('MONDAY').toLocaleDateString('en', DATE_OPTIONS)} to
        know who won and to discover next week’s contest!
      </p>
    )
  }

  return (
    <Fragment>
      <p className='CardBuilderContestStatus'>
        This week’s theme is{' '}
        <span className='CardBuilderContestStatus__theme'>{contest.name}</span>!
        You have until{' '}
        <span className='CardBuilderContestStatus__date'>
          {getNextWeekDay('FRIDAY', true).toLocaleDateString(
            'en',
            DATE_TIME_OPTIONS
          )}
        </span>{' '}
        CDT to{' '}
        <a href={contest.submitURL} target='_blank' rel='noopener noreferrer'>
          submit your entry
        </a>
        !
      </p>
      {contest.description && (
        <p className='CardBuilderContestStatus CardBuilderContestStatus--info'>
          {contest.description}
        </p>
      )}
    </Fragment>
  )
}

export default CardBuilderContestStatus
