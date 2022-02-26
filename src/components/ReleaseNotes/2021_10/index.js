import React from 'react'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import { Coins, Rubies, Stones } from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesOctober2021(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          October, bringing balance changes, new ancient cards, some generous
          offers and new Brawl modifiers!
        </p>

        <p>
          Before we begin, let’s take a short moment to remember that the
          development team is currently quite fragmented due to well-deserved
          holidays in September, hence the releases being a little superficial.
          It will pick up some steam in October again to deliver new exciting
          content soon!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#brawl-modifiers'>Brawl modifiers</Link>
          </li>
          <li>
            <Link href='#halloween-event'>Halloween event</Link>
          </li>
          <li>
            <Link href='#vanishing-packs-bonus-system'>
              Vanishing packs bonus system
            </Link>
          </li>
          <li>
            <Link href='#new-avatars'>New avatars</Link>
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

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N41' />’ spawn’s strength is now 3/4/5/6/7 (up from
            3/3/4/5/6).
          </li>
          <li>
            <CardLink id='N73' />
            ’s ability now deals 3/3/4/4/5 damage (up from 2/2/3/3/4).
          </li>
          <li>
            <CardLink id='N65' />’ strength-based ability is now +2 (up from
            +1).
          </li>
          <li>
            <CardLink id='N33' />’ ability now always draws 4 cards (up from 3
            at level 1 to 3).
          </li>
          <li>
            <CardLink id='F22' />’ mana cost is now 6 (down from 7) and the
            strength threshold of its ability is now 7/9/11/14/17 (down from
            8/10/12/15/18).
          </li>
          <li>
            <CardLink id='I18' />
            ’s damage is now 4/5/6/7/8 (up from 3/4/5/6/7).
          </li>
        </ul>

        <Title id='new-cards'>New cards</Title>

        <p>
          On October 4th, four new neutral ancient cards will be released, with
          some interesting mechanics that trigger{' '}
          <span className='Highlight'>before moving</span>, like for{' '}
          <CardLink id='N80' />. You can find some clarifications around the
          mechanics in the <Link to='#faq'>FAQ</Link> at the end of these
          release notes.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N87')} />
        <CardBuilderCardDisplay {...getInitialCardData('N88')} />
        <CardBuilderCardDisplay {...getInitialCardData('N89')} />
        <CardBuilderCardDisplay {...getInitialCardData('N90')} />
      </Page.Embed>

      <>
        <Spacing top='LARGEST'>
          <p>
            As usual, there will be 4 exclusive packs to collect early copies of
            the new Ancient cards. They all cost $9.99 and bring 5 copies of the
            given card + <Coins amount={750} />. They will be available at the
            pace of one per week throughout October.
          </p>
        </Spacing>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack_bounded_daemons.png'
              alt='Bounded Daemons pack: 5 copies of Bounded Daemons + 750 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack_lost_psyches.png'
              alt='Lost Psyches pack: 5 copies of Lost Psyches + 750 coins'
            />
          </Row.Column>
        </Row>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack_erratic_neglects.png'
              alt='Erratic Neglects pack: 5 copies of Erratic Neglects + 750 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack_fragmented_essences.png'
              alt='Fragmented Essences pack: 5 copies of Fragmented Essences + 750 coins'
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <p>
          And if you would like some copies of all of the new Ancient cards and
          some fusion stones, you could consider the $19.99 exclusive pack
          granting 3 copies of each card + <Stones amount={10} /> and{' '}
          <Coins amount={1000} />.
        </p>

        <Image
          src='/assets/images/releases/pack_ancients.png'
          alt='4 ancients card pack: 3 copies of Fragmented Essences, 3 copies of Erratic Neglects, 3 copies of Lost Psyches, 3 copies of Bounded Daemons, 10 Fusion Stones and 1000 coins'
        />

        <Title id='cheapened-brawl'>Cheapened Brawl</Title>
        <p>
          Similar to previous events, the Brawl starting on October 28th (and
          only that one) is going to be cheaper. All fights will be 50% off.
          Owners of the Premium Pass will also have their usual discount
          applied, leading to a 60% reduction.
        </p>
        <CheapenedBrawl ratio={0.5} />

        <Title id='brawl-modifiers'>Brawl modifiers</Title>

        <p>
          There will be 4 new Brawl modifiers coming in October to keep things
          fresh. Most of the modifiers have been there for ages, and y’all know
          which decks to play in and out. We hope bringing more modifiers will
          keep the Brawl entertaining and rewarding!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Reserve Management:</span> any unused
            mana point is carried over to the next turn. There is no such thing
            as wasted mana anymore.
          </li>
          <li>
            <span className='Highlight'>Chaos Unleashed:</span> units get a
            random status effect (silence, freeze, poison, confusion, or
            vitality) when played.
          </li>
          <li>
            <span className='Highlight'>Steady Growth:</span> cards level up (up
            to level 5) when cycled. They can also be leveled up beyond the
            Casual/Warrior level cap!
          </li>
          <li>
            <span className='Highlight'>The Great Mill:</span> playing any card
            instantly draws another one. Mana is the true limit.
          </li>
        </ul>

        <p>
          As soon as one of these new modifier shows up, it will be available in
          friendly mode so you can practice with your friends.
        </p>

        <Info icon='sword' title='Deck dry-runner'>
          <p>
            <span className='Highlight'>Reserve Management</span>,{' '}
            <span className='Highlight'>Steady Growth</span> and{' '}
            <span className='Highlight'>The Great Mill</span> have all been
            implemented in the deck dry-runner. So you can already try them out
            with your favourite decks to see how it feels like!
          </p>
        </Info>

        <Title id='halloween-event'>Halloween event</Title>

        <p>
          To celebrate Halloween, there will be a small gift of{' '}
          <Rubies amount={30} /> for anyone logging into the game prior October
          31st.
        </p>

        <p>
          The Trick or Treat big bundle of sweets will also be available between
          October 4th and October 10th. It will yield{' '}
          <span className='Highlight'>6 Mythic Tomes</span>,{' '}
          <span className='Highlight'>6 Heroic Tomes</span>, and{' '}
          <span className='Highlight'>6 Classic Tomes</span> for $29.99.
        </p>

        <Image
          src='/assets/images/releases/halloween_bundle.png'
          alt='Trick or Treat bundle: 6 Mythic Tomes, 6 Heroic Tomes, 6 Classic Tomes'
        />

        <p>
          In addition, all coins and rubies purchases in the shop will yield 20%
          extra resources between October 25th and November 14th. Might be a
          good time to put a few bucks into the game if you were considering it!
        </p>

        <p>
          There will be some special weekly and monthly vanishing packs
          available throughout the month of November.
        </p>

        <Title id='vanishing-packs-bonus-system'>
          Vanishing packs bonus system
        </Title>

        <Row isDesktopOnly>
          <Row.Column>
            <p>
              To make spending a few bucks here and there into vanishing packs
              more rewarding, we are introducing a system where every vanishing
              pack purchase grants you collectible points.
            </p>

            <ul>
              <li>
                Buying a <span className='Highlight'>daily</span> vanishing pack
                yields <span className='Highlight'>1 point</span>.
              </li>
              <li>
                Buying a <span className='Highlight'>weekly</span> vanishing
                pack yields <span className='Highlight'>2 points</span>.
              </li>
              <li>
                Buying a <span className='Highlight'>monthly</span> vanishing
                pack yields <span className='Highlight'>3 points</span>.
              </li>
            </ul>

            <p>
              These points are used to reach 3 different milestones which yield
              additional resources. Once the third milestone has been claimed,
              all 3 milestones will get reset in the next month so they can
              eventually be collected again.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/vanishing_packs.png'
              alt='A screenshot of the new tab dedicated to vanishing packs'
              extend={{ marginTop: 0 }}
            />
          </Row.Column>
        </Row>

        <ul>
          <li>
            Milestone 1 requires 5 points and yields <Coins amount={1000} />.
          </li>
          <li>
            Milestone 2 requires 10 points in total (including the previous
            milestone) and yields <Rubies amount={200} />.
          </li>
          <li>
            Milestone 3 requires 15 points in total (including the previous
            milestones) and yields <Stones amount={50} />.
          </li>
        </ul>

        <p>
          As an example, if you collect 6 points in October, you get to collect
          the reward for the first milestone. When November comes, nothing will
          get reset: you will still have 6 points, and there will still be 2
          milestones to reach. If in November you get 15 points in total, you’ll
          collect the remaining 2 milestones. Then in December, your points will
          get back to 0, and the milestones will be available for collection
          again once you have enough points.
        </p>

        <p>
          An update made to vanishing packs is also that they are no longer
          limited to a single purchase for a given period (daily, weekly,
          monthly). That limit has been increased 3. So a vanishing pack can be
          bought 3 times per day/week/month.
        </p>

        <Title id='new-avatars'>New avatars</Title>

        <p>
          There will be three new premium avatars introduced in October, for{' '}
          <Rubies amount={200} /> a piece as usual. They are all somewhat
          gender-neutral: an officer, an elf and some sort of a druid. They have
          been added to the <Link to='/fan-kit/avatars'>fan-kit</Link>.
        </p>

        <Row>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/avatars/officer.png'
              alt='Officer'
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image src='/assets/images/avatars/elf.png' alt='Elf' withoutWebp />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/avatars/druidess.png'
              alt='Druidess'
              withoutWebp
            />
          </Row.Column>
        </Row>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: (
                <>
                  The balance changes will be deployed with the season reset as
                  usual. The availability of packs will be spread throughout the
                  month, one Ancient pack a week.
                </>
              ),
            },
            {
              id: 'fragmented-essences',
              question: 'How does Fragmented Essences’ split work?',
              answer: (
                <>
                  <p>
                    What happens depends on whether there is 0, 1 or 2 available
                    cells on its sides:
                  </p>
                  <ul>
                    <li>
                      If both side cells are available, Fragmented Essences
                      split their strength (randomly if odd) into two copies,
                      and then both move forward (but not split until next
                      turn), leaving the center tile empty.
                    </li>
                    <li>
                      If only one side cell is available, Fragmented Essences
                      splits half their strength (rounded down) there, and the
                      copy moves forward (but not split until next turn).
                    </li>
                    <li>
                      If no side cell are available or Fragmented Essences have
                      only 1 strength, nothing happens and they just move
                      forward without splitting.
                    </li>
                  </ul>
                  <p>
                    Note that the fragments are{' '}
                    <span className='Highlight'>not</span> tokens though—they
                    also are Fragmented Essences. So they will also split and
                    spawn before they move next.
                  </p>
                  <p>
                    Status effects such as poison and vitality are preserved on
                    the fragments. So if the base unit is poisoned, fragments
                    will also be poisoned.
                  </p>
                </>
              ),
            },
            {
              id: 'bounded-daemons',
              question: 'Are Bounded Daemons another Dreadfauns?',
              answer: (
                <>
                  Not really. Bounded Daemons will spawn every time it moves (or
                  rather, just before) while Dreadfauns only spawns on play.
                  Additionally, Bounded Daemons only spawns on lateral sides,
                  not in front or in the back, so it can move right away.
                </>
              ),
            },
            {
              id: 'lost-psyches',
              question:
                'Can Lost Psyches teleport on the tile they are already on?',
              answer: (
                <>
                  Yes. They can pick their own tile as a teleport target and
                  teleport there.
                </>
              ),
            },
            {
              id: 'erratic-neglects',
              question:
                'What qualifies as a status effect for Erratic Neglects?',
              answer: (
                <>
                  Frozen, confused, vitalized, poisoned or silenced. Same list
                  as for the new Chaos Unleashed Brawl modifier. Note that an
                  already applied status effect cannot be rolled again. So if
                  Erratic Neglects are already poisoned, they cannot roll poison
                  again before moving—only the other status effects.
                </>
              ),
            },
          ]}
        />
      </>
    </>
  )
})
