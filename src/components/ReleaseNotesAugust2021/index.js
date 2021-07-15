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
            <a href='#brawl-bonuses'>Brawl bonuses</a>
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
            <CardLink id='W22' /> now trigger their ability before attacking a
            unit, regardless of its position (instead of only in front).
          </li>
          <li>
            <CardLink id='W29' />
            ’s ability now considers all friendly units (instead of surrounding
            only), but affects less units at all levels (from 2/3/4/5/6 to
            1/2/2/3/3).
          </li>
          <li>
            <CardLink id='N80' />’ ability now triggers before moving instead of
            on play and their strength has been increased by 1 (from 3/4/5/6/7
            to 4/5/6/7/8).
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
        </ul>

        <p>
          Quite uniquely, <CardLink id='N77' /> owners will be compensated with
          the usual rewards despite the card being reworked and overall buffed.
        </p>

        <NerfCompensationInfo title='Compensation' ids={['N77']} />

        <Title id='brawl-bonuses'>Brawl bonuses</Title>
        <p>
          The “hearts” counter has arguably worsen the Brawl experience for
          players. This is because it should have been part of a broader update
          around the Brawl progression system, which has been split in half
          (regrettably so). The second part of that new system will be
          introduced in August in the form of Brawl winning bonuses.
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
              The idea is that after <span className='Highlight'>every</span>{' '}
              victory in Brawl, the player will be offered one of two random
              bonuses, amongst a set of 9 different possible bonuses (see the
              complete list below). Some of them will provide resources while
              some will improve the player’s livelihood in Brawl by redeeming
              and refilling hearts.
            </p>
            <p>
              A player begins a Brawl tier with 3 full green hearts (just like
              it is right now). When losing a match, a heart gets emptied (red).
              If all hearts are empty, then the player’s crowns get reset to the
              beginning of the current milestone. Many of the bonuses will help
              the player not getting to that point though.
            </p>
          </Row.Column>
          <Row.Column>
            <img
              style={{ marginTop: 0 }}
              src='/assets/images/releases/brawl_bonuses_choice.jpg'
              alt=''
            />
          </Row.Column>
        </Row>

        <CardsContainer>
          <div className='ReleaseNotesAugust2021__cards'>
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
            <Image
              src='/assets/images/iconography/brawl_FORTRESS_LEVEL.png'
              alt='Fortress level bonus'
              className='ReleaseNotesAugust2021__card'
            />
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
          </div>
        </CardsContainer>

        <p>Here is the breakdown of every victory bonus:</p>

        <ul>
          <li>
            <span className='Highlight'>Resources bonuses:</span> Picking these
            bonuses will immediately grant the player a certain amount of
            resources, varying based on the Brawl difficulty.
          </li>
          <li>
            <span className='Highlight'>Fortress bonus:</span> Picking this
            bonus will increase the Fortress Level of the player by 1 within the
            current Brawl difficulty and only for Brawl matches. It will not
            increase the Fortress Level beyond the cap for that Brawl. This
            bonus cannot be drawn if already capped.
          </li>
          <li>
            <span className='Highlight'>Life/Lives Up bonuses:</span> Picking
            these bonuses will refill a heart (or all hearts), giving the player
            extra chances to climb the milestones without being reset to the
            start of the current milestone. These bonuses cannot be found if all
            hearts are currently full.
          </li>
          <li>
            <span className='Highlight'>Iron heart bonus:</span> Picking this
            bonus will grant the player an extra heart (up to 5 at most), which
            begins empty. Once filled (via a life up bonus), it grants the
            player an extra life. If emptied again, that heart gets removed
            entirely as it is not permanent. This bonus cannot be found if there
            are already 5 hearts.
          </li>
          <li>
            <span className='Highlight'>Gold solidify bonus:</span> Picking this
            bonus will solidify an iron heart so it becomes permanent. It does
            not change the heart status: if empty, it stays empty; if full, it
            stays full. It just makes it permanent so the heart no longer
            disappears after being emptied. From there on, the heart behaves
            like the 3 starting ones. This bonus cannot be found if there is no
            iron heart.
          </li>
          <li>
            <span className='Highlight'>Ice armor bonus:</span> Picking this
            bonus will apply an ice armor to a full heart, which protects it
            from being emptied for one loss. After a loss, the ice armor gets
            removed. This bonus cannot be found in there are no full unprotected
            hearts.
          </li>
        </ul>

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
