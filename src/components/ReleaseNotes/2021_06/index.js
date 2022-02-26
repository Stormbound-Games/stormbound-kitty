import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Row from '~/components/Row'
import RewardsTable from '~/components/RewardsTable'
import TableOfContents from '~/components/TableOfContents'
import { Coins, Rubies, Stones } from '~/components/Resource'
import ResourceIcon from '~/components/ResourceIcon'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'
import displayBundle from '~/helpers/displayBundle'
import getCalendarValue from '~/helpers/getCalendarValue'
import rewards from './rewards'

export default React.memo(function ReleaseNotesJune2021(props) {
  const { css } = useFela()
  const [isTableExpanded, expandTable] = React.useState(false)

  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early June,
          bringing balance changes, new cards, some economy changes, bug fixes
          and some exclusive offers as usual!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#victory-coins-update'>Victory coins update</Link>
          </li>
          <li>
            <Link href='#daily-check-in-calendar'>Daily check-in calendar</Link>
          </li>
          <li>
            <Link href='#new-avatars'>New avatars</Link>
          </li>
          <li>
            <Link href='#bug-fixes'>Bug fixes</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated. You can still carry the
            disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any other, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='I5' /> now inflicts 3 self-damage per turn (up from
            2).
          </li>
          <li>
            <CardLink id='F13' />
            ’s strength is now 4/5/5/7/8 (up from 3/4/4/6/7).
          </li>
          <li>
            <CardLink id='N55' />
            ’s mana cost is now 7 (down from 8).
          </li>
          <li>
            <CardLink id='N73' />
            ’s strength is now 3/4/5/6/7 (up from 3/4/4/5/6).
          </li>

          <li>
            <CardLink id='S3' />
            ’s ability is updated as follow:{' '}
            <span className='Highlight'>
              If played with no surrounding enemies, return the copy of this
              card to your hand with +1 strength
            </span>
            . The copy gains 1 strength every time it comes back in hand. If it
            does not, the additional strength is lost and the next draw will
            have the original strength. The base strength is now 1/2/3/4/5 (down
            from 2/3/4/5/6) and the ability is made surrounding.
          </li>
        </ul>

        <NerfCompensationInfo ids={['I5']} />

        <Info icon='bullhorn' title='Card history'>
          <p>
            In case you missed it, the page of every card now lists the changes
            the card went through over the years and provides a handy way to
            visualize former versions of the card, before balance patches
            happened.{' '}
            <CardLink id='S3'>Give it a try with Counselor Ahmi</CardLink> for
            instance!
          </p>
        </Info>

        <Title id='new-cards'>New cards</Title>
        <p>
          Two new cards are joining the neutral faction! First, we have a new
          ancient card with impressive speed.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N84')} />
      </Page.Embed>
      <>
        <p>
          Then, we have rare construct which introduces “fixed movement”.
          Essentially, this means it will not honor the usual attack resolution
          pattern (forwards, inwards, outwards) and will always move straight
          ahead.
        </p>

        <p>
          While it is somewhat similar to self-commanding as of today, it will
          be expanded in the near future into a more unique mechanic.
        </p>
      </>
      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N83')} />
      </Page.Embed>

      <>
        <Info icon='stack' title='Rarity icons'>
          <p>
            As you can see, the rarity icons have been revisited to also reflect
            the level of the card. We hope you like the new gems!
          </p>
        </Info>

        <Row isDesktopOnly extend={{ alignItems: 'center' }}>
          <Row.Column>
            <Image
              src='/assets/images/releases/june_pack_ethereals.png'
              alt='Eternal pack ($9.99): 10 copies of Eternal Ethereals, 5 fusions stones and 750 coins'
              withAvif
            />
            <Image
              src='/assets/images/releases/june_pack_headless.png'
              alt='Eternal pack ($9.99): 5 copies of Headless Hotheads, 5 fusions stones and 750 coins'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <p>
              As usual, there will be exclusive packs to quickly get access to
              some copies of the new cards, for a week after their respective
              release date.
            </p>

            <p>They will each cost $9.99, and will grant the following: </p>

            <ul>
              <li>
                <ResourceIcon resource='COMMON' /> 10 copies of{' '}
                <CardLink id='N84' />
                , <Stones amount={5} /> and <Coins amount={750} /> (from June
                18th).
              </li>
              <li>
                <ResourceIcon resource='RARE' /> 5 copies of{' '}
                <CardLink id='N83' />
                , <Stones amount={5} /> and <Coins amount={750} /> (from June
                4th).
              </li>
            </ul>
          </Row.Column>
        </Row>

        <Title id='victory-coins-update'>Victory coins update</Title>

        <p>
          Victory coins will be increased across the board in ranked matches,
          proportionally to the league of the player.
        </p>

        <ul>
          <li>
            In Starter,{' '}
            <span className={css({ color: 'var(--iron)' })}>Iron</span>,{' '}
            <span className={css({ color: 'var(--bronze)' })}>Bronze</span>,{' '}
            <span className={css({ color: 'var(--silver)' })}>Silver</span> and{' '}
            <span className={css({ color: 'var(--gold)' })}>Gold</span> leagues,
            a victory will yield <Coins amount={10} /> + an additional{' '}
            <Coins amount={10} /> for watching an ad or for having the Premium
            Pass.
          </li>
          <li>
            In{' '}
            <span className={css({ color: 'var(--platinum)' })}>Platinum</span>{' '}
            league, a victory will yield <Coins amount={15} /> + an additional{' '}
            <Coins amount={15} /> for watching an ad or for having the Premium
            Pass.
          </li>
          <li>
            In <span className={css({ color: 'var(--diamond)' })}>Diamond</span>{' '}
            league, a victory will yield <Coins amount={20} /> + an additional{' '}
            <Coins amount={20} /> for watching an ad or for having the Premium
            Pass.
          </li>
          <li>
            In <span className={css({ color: 'var(--heroes)' })}>Heroes</span>{' '}
            league, a victory will yield <Coins amount={25} /> + an additional{' '}
            <Coins amount={25} /> for watching an ad or for having the Premium
            Pass.
          </li>
        </ul>

        <p>Additionally, it is worth noting that:</p>

        <ul>
          <li>
            Victories while playing on Steam will yield the base amount per
            league only since ads cannot be watched on this platform—unless
            there is an active Premium Pass, in which case it’s doubled, just
            like when watching an ad.
          </li>

          <li>
            Victories while playing Brawl will yield <Coins amount={10} /> + an
            additional <Coins amount={10} /> for watching an ad or for having
            the Premium Pass, regardless of the league of the player.
          </li>
        </ul>

        <p>
          To balance out the significant increase in victory coins in higher
          leagues, the monthly chest rewards have been reduced as follow (from
          1st of July onwards):
        </p>

        <ul>
          <li>
            The <span className={css({ color: 'var(--heroes)' })}>Heroes</span>{' '}
            chest now contains <Coins amount={2000} /> (down from 3,000) and{' '}
            <Rubies amount={70} /> (down from 100).
          </li>
          <li>
            The{' '}
            <span className={css({ color: 'var(--diamond)' })}>Diamond</span>{' '}
            chest now contains <Coins amount={1500} /> (down from 1,800). Rubies
            untouched.
          </li>
          <li>The chest for all the other leagues remain untouched.</li>
        </ul>

        <Info icon='equalizer' title='Calculators'>
          <p>
            You will be pleased to know that both the{' '}
            <Link to='/calculators/income'>income calculator</Link>, the{' '}
            <Link to='/calculators/brawl'>Brawl calculator</Link> and the{' '}
            <Link to='/brawl/spell-mana'>Brawl tracker</Link> have been updated
            to reflect these changes.
          </p>
        </Info>

        <Title id='daily-check-in-calendar'>Daily check-in calendar</Title>

        <p>
          The daily check-in and its Premium version continue this month with
          similar rewards to last month’s (minus one day). This is the total
          value for the calendar, free and premium respectively (including free
          rewards within the premium one):{' '}
        </p>

        <ul>
          <li>
            Total free rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'FREE'))}
          </li>
          <li>
            Total Premium (including free) rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'PREMIUM'))}
          </li>
        </ul>

        <RewardsTable rewards={rewards} />

        <p>
          Additionally, the Premium Pass will grand access to all friendly
          matches settings even though they might not be unlocked.
        </p>

        <Title id='new-avatars'>New avatars</Title>

        <p>
          There will be 6 new avatars added to the game: 3 for everyone at{' '}
          <Coins amount={1000} /> a piece, and 3 premium avatars for{' '}
          <Rubies amount={200} />. In case you missed it,{' '}
          <Link to='/fan-kit/avatars'>
            all avatar images are now available in the fan-kit
          </Link>
          —courtesy of Sheepyard.
        </p>

        <Row>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/S16.png'
              alt='Dreadfauns'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/S1.png'
              alt='Doppelbocks'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/N30.png'
              alt='Bluesail Raiders'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/aqua_robot.png'
              alt='Aqua Robot'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/knight.png'
              alt='Knight'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/6'>
            <Image
              src='/assets/images/avatars/draconic_humanoid.png'
              alt='Draconic humanoid'
              withoutWebp
            />
          </Row.Column>
        </Row>

        <Title id='bug-fixes'>Bug fixes</Title>

        <p>
          This release will bring quite a few interesting bug fixes as well:
        </p>

        <ul>
          <li>
            A fix for the infamous{' '}
            <Link to='/guides/known-bugs#three-cards-in-hand'>
              issue with the fourth card missing from the hand
            </Link>
            .
          </li>
          <li>A fix for the bug with upside-down cards in Brawl rewards.</li>
          <li>A fix for the persistent shop notification icon.</li>
          <li>
            A fix for the status effects remaining in place after a frozen unit
            is pushed.
          </li>
          <li>A fix for the incorrect friend filter icons in Steam version.</li>
        </ul>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be deployed with the season reset as usual. Headless Hotheads will be available from June 4th along with its promotional pack (for a week), and Eternal Ethereals will be available from June 18th alongside its promotional pack.',
            },
          ]}
        />
      </>
    </>
  )
})
