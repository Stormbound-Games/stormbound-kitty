import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import { Coins, Rubies, Stones } from '~/components/Resource'
import ResourceIcon from '~/components/ResourceIcon'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesJuly2021(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early July,
          bringing balance changes, a new card, and some further Brawl
          developments!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#new-brawls'>New Brawls</Link>
          </li>
          <li>
            <Link href='#deck-slots'>Deck slots</Link>
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
            <CardLink id='N78' /> now force the confused unit(s) to move after
            confusing them.
          </li>
          <li>
            <CardLink id='N79' />’ strength is now 5/6/7/9/11 (up from
            3/4/5/6/7), mana is now 5 (up from 3) and their ability now counts
            all friendly units on the board instead of surrounding only.
          </li>
          <li>
            <CardLink id='I1' /> can now inflict damage to friendly structures
            instead of friendly units only.
          </li>
          <li>
            <CardLink id='I29' />
            ’s ability now only destroys the older copy instead of both temples.
          </li>
          <li>
            <CardLink id='W8' />
            ’s ability can now trigger on friendly units as well such as{' '}
            <CardLink id='W31' />.
          </li>
          <li>
            <CardLink id='S3' />
            ’s ability now considers surrounding units (instead of surrounding
            enemies).
          </li>
          <li>
            <CardLink id='S29' /> no longer deals self-damage.
          </li>
        </ul>

        <NerfCompensationInfo ids={['I1', 'S3']} />

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

        <Title id='new-cards'>New card</Title>
        <p>
          A new card is joining the neutral faction, an alternative to{' '}
          <CardLink id='N13' />, which plays on the new “fixedly forward”
          movement that was introduced with <CardLink id='N83' />.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N85')} />
      </Page.Embed>

      <>
        <Spacing bottom='LARGE'>
          <Image
            src='/assets/images/releases/pack_temple_of_the_mind.png'
            alt='Temple of the Mind ($9.99): 10 copies of Eternal Ethereals, 5 fusions stones and 750 coins'
            withAvif
          />
        </Spacing>

        <p>
          As usual, there will be an exclusive pack to quickly get access to
          some copies of the new card, for a week after its release date.
        </p>

        <p>
          It will be available from July 2nd at $9.99, and will grant the
          following :{' '}
        </p>

        <ul>
          <li>
            <ResourceIcon resource='COMMON' /> 10 copies of{' '}
            <CardLink id='N85' />
          </li>
          <li>
            <Stones amount={5} />
          </li>
          <li>
            <Coins amount={750} />
          </li>
        </ul>

        <Title id='new-brawls'>New Brawls</Title>

        <p>
          Following{' '}
          <Link to='/releases/brawl-2021'>
            the revamp of the Brawl from June
          </Link>
          , this release is going to bring 4 new and very unique Brawl
          modifiers.{' '}
        </p>

        <ul>
          <li>
            <Link to='/brawl/pure-amalgamation'>Pure Amalgamation</Link>: Both
            players are forced to play the same deck (at the same levels),
            randomly composed of 6 cards of one player and 6 cards of the other.
            No duplicates, and the strongest card copy is preferred. Say hello
            to <span className='Highlight'>multi-faction decks</span>!
          </li>
          <li>
            <Link to='/brawl/fights-of-threes'>Fights of Threes</Link>: A player
            cannot place more than 3 units on the board. Therefore, this Brawl
            will encourage a careful balance of units, spells and structures to
            be successful.
            <br /> Interestingly, <CardLink id='N2' /> and <CardLink id='N50' />{' '}
            can be played but their tokens immediately get destroyed if there
            are already 3 friendly units on the board.
          </li>
          <li>
            <Link to='/brawl/thin-no-mans-land'>Thin No-Man’s Land</Link>: The
            initial frontline starts on the second row instead of the first and
            cannot fall lower than the second row at any time.
          </li>
          <li>
            <Link to='/brawl/stunning-attack'>Stunning Attack</Link>: Units get
            confused on receiving any damage. This Brawl should be all about
            confusion.
          </li>
        </ul>

        <p>
          To celebrate these new Brawls, the Pure Amalgamation modifier will be
          issued on all difficulty levels on July 1st as a try out. Enjoy it!
        </p>

        <p>
          On the topic of Brawls, the loss counter will be replaced with a heart
          counter instead, in preparation for upcoming features.
        </p>

        <Title id='deck-slots'>Deck slots</Title>

        <p>
          After having considered the community’s opinion on the cost of the new
          deck slots, we decided to significantly reduce it to{' '}
          <Rubies amount={25} />, <Rubies amount={50} /> and{' '}
          <Rubies amount={100} />.
        </p>

        <p>
          In order to make sure no one wasted resources needlessly, players who
          already bought these slots will receive compensation of course.
        </p>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be deployed with the season reset as usual. Temple of the Mind will be available from July 2nd along with its promotional pack (for a week). The new Brawl modifiers will be released in the next few weeks.',
            },
          ]}
        />
      </>
    </>
  )
})
