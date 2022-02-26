import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import { Coins, Crowns, Rubies, Stones, Legendary } from '~/components/Resource'
import ResourceIcon from '~/components/ResourceIcon'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'
import useViewportSize from '~/hooks/useViewportSize'
import { BOOKS } from '~/constants/books'
import styles from './styles'

export default React.memo(function ReleaseNotesAugust2021(props) {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()
  const CardsContainer = viewportWidth >= 700 ? PageEmbed : React.Fragment

  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          August, bringing balance changes, a new card, and some further Brawl
          developments!
        </p>

        <TableOfContents>
          <li>
            <Link href='#hotfix-coming'>(Update) Hotfix coming</Link>
          </li>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#brawl-bonuses'>Brawl bonuses</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#books-update'>Books update</Link>
          </li>
          <li>
            <Link href='#daily-check-in-redeeming'>
              Daily check-in redeeming
            </Link>
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

        <Title id='hotfix-coming'>(Update) Hotfix coming</Title>

        <p>
          A small hotfix version is coming at the end of the first week of
          August to fix a few things from this release that were not caught
          during beta testing. Namely:
        </p>

        <ul>
          <li>
            A fix for the visual glitch with Temple of Time. Only one of the
            units/structures affected by Temple of Time’s ability would show the
            corresponding particle effect.
          </li>
          <li>
            A fix for the visual glitch where losing a match with two extra
            slots—one filled and one not—would display both of them as lost
            during the loss animation sequence (returning to Brawl selection
            screen would display the correct heart state again).
          </li>
          <li>
            A fix for the visual glitch where playing Queen of Herds with satyrs
            stolen by Rogue Sheep or Harvester of Souls would display incorrect
            card during ability animation.
          </li>
          <li>
            A fix for Rogue Sheep’s inability to copy spell cards from the
            opponent’s hand.
          </li>
        </ul>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any other, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='W29' />
            ’s ability now considers all friendly units (instead of surrounding
            only), but affects less units at all levels (from 2/3/4/5/6 to
            1/2/2/3/3). It also attemps to spawn a 1-strength copy of itself on
            the tile behind, like a tree expanding its roots. Additionally, its
            strength has been decreased by 1 (from 3/4/5/6/7 to 2/3/4/5/6).
          </li>

          <li>
            <CardLink id='N85' />
            ’s ability still triggers at the start of the turn but now grants
            (or removes if already present) fixedly forward movement to the
            leftmost unit in the hand, then destroys the weakest confused unit
            on the board.
          </li>

          <li>
            <CardLink id='S21' />’ strength is now 8/10/12/12/14 (up from
            6/8/10/10/12).
          </li>

          <li>
            <CardLink id='F20' />’ strength is now 5/6/7/8/10 (up from
            3/4/5/6/8).
          </li>

          <li>
            <CardLink id='N77' /> now costs 4 mana (down from 6) and its
            strength is now 3/4/5/6/7 (up from 2/3/4/5/7). Additionally, its
            ability is reworked from scratch and activates on play instead of on
            death. It now draws up to 1/1/2/2/3 card copies from the enemy’s
            hand, and reduces the mana cost of these copies by 1. Card copies
            can be cycled like normal cards but they are single-use. They do not
            go back into the deck once they’ve been played once.
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

        <p>
          Another temple card will come early August, the Temple of Time! As its
          name might suggest, it plays with the flow of the game, restoring
          friendly units and structures to the state from the previous turn.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('F29')} />
      </Page.Embed>

      <>
        <p>
          As usual, there will be an exclusive pack to quickly get access to the
          new card, for a week after its release date. To celebrate Sheepyard’s
          first anniversary taking care of the game, there will also be a
          Sheepyard Pack available, as well as a Rogue Sheep pack.
        </p>

        <PageEmbed>
          <Row isDesktopOnly>
            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_sheepyard.png'
                alt='Sheepyard pack ($9.99): 1 random legendary card, 50 fusion stones, 100 rubies and 500 coins'
                withAvif
              />

              <p>
                It will be available between July 29th and August 1st at $9.99,
                and will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 random legendary card
                </li>
                <li>
                  <Coins amount={500} />
                </li>
                <li>
                  <Rubies amount={100} />
                </li>
                <li>
                  <Stones amount={50} />
                </li>
              </ul>
            </Row.Column>
            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_rogue_sheep.png'
                alt='Rogue Sheep pack ($9.99): 1 copy of Rogue Sheep, 5 fusion stones, 750 coins'
                withAvif
                style={{ transform: 'scale(1.03) translateY(-3%)' }}
              />

              <p>
                It will be available for a week from August 1st at $9.99, and
                will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 copy of{' '}
                  <CardLink id='N77' />
                </li>
                <li>
                  <Stones amount={5} />
                </li>
                <li>
                  <Coins amount={750} />
                </li>
              </ul>
            </Row.Column>

            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_temple_of_time.png'
                alt='Temple of Time ($9.99): 1 copy of Temple of Time, 5 fusion stones and 750 coins'
                withAvif
                style={{ transform: 'scale(1.07)' }}
              />
              <p>
                It will be available for a week from August 15th at $9.99, and
                will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 copy of{' '}
                  <CardLink id='F29' />
                </li>
                <li>
                  <Stones amount={5} />
                </li>
                <li>
                  <Coins amount={750} />
                </li>
              </ul>
            </Row.Column>
          </Row>
        </PageEmbed>

        <Title id='brawl-bonuses'>Brawl bonuses</Title>

        <p>
          The second part of the new heart system will be introduced in late
          July in the form of Brawl winning bonuses.
        </p>

        <Row isDesktopOnly>
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
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/brawl_bonuses_choice.jpg'
              alt='Choice between 2 bonuses after a victory in Brawl'
            />
          </Row.Column>
        </Row>

        <Info icon='crown' title='Crowns for milestone 2'>
          <p>
            The amount of <ResourceIcon resource='CROWNS' /> crowns to reach the
            second milestone of any of the 3 Brawls is now <Crowns amount={7} />{' '}
            instead of <Crowns amount={10} />.
          </p>
        </Info>

        <CardsContainer>
          <div className={css(styles.cards)}>
            <Image
              src='/assets/images/iconography/brawl_LIFE_UP.png'
              alt='Life up bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_ALL_LIVES_UP.png'
              alt='All lives up'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_RUSTY_SLOT.png'
              alt='Rusty slot bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_GOLD_SLOT.png'
              alt='Gold slot bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_ICE_ARMOR.png'
              alt='Ice armor bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_FORTRESS_LEVEL.png'
              alt='Fortress level bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_COINS.png'
              alt='Coins bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_RUBIES.png'
              alt='Rubies bonus'
              extend={styles.card}
            />
            <Image
              src='/assets/images/iconography/brawl_FUSION_STONES.png'
              alt='Fusion stones bonus'
              extend={styles.card}
            />
          </div>
        </CardsContainer>

        <p>Here is the breakdown of every victory bonus:</p>

        <h3>Life/Lives Up bonuses</h3>
        <p>
          Picking these bonuses will refill a heart (or all hearts), giving the
          player extra chances to climb the milestones without being reset to
          the start of the current milestone.
        </p>
        <p>These bonuses can only be found if there are hearts to refill.</p>

        <h3>Rusty Slot</h3>
        <p>
          Picking this bonus will grant the player an extra heart slot (up to 5
          heart slots in total). This heart needs to be refilled with a
          life/lives up before it can withstand a loss. Once the player loses a
          life from this slot, the slots destroys itself.
        </p>
        <p>
          Rusty slots also get destroyed on milestone reset (but not on
          milestone progress).
        </p>

        <h3>Slot Solidify</h3>
        <p>
          Picking this bonus will make one of the player’s rusty slots
          indestructible. From there on, it behaves like one of three default
          slots: it can withstand multiple losses (and get refilled multiple
          times), and never gets destroyed.
        </p>
        <p>
          This bonus can only be found if the player has a rusty heart slot.
        </p>

        <h3>Ice Armor</h3>
        <p>
          Picking this bonus will give an Ice Armor to the first full heart
          (from the left). After a loss, the Ice Armor gets destroyed while
          keeping the heart beneath it intact.
        </p>
        <p>Ice Armors also get destroyed upon milestone progress.</p>

        <h3>Fortress Up bonus</h3>
        <p>
          Picking this bonus will increase the Fortress Level of the player by 1
          within the current Brawl difficulty and only for Brawl matches. It
          will not increase the Fortress Level beyond the cap for that Brawl.
          This bonus cannot be drawn if already capped.
        </p>

        <h3>Resources bonuses</h3>
        <p>
          Picking these bonuses will immediately grant the player a certain
          amount of resources, varying based on the Brawl difficulty and
          milestone.
        </p>

        <ul>
          <li>
            The Coins bonus can be obtained from the very first milestone
            onwards. Its rewards can go up to <Coins amount={100} /> in Casual,{' '}
            <Coins amount={250} /> in Warrior and <Coins amount={500} /> in
            Ultimate.
          </li>
          <li>
            The Rubies bonus can be obtained from milestone 3 onwards and can go
            up to <Rubies amount={25} /> in Casual, <Rubies amount={50} /> in
            Warrior and <Rubies amount={100} /> in Ultimate.
          </li>
          <li>
            The Fusion Stones can be obtained from milestone 5 onwards and bonus
            can go up to <Stones amount={3} /> in Casual, <Stones amount={10} />{' '}
            in Warrior and <Stones amount={25} /> in Ultimate.
          </li>
        </ul>

        <Info icon='hammer' title='Brawl tracker'>
          <p>
            The <Link to='/brawl'>Brawl tracker</Link> has been updated to take
            these bonuses into account. You can now record which bonus you
            picked with every victory, and the loss counter will reflect that.
          </p>
        </Info>

        <CheapenedBrawl ratio={0.9}>
          <p>
            Similar to previous events, the Brawl starting on July 29th (and
            only that one) is going to be cheaper. All fights will be 10% off.
            Owners of the Premium Pass will also have their usual discount
            applied, leading to a 20% reduction.
          </p>

          <Info icon='gift' title='Compensation'>
            <p>
              Additionally, to apologize for the recent sub-par experience with
              the Brawl, every player logging at least once into the game before
              the end of 29th of July will be rewarded with{' '}
              <Coins amount={500} />.
            </p>
          </Info>
        </CheapenedBrawl>

        <Title id='books-update'>Books update</Title>

        <p>
          Four new books will be introduced, all available to buy with rubies as
          usual. We hope they help players sharpening their collection!
        </p>

        <ul>
          <li>
            The new <span className='Highlight'>Book of Magic</span> costs{' '}
            <Rubies amount={40} /> and contains 3 spells with rarity odds being
            50/30/20/0.
          </li>
          <li>
            The new <span className='Highlight'>Book of Structures</span> costs{' '}
            <Rubies amount={40} /> and contains 3 structures with rarity odds
            being 50/30/15/5.
          </li>
          <li>
            The new <span className='Highlight'>Book of Chaos</span> costs{' '}
            <Rubies amount={50} /> and contains 3 cards with the word “random”
            (or its localized equivalent) in their ability with rarity odds
            being 25/25/25/25.
          </li>
          <li>
            The new <span className='Highlight'>Book of Legends</span> costs{' '}
            <Rubies amount={120} /> and contains <Legendary amount={3} />.
          </li>
        </ul>

        <Row>
          <Row.Column width='1/4'>
            <Image
              src={BOOKS.MAGIC.image + '?auto=format&w=300'}
              alt='Book of Magic'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src={BOOKS.STRUCTURE.image + '?auto=format&w=300'}
              alt='Book of Structures'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src={BOOKS.CHAOS.image + '?auto=format&w=300'}
              alt='Book of Chaos'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src={BOOKS.LEGENDS.image + '?auto=format&w=300'}
              alt='Book of Legends'
            />
          </Row.Column>
        </Row>

        <p>
          On top of that, some existing books will be updated to be more
          interesting:
        </p>

        <ul>
          <li>
            The <span className='Highlight'>Book of Archdragons</span> now costs{' '}
            <Rubies amount={90} /> (down from <Rubies amount={120} />
            ).
          </li>
          <li>
            The <span className='Highlight'>Book of Dragons</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 20/60/15/5 (improved from 20/60/20/0).
          </li>
          <li>
            The <span className='Highlight'>Book of Elders</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 0/60/35/5 (improved from 0/67/30/3).
          </li>
          <li>
            The <span className='Highlight'>Book of Pirates</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 50/30/15/5 (improved from 55/25/15/5).
          </li>
          <li>
            The <span className='Highlight'>Book of Felines</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />
            ).
          </li>
        </ul>

        <Title id='daily-check-in-redeeming'>Daily check-in redeeming</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <p>
              We are introducing a way to redeem some skipped days from the
              daily check-in calendar for both Premium and non-Premium users.
              Every day, you’ll be able to redeem a skipped day reward by
              watching an ad.
            </p>
            <p>
              We hope this will help players with a more sporadic involvement
              with the game to still get all the rewards they need to progress.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0 }}
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
              answer: (
                <>
                  The balance changes will be deployed with the season reset as
                  usual along with the compensation for Rogue Sheep. The changes
                  to the Brawl will come live on the 29th of July, with the
                  10%-discounted Brawl. Temple of Time will be available from
                  August 15th along with its promotional pack (for a week).
                </>
              ),
            },
            {
              id: 'card-copies',
              question: 'What are Rogue Sheep’s card copies?',
              answer: (
                <>
                  “Card copies” (when used during a match) are single-use copies
                  of cards produced by <CardLink id='N77' /> (and potentially
                  some future other cards). They are{' '}
                  <span className='Highlight'>not</span> stolen cards as the
                  opponent does not lose these cards, even temporarily. They are
                  copies. They can be cycled as many times as desired, but get
                  destroyed once played.
                </>
              ),
            },
            {
              id: 'copy-counselor-ahmi',
              question:
                'What happens if Rogue Sheep produces a card copy of Counselor Ahmi?',
              answer: (
                <>
                  It works the way you would expect it to. The card copy would
                  have the current strength of the opponent’s Counselor Ahmi’s
                  card. The ability of the card copy of <CardLink id='S3' />{' '}
                  would work just fine (although it would come back in hand
                  costing 2 mana, not 3). But if it’s played in a way that the
                  card would not come back in the hand, then the card copy is
                  destroyed.
                </>
              ),
            },
            {
              id: 'copy-archdruid-eary',
              question:
                'What happens if Rogue Sheep produces a card copy of Archdruid Earyn?',
              answer: (
                <>
                  The card copy of <CardLink id='N48' /> would not be able to
                  play spells costing 7 mana, since its ability is based on the
                  mana cost of the card, which would be 6 for the card copy.
                </>
              ),
            },
            {
              id: 'copy-tokens',
              question:
                'What happens if Rogue Sheep produces a card copy of 0-mana token?',
              answer: (
                <>
                  The card copy would cost 0 mana as well. There is no such
                  thing as negative mana cost.
                </>
              ),
            },
            {
              id: 'copy-copies',
              question:
                'What happens if Rogue Sheep produces a card copy of another card copy?',
              answer: (
                <>
                  The new card copy would cost 1 mana less than the card it
                  copied, so 2 mana (or more if this process happens several
                  times) less than the original card cost. With a minimum of 0
                  of course.
                </>
              ),
            },
            {
              id: 'copy-queen-of-herds',
              question:
                'What happens if Queen of Herds or Archdruid Earyn randomly plays a card copy?',
              answer: (
                <>
                  That card copy would be destroyed, just as if it was played
                  normally.
                </>
              ),
            },
          ]}
        />
      </>
    </>
  )
})
