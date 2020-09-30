import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import FAQSection from '../FAQSection'
import Info from '../Info'
import PageMeta from '../PageMeta'
import { Coins, Rubies, Stones } from '../Resource'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import getInitialCardData from '../../helpers/getInitialCardData'
import './index.css'
/*
const Rarity = ({ rarity, amount }) => (
  <>
    <img
      className='ChangelogOctober2020__rarity'
      src={`/assets/images/card/rarity-${rarity}.png`}
      alt=''
    />{' '}
    {amount} {rarity} card{amount === 1 ? '' : 's'}
  </>
)

const Legendary = ({ amount }) => <Rarity rarity='legendary' amount={amount} />
const Epic = ({ amount }) => <Rarity rarity='epic' amount={amount} />
const Rare = ({ amount }) => <Rarity rarity='rare' amount={amount} />
const Common = ({ amount }) => <Rarity rarity='common' amount={amount} />
*/
export default React.memo(function ChangelogOctober2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update 10-2020'
      backLink={{
        to: '/changelog/releases',
        children: 'Back to release notes',
      }}
      meta='2 minutes'
      className='ChangelogOctober2020'
      background='/assets/images/banners/bisanu.png'
      ratio='25%'
    >
      <p>
        The long awaited “Friendly Matches update” from Sheepyard is finally
        here, and it brings a lot of new things on the table. As always, I’m
        feeling very excited and honored to be able to announce the changes in
        exclusivity.
      </p>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#new-cards'>New cards</a>
        </li>
        <li>
          <a href='#balance-changes'>Balance changes</a>
        </li>
        <li>
          <a href='#friendly-matches-settings'>Friendly matches settings</a>
        </li>
        <li>
          <a href='#social-panel'>Social panel</a>
        </li>
        <li>
          <a href='#vanishing-packs'>Vanishing packs</a>
        </li>
        <li>
          <a href='#faq'>FAQ</a>
        </li>
      </ul>

      <Title id='new-cards'>New Cards</Title>

      <p>
        As <Link to='/changelog/07-2020'>announced back in July</Link>, this
        update introduces two new cards aiming at buffing the confusion
        mechanic: <WikiLink id='N78' /> (available as soon as October 1st) and{' '}
        <WikiLink id='N79' /> (which will only be available from October 15th
        onwards).
      </p>

      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N78')} />
      </Article.FullWidth>

      <Row desktopOnly>
        <Column>
          <img
            src='/assets/images/releases/slyboots_pack.png'
            alt='$9.99 pack: 5 copies of Slyboots + 750 coins + 5 fusion stones'
            style={{ marginTop: 0 }}
          />
        </Column>
        <Column>
          <p style={{ marginTop: '1em' }}>
            If you would like to put your hands on this card immediately, a
            $9.99 one-time limited pack grants 5 copies of Slyboots, making it
            possible to get it level 2 right away. It also offers{' '}
            <Coins amount={750} /> and <Stones amount={5} />.
          </p>
        </Column>
      </Row>

      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N79')} />
      </Article.FullWidth>

      <p>
        Additionally, a new card{' '}
        <span className='Highlight'>from a new race</span> makes its entrance:
        Bisanu, an ancient card bringing a whole new mechanic into the landscape
        (which will come out 2 weeks after Excited Mouser).
      </p>

      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N80')} />
      </Article.FullWidth>

      <Title id='balance-changes'>Balance Changes</Title>

      <p>
        Following on Sheepyard’s commitment to tweak some cards on a regular
        basis, this update is no exception and changes 12 cards, mostly to buff
        them.
      </p>

      <ul>
        <li>
          <WikiLink id='I2' />
          ’s ability now affects surrounding structures at level 2 instead of
          bordering only.
        </li>
        <li>
          <WikiLink id='I27' />’ strength is increased by 1 (from 3/4/5/6/7 to
          4/5/6/7/8) but their ability remains the same.
        </li>
        <li>
          <WikiLink id='I28' /> no longer have initial movement (down from 1).
        </li>
        <li>
          <WikiLink id='N25' /> now have 1 movement (up from 0), and their
          ability affect surrounding structures instead of bordering only.
        </li>
        <li>
          <WikiLink id='N36' />’ ability now triggers when having at least 2
          surrounding enemies instead of bordering only.
        </li>
        <li>
          <WikiLink id='N40' /> now grants more strength to the main target
          (from 5/6/6/8/10 to 6/7/7/9/11).
        </li>
        <li>
          <WikiLink id='N49' />’ mana cost is now 6 (down from 7).
        </li>
        <li>
          <WikiLink id='N61' />’ ability now triggers for a surrounding enemy
          instead of bordering only.
        </li>
        <li>
          <WikiLink id='N66' />’ mana cost is now 2 (down from 3) but their
          strength is now 1/2/3/4/5 (down from 3/4/5/6/7).
        </li>
        <li>
          <WikiLink id='N69' />
          ’s ability strength limit is increased by 1 (from 3/4/5/6/7 to
          4/5/6/7/8).
        </li>
        <li>
          <WikiLink id='S15' /> now affects enemy surrounding a friendly unit
          instead of bordering only.
        </li>
        <li>
          <WikiLink id='F4' />
          ’s mana cost is now 2 (up from 1) but deals one more damage (from
          1/2/3/4/5 to 2/3/4/5/6).
        </li>
      </ul>

      <Info icon='heart' title='Nerf compensation'>
        <p>
          Like last time, some compensation in the form of coins and fusion
          stones will be provided to owners of Toxic Sacrifice and Booming
          Professors, proportional to the level and rarity of the card. Find
          below the reimbursement values for each rarity and level
          (coins/stones).
        </p>
        <ul style={{ marginBottom: 0 }}>
          <li>Common card: 0/0, 10/0, 20/1, 50/2, 120/5</li>
          <li>Rare card: 0/0, 15/2, 30/3, 90/7, 190/10</li>
          <li>Epic card: 0/0, 15/2, 40/5, 120/10, 250/20</li>
          <li>Legendary card: 0/1, 20/5, 50/10, 150/20, 300/50</li>
        </ul>
      </Info>

      <Title id='friendly-matches-settings'>Friendly matches settings</Title>

      <p>
        It has been announced and snapshot a few times on Discord over the last
        few weeks so it’s no longer a surprise for many of you: advanced
        friendly matches are coming!
      </p>
      <p>
        When starting a friendly match with an in-game friend, it is now
        possible to:
      </p>
      <ul>
        <li>cap the level of cards (from 1 to 5)</li>
        <li>cap the fortress level (from 1 to 20)</li>
        <li>pick the starting mana (1, 3, 6, 9, 12, 15, 18, 21 or 24)</li>
        <li>
          set up a turn counter (with possibility of ties; see video below)
        </li>
        <li>apply Brawl modifiers</li>
      </ul>

      <p>
        Not all these settings are available to all players. They get unlocked
        as one progresses throughout the game.
      </p>

      <Article.FullWidth>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <img
              src='/assets/images/releases/friendly_matches_2.png'
              alt='A screenshot of the new advanced friendly matches options for a new player'
              style={{ marginTop: 0 }}
            />
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/releases/friendly_matches_3.png'
              alt='A screenshot of the new advanced friendly matches options for a high-level player'
              style={{ marginTop: 0 }}
            />
          </Column>
          <Column width='1/3'>
            <video
              src='/assets/images/releases/draw.mp4'
              muted
              controls
              style={{ marginTop: 0 }}
            ></video>
          </Column>
        </Row>
      </Article.FullWidth>

      <Title id='social-panel'>Social panel</Title>

      <Row desktopOnly wideGutter>
        <Column>
          <p>
            The “social panel” has been hyped a few times on Discord over the
            last few weeks, and is a good testament of Sheepyard’s intents to
            grow the game and its community.
          </p>
          <p>
            It features Discord, Reddit, Stormbound-Kitty (needless to say I’m
            deeply honored to be featured in the game), the Stormbound Wiki (by
            FrozenEarth) and social networks (Facebook, Twitter and Instagram).
          </p>
          <p>
            Connecting with Stormbound on Facebook, Twitter and Instagram will
            grant <Rubies amount={10} /> for each, so <Rubies amount={30} />{' '}
            total. Not bad for just a few taps!
          </p>

          <p className='Highlight'>
            Additionally, there will be many more UI improvements aiming at
            making the game overall better.
          </p>
        </Column>
        <Column>
          <img
            src='/assets/images/releases/social_panel.png'
            alt='New in-game social panel feature Discord, Reddit, Stormbound-Kitty, the wiki and social networks'
            style={{ marginTop: 0 }}
          />
        </Column>
      </Row>

      <Title id='vanishing-packs'>Vanishing Packs</Title>

      <Row desktopOnly wideGutter>
        <Column>
          <img
            src='/assets/images/releases/vanishing_packs.png'
            alt='A screenshot of the new tab dedicated to vanishing packs'
            style={{ marginTop: 0 }}
          />
        </Column>
        <Column>
          <p>
            For those of you who are not against putting a few Real-Life Coins™
            in the game every now and then, you will be pleased to know that
            there are now many more packs called{' '}
            <span className='Highlight'>vanishing packs</span>.
          </p>

          <p>
            Every day, every week, and every month (client local time 9AM), you
            will be offered one random resource pack and one random card pack
            (amongst the existing ones).
          </p>

          <p>
            All daily packs cost $1.99, all weekly packs cost $9.99 and all
            monthly packs cost $29.99. These packs can be bought only once per
            period and are specific to your shop.
          </p>

          <p>
            The exhaustive list of all existing packs will be released at a
            later stage.
          </p>
        </Column>
      </Row>

      {/*<Article.FullWidth padding='0'>
        <Row desktopOnly>
          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Daily resource packs ($1.99):</h3>
            <ul>
              <li>
                <Coins amount={400} />
              </li>
              <li>
                <Rubies amount={45} />
              </li>
              <li>
                <Stones amount={3} />
              </li>
              <li>
                <Coins amount={120} /> and <Rubies amount={30} />
              </li>
              <li>
                <Coins amount={160} /> and <Stones amount={2} />
              </li>
              <li>
                <Coins amount={100} />, <Rubies amount={20} /> and{' '}
                <Stones amount={1} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Weekly resource packs ($9.99):</h3>
            <ul>
              <li>
                <Coins amount={600} /> and <Rubies amount={150} />
              </li>
              <li>
                <Coins amount={800} /> and <Stones amount={10} />
              </li>
              <li>
                <Coins amount={500} />, <Rubies amount={100} /> and{' '}
                <Stones amount={5} />
              </li>
              <li>
                <Stones amount={15} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Monthyl resource packs ($29.99):</h3>
            <ul>
              <li>
                <Coins amount={3500} /> and <Rubies amount={400} />
              </li>
              <li>
                <Coins amount={5000} /> and <Stones amount={20} />
              </li>
              <li>
                <Coins amount={1500} />, <Rubies amount={250} /> and{' '}
                <Stones amount={30} />
              </li>
            </ul>
          </Column>
        </Row>
      </Article.FullWidth>

      <Article.FullWidth padding='0'>
        <Row desktopOnly>
          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Daily card packs ($1.99):</h3>
            <ul>
              <li>
                <Legendary amount={2} />
              </li>
              <li>
                <Epic amount={5} />
              </li>
              <li>
                <Rare amount={9} />
              </li>
              <li>
                <Common amount={18} />
              </li>
              <li>
                <Common amount={7} /> and <Rare amount={6} />
              </li>
              <li>
                <Common amount={2} />, <Rare amount={1} />, <Epic amount={1} />{' '}
                and <Legendary amount={15} />
              </li>
              <li>
                <Common amount={7} /> and <Legendary amount={1} />
              </li>
              <li>
                <Epic amount={2} /> and <Legendary amount={1} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Weekly card packs ($9.99):</h3>
            <ul>
              <li>
                <Common amount={35} /> and <Rare amount={30} />
              </li>
              <li>
                <Epic amount={10} /> and <Legendary amount={5} />
              </li>
              <li>
                <Common amount={10} />, <Rare amount={5} />, <Epic amount={5} />{' '}
                and 5 legendary cards
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Monthly card packs ($29.99):</h3>
            <ul>
              <li>
                <Common amount={105} /> and <Rare amount={90} />
              </li>
              <li>
                <Epic amount={30} /> and <Legendary amount={15} />
              </li>
              <li>
                <Common amount={30} />, <Rare amount={15} />,{' '}
                <Epic amount={15} /> and <Legendary amount={15} />
              </li>
            </ul>
          </Column>
        </Row>
      </Article.FullWidth>*/}

      <FAQSection
        id='faq'
        title='FAQ'
        entries={[
          {
            id: 'release-date',
            question: 'When is the update going to be released?',
            answer:
              'The update should be released on October 1st, after which an immediate force update will be conducted so that all players download the new version from the Google Play Store and the App Store.',
          },
          {
            id: 'new-cards',
            question: 'When will the new cards be available in game?',
            answer: (
              <>
                <WikiLink id='N78' /> will be available as of October 1st,{' '}
                <WikiLink id='N79' /> from October 15th onwards, and{' '}
                <WikiLink id='N80' /> 2 weeks after that.
              </>
            ),
          },
        ]}
      />

      <PageMeta
        title='Update 10-2020'
        description='Discover everything there is to know about the second Sheepyard update!'
        image='/assets/images/banners/factions.png'
      />
    </Article>
  )
})
