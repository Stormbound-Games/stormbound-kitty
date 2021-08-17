import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import HallOfFame from '~/components/CardBuilderHallOfFame'
import { Rubies } from '~/components/Resource'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function CardBuilderContest(props) {
  const { css } = useFela()

  return (
    <>
      <Page
        title='Weekly Card Contest'
        description='All the information to participate and/or vote in the Stormbound weekly card competitions'
        author='TaKo_G'
        action={{ to: '/card', children: 'Card builder' }}
        meta='Discontinued'
        isEditorialContent
      >
        <Page.Narrow>
          <Title>Introduction</Title>

          <p>
            The following is a collection of all of the information to
            participate and/or vote in the weekly card competitions. Would you
            have any questions or{' '}
            <strong className='Highlight'>want to be a judge</strong>, feel free
            to message @TaKo_G#0373 on the{' '}
            <Link href='https://discord.gg/stormbound'>Stormbound Discord</Link>
            .
          </p>
          <p>
            Submissions should be in the form of a link to the{' '}
            <Link to='/card'>card builder</Link> or to an image of your card on
            a hosting service such as imgur. They can be made as soon as the
            week’s theme is announced (typically on Sundays or Mondays) until
            the next Friday at 11:59pm (23:59) CDT. Please note that the cutoff
            time may not be the same in your timezone, so it’s recommended to
            make your submission early.
          </p>
          <p>
            The following day, the judges will decide on the top 3 cards. After
            the top cards of the week are decided, a community vote will open up
            to decide the ultimate winner. Community voting will begin on Sunday
            when the next week’s theme is announced and lasts for 24 hours.
          </p>
          <p>
            The winner will be announced on Monday and will win{' '}
            <Rubies amount={50} />! The other two persons having made the top 3
            will get <Rubies amount={25} /> each.
          </p>

          <Title>Rules</Title>
          <ul className={css(styles.rules)}>
            <li className={css(styles.item)}>
              Card submissions must be made by Friday 11:59 pm (23:59) CDT.
            </li>

            <li className={css(styles.item)}>
              Card submissions must adhere to the weekly theme. Cards that do
              not follow the theme will not be considered for voting, no matter
              how cool they may be.
            </li>

            <li className={css(styles.item)}>
              Card art does not need to be present for submissions, and does not
              need to be original artwork. You are allowed to use any image as
              long as it is appropriate. You know exactly what appropriate
              means.
            </li>

            <li className={css(styles.item)}>
              Cards do not need all of their values filled. If you do not know
              what value would best suit the card, a variable (like ∆) is always
              fine.
            </li>

            <li className={css(styles.item)}>
              Only 1 card may be submitted per person, unless otherwise
              specified by the weekly rules/theme. Submissions{' '}
              <span className='Highlight'>can</span> be edited before the
              deadline by revisiting the google form. A secondary card may be
              submitted alongside the first provided it is a token card created
              by the first (like Qordia’s nests).
            </li>

            <li className={css(styles.item)}>
              Only 1 vote is allowed per person. Participants and
              non-participants are allowed to vote for their favorite card.
            </li>

            <li className={css(styles.item)}>
              When you are getting the link to your card,{' '}
              <span className='Highlight'>
                do not include the stats as text
              </span>
              . Only a URL should be submitted.
            </li>

            <li className={css(styles.item)}>
              Judges are not allowed to compete in the competition and should
              refrain from helping the contestants.
            </li>
          </ul>
        </Page.Narrow>
      </Page>

      <HallOfFame />
    </>
  )
})
