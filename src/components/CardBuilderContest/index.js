import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../PageMeta'
import Title from '../Title'
import Row from '../Row'
import Column from '../Column'
import HallOfFame from '../CardBuilderHallOfFame'
import ContestStatus from '../CardBuilderContestStatus'
import './index.css'

const CardBuilderContest = props => (
  <Fragment>
    <Title element='h1' className='CardBuilderContest__headline'>
      Weekly Card Contest
    </Title>

    <ContestStatus />

    <Row desktopOnly wideGutter>
      <Column>
        <Title className='CardBuilderContest__title'>Introduction</Title>

        <p>
          The following is a collection of all of the information to participate
          and/or vote in the weekly card competitions. Would you have any
          questions or{' '}
          <strong style={{ color: 'var(--beige)' }}>want to be a judge</strong>,
          feel free to message @Taco_G_#0373 on the{' '}
          <a
            href='https://discord.gg/stormbound'
            target='_blank'
            rel='noopener noreferrer'
          >
            Stormbound Discord
          </a>
          .
        </p>
        <p>
          Submissions should be in the form of a link to the{' '}
          <Link to='/card'>card builder</Link> or to an image of your card on a
          hosting service such as imgur.
        </p>
        <p>
          Submissions can be made as soon as the week’s theme is announced
          (typically on Mondays) until the next Friday at 11:59pm (23:59) CDT.
          Please note that the cutoff time may not be the same in your timezone,
          so it’s recommended to make your submission early.
        </p>
        <p>
          The following day, the judges will decide on their top 3-5 cards
          (depending on the amount of entries). The results will be made
          available Saturday and voting will commence immediately. Voting will
          last until Sunday at 11:59pm (23:59) CDT and will be held on
          strawpoll. The winner will be announced along with the theme for the
          next competition as one post, beginning the cycle once more.
        </p>
      </Column>

      <Column>
        <Title className='CardBuilderContest__title'>Rules</Title>
        <ul className='CardBuilderContest__rules'>
          <li>Card submissions must be made by Friday 11:59 pm (23:59) CDT.</li>

          <li>
            Card submissions must adhere to the weekly theme. Cards that do not
            follow the theme will not be considered for voting, no matter how
            cool they may be.
          </li>

          <li>
            Cards do not need all of their values filled. If you do not know
            what value would best suit the card, a variable (like ∆) is always
            fine.
          </li>

          <li>
            Card art does not need to be present for submissions, and does not
            need to be original artwork. You are allowed to use any image as
            long as it is appropriate. You know exactly what appropriate means.
          </li>

          <li>
            Only 1 card may be submitted per person, unless otherwise specified
            by the weekly rules/theme. Submissions can be edited before the
            deadline by revisiting the google form.
          </li>

          <li>
            Cards MUST be kept secret from others, including judges and
            non-participants until the submission period has ended.
          </li>

          <li>
            Only 1 vote is allowed per person. Participants and non-participants
            are allowed to vote for their favorite card.
          </li>

          <li>Judges are not allowed to compete in the competition.</li>
        </ul>
      </Column>
    </Row>

    <HallOfFame />

    <PageMeta
      title='Weekly Card Contest'
      description='All the information to participate and/or vote in the Stormbound weekly card competitions.'
    />
  </Fragment>
)

export default CardBuilderContest
