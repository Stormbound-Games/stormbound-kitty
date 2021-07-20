import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import FAQSection from '../FAQSection'
import Guide from '../Guide'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, Rubies, Stones } from '../Resource'
import ResourceIcon from '../ResourceIcon'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'
import useViewportSize from '../../hooks/useViewportSize'
import './index.css'

export default React.memo(function ReleaseNotesAugust2021(props) {
  const { viewportWidth } = useViewportSize()
  const CardsContainer = viewportWidth >= 700 ? Guide.FullWidth : React.Fragment

  return (
    <ReleaseNotes id='08_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          August, bringing balance changes, a new card, and some further Brawl
          developments!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-card'>New card</a>
          </li>
          <li>
            <a href='#brawl-bonuses'>Brawl bonuses</a>
          </li>
          <li>
            <a href='#daily-check-in-redeeming'>Daily check-in redeeming</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

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
            <CardLink id='W29' />
            ’s ability now considers all friendly units (instead of surrounding
            only), but affects less units at all levels (from 2/3/4/5/6 to
            1/2/2/3/3). It also attemps to spawn a 1-strength copy of itself on
            the tile behind, like a tree expanding its roots. Additionally, its
            strength has been decreased by 1 (from 2/3/4/5/6 to 1/2/3/4/5).
          </li>

          <li>
            <CardLink id='N85' />
            ’s ability no longer kills friendly confused units. Instead, once
            per turn, manually dropping a unit on the structure itself (like
            dropping a unit on a free tile) will grant it fixedly forward, then
            the weakest confused unit takes 1/2/3/4/5 damage. Its strength has
            also been adjusted to 2/3/4/5/6 (from 2/3/5/6/7).
          </li>

          <li>
            <CardLink id='N77' />
            ’s ability is reworked from scratch. It now draws up to 1/1/2/2/3
            card(s) from the enemy’s hand, and reduce their mana cost by 1.
          </li>

          <li>
            <CardLink id='S21' />’ strength is now 8/10/12/12/14 (up from
            6/8/10/10/12).
          </li>

          <li>
            <CardLink id='F20' />’ strength is now 5/6/7/8/10 (up from
            3/4/5/6/8).
          </li>
        </ul>

        <p>
          Quite uniquely, <CardLink id='N77' /> owners will be compensated with
          the usual rewards despite the card being reworked and overall buffed.
          We decided to do so because you’re effectively “losing” a card you
          might have invested your resources in.
        </p>

        <NerfCompensationInfo title='Compensation' ids={['N77']} />

        <Title id='new-card'>New card</Title>

        <p>Another temple card will come early August, the Temple of Time!</p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('F29')} />
      </Article.Embed>

      <Article.Narrow>
        <Image
          src='/assets/images/releases/pack_temple_of_time.png'
          alt='Temple of Time ($9.99): 1 copy of Temple of Time, 5 fusions stones and 750 coins'
          withAvif
        />

        <p>
          As usual, there will be an exclusive pack to quickly get access to the
          new card, for a week after its release date.
        </p>

        <p>
          It will be available from August 2nd at $9.99, and will grant the
          following :{' '}
        </p>

        <ul>
          <li>
            <ResourceIcon resource='COMMON' /> 1 copy of <CardLink id='F29' />
          </li>
          <li>
            <Stones amount={5} />
          </li>
          <li>
            <Coins amount={750} />
          </li>
        </ul>

        <Title id='brawl-bonuses'>Brawl bonuses</Title>

        <p>
          The second part of the new heart system will be introduced in late
          July in the form of Brawl winning bonuses.
        </p>

        <Info icon='gift' title='Compensation'>
          <p>
            To apologize for the recent sub-par experience with the Brawl, every
            player logging into the game before the 29th of July will be
            rewarded with <Coins amount={500} />. Additionally, the Brawl
            starting on July 29th will be discounted 10% for everyone, and 20%
            for Premium Pass holders.
          </p>
        </Info>

        <Row desktopOnly>
          <Row.Column>
            <p>
              The idea is that after{' '}
              <span className='Highlight'>every victory</span> in Brawl, the
              player will be offered one of two random bonuses, amongst a set of
              9 different possible bonuses (see the complete list below). Some
              of them will provide resources while some will improve the
              player’s livelihood in Brawl by redeeming and refilling hearts.
            </p>
            <p>
              A player begins a Brawl adventure in the selected tier with 3 full
              green hearts (just like it is right now). When losing a match, a
              player loses one heart (it gets emptied and red). If all hearts
              are lost, then the player’s crowns get reset to the beginning of
              the current milestone.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              style={{ marginTop: 0 }}
              src='/assets/images/releases/brawl_bonuses_choice.jpg'
              alt=''
            />
          </Row.Column>
        </Row>

        <CardsContainer>
          <div className='ReleaseNotesAugust2021__cards'>
            <Image
              src='/assets/images/iconography/brawl_LIFE_UP.png'
              alt='Life up bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_ALL_LIVES_UP.png'
              alt='All lives up'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_IRON_SLOT.png'
              alt='Iron slot bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_GOLD_SLOT.png'
              alt='Gold slot bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_ICE_ARMOR.png'
              alt='Ice armor bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_FORTRESS_LEVEL.png'
              alt='Fortress level bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_COINS.png'
              alt='Coins bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_RUBIES.png'
              alt='Rubies bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_FUSION_STONES.png'
              alt='Fusion stones bonus'
              className='ReleaseNotesAugust2021__card'
            />
          </div>
        </CardsContainer>

        <p>Here is the breakdown of every victory bonus:</p>

        <ul>
          <li>
            <span className='Highlight'>Resources bonuses:</span> Picking these
            bonuses will immediately grant the player a certain amount of
            resources, varying based on the Brawl difficulty and milestone.
          </li>
          <li>
            <span className='Highlight'>Fortress Up bonus:</span> Picking this
            bonus will increase the Fortress Level of the player by 1 within the
            current Brawl difficulty and only for Brawl matches. It will not
            increase the Fortress Level beyond the cap for that Brawl. This
            bonus cannot be drawn if already capped.
          </li>
          <li>
            <span className='Highlight'>Life/Lives Up bonuses:</span> Picking
            these bonuses will refill a heart (or all hearts), giving the player
            extra chances to climb the milestones without being reset to the
            start of the current milestone.
          </li>
          <li>
            <span className='Highlight'>Iron Slot:</span> Picking this bonus
            will grant the player an extra heart slot (up to 5 heart slots in
            total). Once the player loses a life from this slot, the slots
            destroys itself. It also destroys itself on milestone reset.
          </li>
          <li>
            <span className='Highlight'>Solidify:</span> Picking this bonus will
            make one of the player’s hearts indestructible. From there on, it
            behaves like one of three default slots.
          </li>
          <li>
            <span className='Highlight'>Ice Armor:</span> Picking this bonus
            will give an Ice Armor to the first full heart from the left. After
            a loss, the Ice Armor gets destroyed while keeping the heart beneath
            it intact.
          </li>
        </ul>

        <Title id='daily-check-in-redeeming'>Daily check-in redeeming</Title>

        <Row desktopOnly wideGutter>
          <Row.Column>
            <p>
              We are introducing a way to redeem some skipped days from the
              daily check-in calendar for non-Premium users. Every day, you’ll
              be able to redeem a skipped day reward by watching an ad.
            </p>
            <p>
              We hope this will help players with a more sporadic involvement
              with the game to still get all the rewards they need to progress.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              style={{ marginTop: 0 }}
              src='/assets/images/releases/check_in_redeem.jpg'
              alt='Dialog window inviting the user to redeem a day from the daily check-in calendar or buy the Premium Pass'
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
              answer:
                'The balance changes will be deployed with the season reset as usual. Temple of the Mind will be available from July 2nd along with its promotional pack (for a week). The new Brawl modifiers will be released in the next few weeks.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
