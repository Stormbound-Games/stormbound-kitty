import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import HallOfFame from '~/components/CardBuilderHallOfFame'
import { Rubies } from '~/components/Resource'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function PageSWCC(props) {
  const { css } = useFela()

  return (
    <>
      <Page
        title='Weekly Card Contest'
        description='All the information to participate and/or vote in the Stormbound weekly card competitions'
        authors={[
          { name: 'TaKo_G', slug: 'tako_g' },
          { name: 'Grimm', slug: 'grimm' },
        ]}
        action={{ to: '/card', children: 'Card builder' }}
        meta='Ongoing'
        isEditorialContent
      >
        <Page.Narrow>
          <p>
            The following is a collection of all of the information to
            participate and/or vote in the weekly card competitions. Would you
            have any questions or{' '}
            <strong className='Highlight'>want to be a judge</strong>, feel free
            to message @TaKo_G#0373 on the{' '}
            <Link href='https://discord.gg/stormbound'>Stormbound Discord</Link>
            .
          </p>

          <TableOfContents>
            <li>
              <Link href='#disqualification'>Disqualification</Link>
            </li>
            <li>
              <Link href='#submitting-your-card'>Submitting your card</Link>
            </li>
            <li>
              <Link href='#community-voting'>Community voting</Link>
            </li>
            <li>
              <Link href='#rewards'>Rewards</Link>
            </li>
            <li>
              <Link href='#becoming-a-judge'>Becoming a judge</Link>
            </li>
            <li>
              <Link href='#rules'>Rules</Link>
            </li>
            <li>
              <Link href='#hall-of-fame'>Hall of Fame</Link>
            </li>
          </TableOfContents>

          <Title id='disqualification'>Disqualification</Title>

          <p>
            Breaking any of the rules from this page will result in your current
            submission being deemed invalid. If you change your submission by
            revisiting the form, it will once again be considered valid provided
            it doesn’t break any other rule.
          </p>

          <p>
            The ability must be different from the previous one (or the art
            changed if the original was revealed without revealing the ability)
            in order to be considered valid.
          </p>

          <Title>Creating your card</Title>
          <p>
            It is <strong>highly recommended</strong> that you use the{' '}
            <Link to='/card'>card builder</Link> to create your cards, as it
            closely resembles what your card would look like in the game. It
            also allows you to copy and paste a link to the card which is
            required to submit it for the competition.
          </p>

          <p>
            When doing so, please use the “Share card” button. Make sure to
            select “Link only” in the “What to copy” field so it does not
            include the card stats as only the link is needed for the
            submission.
          </p>

          <p>
            If you do not use the card builder to create your submission, you
            can upload your image to a hosting website such as imgur and share
            that link instead.
          </p>

          <Title id='submitting-your-card'>Submitting your card</Title>
          <p>
            Submissions should be in the form of a link to the{' '}
            <Link to='/card'>card builder</Link> or to an image of your card on
            a hosting service such as imgur. The form will not allow submissions
            of other types because they do not always work. If you are
            submitting from your phone: do not copy and paste a link from your
            pictures folder/album, it will not load and you will be disqualified
            unless you update your submission.
          </p>

          <p>
            You are only allowed one submission per week. However, you can edit
            your submission as many times as you like before the cutoff time. If
            you want to update the text, art or stats, you only need to reopen
            the form and it should allow you to edit your submission there.
            Alternatively, you can send a link to your updated card and send it
            to me on Discord (@TaKo_G#0373).
          </p>

          <p>
            Submissions can be made as soon as the week’s theme is announced
            (every Sunday) until Friday at 11:59pm (23:59) CDT. Please note that
            the cutoff time may not be midnight in your timezone, so it’s always
            suggested to make your submission early. I will send a reminder when
            you have 24 hours and 12 hours left to submit. The following day,
            the judges will decide on the top 3 cards of the week.
          </p>

          <Title id='community-voting'>Community voting</Title>

          <p>
            After the top cards of the week are decided, a community vote will
            open up to decide the ultimate winner. Community voting will begin
            on Sunday when the next week’s theme is announced and last for 24
            hours. The winner will be announced on Monday.
          </p>

          <Title id='rewards'>Rewards</Title>
          <p>
            Rewards will be given out to the winners each week (on Monday or
            soon after) as follows:
          </p>
          <ul>
            <li>
              The community-voted ultimate winner will be awarded{' '}
              <Rubies amount={50} />.
            </li>
            <li>
              The runners-up as selected by the judges will be awarded{' '}
              <Rubies amount={25} />.
            </li>
          </ul>

          <Title id='becoming-a-judge'>Becoming a judge</Title>
          <p>
            If you want to be a judge, just message me on Discord
            (@TaKo_G#0373). You’ll be expected to judge several cards at the end
            of the week. If we are full of judges, I can add you to a queue and
            you can judge in the following week.
          </p>

          <Title id='rules'>Rules</Title>
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
              Mixing unit types from different factions <strong>is</strong>{' '}
              allowed. A Swarm frostling or an Ironclad raven are totally
              acceptable.
            </li>

            <li className={css(styles.item)}>
              Card art does not need to be present for submissions, and does not
              need to be original artwork. You are allowed to use any image as
              long as it is appropriate. You know exactly what appropriate
              means.
            </li>

            <li className={css(styles.item)}>
              Only 1 card may be submitted per person, unless otherwise
              specified by the weekly rules/theme. Submissions{' '}
              <span className='Highlight'>can</span> be edited before the
              deadline by revisiting the form.
            </li>

            <li className={css(styles.item)}>
              A secondary card may be submitted alongside the first but it must
              be a token card created by the primary card, the same way Qordia’s
              nests are not collectible cards.
            </li>

            <li className={css(styles.item)}>
              Judges are not allowed to compete in the competition and should
              refrain from helping the contestants with their cards.
            </li>

            <li className={css(styles.item)}>
              Cards do not need all of their values filled. If you do not know
              what value would best suit the card, a variable (like ∆) is always
              fine.
            </li>

            <li className={css(styles.item)}>
              Cards should not be shown to people other than judges until after
              the voting is over. This is to remove bias during the community
              voting round. If you made a custom artwork, please do not share
              that either.
            </li>
          </ul>
        </Page.Narrow>
      </Page>

      <HallOfFame seasons={props.seasons} />
    </>
  )
})
