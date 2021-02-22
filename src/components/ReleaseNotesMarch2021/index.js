import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import CheapenedBrawl from '../CheapenedBrawl'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  HeroCrowns,
  Rubies,
  Stones,
} from '../Resource'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'
import { getRarityColor } from '../../helpers/getRarity'

export default React.memo(function ReleaseNotesMarch2021(props) {
  return (
    <ReleaseNotes id='03_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          March, bringing balance changes, new cards, new avatars, some UI
          improvements, some exclusive offers as usual and most importantly, the
          Heroes League!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-cards'>New cards</a>
          </li>
          <li>
            <a href='#new-books'>New books</a>
          </li>
          <li>
            <a href='#heroes-league'>Heroes League</a>
          </li>
          <li>
            <a href='#cheapened-brawl'>Cheapened Brawl</a>
          </li>
          <li>
            <a href='#ui-improvements'>UI improvements</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please wear a mask and avoid
            unnecessary travels—especially if you live in an area with rampant
            COVID-19 cases. It takes everyone’s effort to slow down this
            pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any others, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='I3' />
            ’s mana cost is now 3 on all levels (up from 2).
          </li>
          <li>
            <CardLink id='F28' level={5} />’ strength is now 12 at level 5 (down
            from 13) and its ability drains 2 at level 5 (down from 3).
          </li>
          <li>
            <CardLink id='N23' />
            ’s mana cost is now 3 on all levels (up from 2).
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-cards'>New cards</Title>

        <p>
          On February 26th, the next temple card will be released—Temple of
          Space, a new{' '}
          <span style={{ color: getRarityColor('legendary', 'bright') }}>
            legendary
          </span>{' '}
          Ironclad structure with an interesting teleportation mechanic (the
          background is slightly different in game, being special for legendary
          structures).
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('I29')} />
      </Article.Embed>

      <Article.Narrow>
        <p>
          On March 19th, the very first common dragon card will be
          introduced—Flameless Lizards.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N82')} />
      </Article.Embed>

      <Article.Narrow>
        <p>
          As usual, two exclusive packs will be available for 7 days starting
          from their respective release date:
        </p>
        <ul>
          <li>
            The Flameless Lizards pack ($9.99): 10 copies of{' '}
            <CardLink id='N82' />, as well as <Stones amount={5} /> and{' '}
            <Coins amount={750} />.
          </li>
          <li>
            The Temple of Space pack ($9.99): 1 copy of <CardLink id='I29' />,
            as well as <Stones amount={5} /> and <Coins amount={750} />.
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Row.Column>
            <Image
              src='/assets/images/releases/flameless_lizards_pack.png'
              alt='Exclusive pack ($9.99): 10 copies of Flameless Lizards, 5 fusion stones and 750 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/temple_of_space_pack.png'
              alt='Exclusive pack ($9.99): 1 copy of Temple of Space, 5 fusion stones and 750 coins'
            />
          </Row.Column>
        </Row>
        <Title id='new-books'>New books</Title>

        <Row desktopOnly wideGutter>
          <Row.Column width='1/5'>
            <Image
              src='/assets/images/books/book-pirate.png'
              alt='Pirate Tome'
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src='/assets/images/books/book-feline.png'
              alt='Feline Tome'
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image src='/assets/images/books/book-elder.png' alt='Elder Tome' />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src='/assets/images/books/book-dragon.png'
              alt='Dragon Tome'
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src='/assets/images/books/book-legendary-dragon.png'
              alt='Legendary Dragon Tome'
            />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <p>
          Five new books will make their entrance in the next update: a Pirate
          tome, a Feline tome, and Elder tome, a Dragon tome, all containing 3
          cards of a specific type and worth <Rubies amount={60} /> as well as a
          Legendary Dragon tome with 3 dragon cards worth{' '}
          <Rubies amount={120} />.
        </p>

        <ul>
          <li>
            <span className='Highlight'>Elder tome</span>: 3 cards, with rarity
            distribution of 0/60/35/5.
          </li>
          <li>
            <span className='Highlight'>Feline tome</span>: 3 cards, with rarity
            distribution of 50/30/15/5.
          </li>
          <li>
            <span className='Highlight'>Pirate tome</span>: 3 cards, with rarity
            distribution of 55/25/15/5.
          </li>
          <li>
            <span className='Highlight'>Dragon tome</span>: 3 cards, with rarity
            distribution of 20/60/20/0.
          </li>
          <li>
            <span className='Highlight'>Legendary Dragon tome</span>: 3 cards,
            with rarity distribution of 0/0/70/30.
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Image
          src='/assets/images/wallpapers/lite/wp-d-8.png'
          alt='Showcase of all books in the game'
        />
      </Article.Embed>

      <Article.Narrow>
        <Title id='heroes-league'>Heroes League</Title>

        <p>
          March will introduce a brand new league: the{' '}
          <span className='Highlight'>Heroes League</span>! It is an additional
          league after Diamond which can be reached on a monthly basis by
          passing beyond Diamond 1.
        </p>

        <img
          src='/assets/images/releases/rank_hero.png'
          alt='Heroes League badge'
          style={{ maxWidth: '300px', margin: '3em auto' }}
        />

        <p>
          This league does not have the same ranking system as the
          others—instead it has a scoring ladder. Players move along that ladder
          based on the amount of <span className='Highlight'>Hero Crowns</span>{' '}
          they own, also known as their{' '}
          <span className='Highlight'>Hero Score</span> (HS for short). Owning{' '}
          <HeroCrowns amount={1500} /> is the same as having a Hero Score of
          1500. These are gained and lost after each ranked game performed in
          Diamond and the Heroes League (see formula below).
        </p>

        <p>
          When entering the Diamond league, every player is granted{' '}
          <HeroCrowns amount={1000} /> to start with. As they progress through
          Diamond, they already collect (or loose) Hero Crowns (see calculations
          below). When finally passing Diamond 1 and entering the Heroes League,
          the amount of Hero Crowns collected represents the current Hero
          Score—provided it is above 1000. If the Diamond progress was difficult
          and a player was to enter Heroes League with less than{' '}
          <HeroCrowns amount={1000} />, their score would be set to 1000.
        </p>

        <img
          src='/assets/images/releases/chest_hero.png'
          alt='Heroes League chest'
          style={{ maxWidth: '300px', margin: '3em auto' }}
        />

        <p>
          At the end of the season, players having reached the Heroes League
          will be down-ranked back to Diamond 5, their Hero Score will be reset,
          and they will receive a Heroes League chest containing:
        </p>
        <ul>
          <li>
            <Common amount={20} /> (+6 from Diamond)
          </li>
          <li>
            <Rare amount={16} /> (+4 from Diamond)
          </li>
          <li>
            <Epic amount={8} /> (+2 from Diamond)
          </li>
          <li>
            <Legendary amount={3} /> (+1 from Diamond)
          </li>
          <li>
            <Coins amount={3000} /> (+1200 from Diamond)
          </li>
          <li>
            <Rubies amount={100} /> (+50 from Diamond)
          </li>
        </ul>
        <p>
          Players within the top 500 of the ladder will gain additional rewards
          as follow:
        </p>

        <ul>
          <li>
            The 1st player in the ladder will earn a Mythic tome, one Elder tome
            and one Legendary Dragon tome (worth <Rubies amount={260} /> total).
          </li>
          <li>
            The 9 other players in the top 10 will earn a Mythic tome and a
            Feline tome (worth <Rubies amount={140} /> total).
          </li>
          <li>
            The 90 other players in the top 100 will earn a Heroic tome and a
            Dragon tome (worth <Rubies amount={100} /> total).
          </li>
          <li>
            The 400 other players in the top 500 will earn a Pirate tome (worth{' '}
            <Rubies amount={60} /> total).
          </li>
        </ul>

        <Info icon='equalizer' title='Income Calculator'>
          <p>
            This is your friendly reminder that we have a nice{' '}
            <Link to='/calculators/income'>income calculator</Link> to figure
            out how many resources you make across a given time frame. It has
            been updated with this release’s changes already!
          </p>
        </Info>

        <hr />

        <p>
          The formula used to update a player A’s Hero Score (<var>S</var>) is a
          variation of the{' '}
          <a
            href='https://en.wikipedia.org/wiki/Elo_rating_system'
            target='_blank'
            rel='noopener noreferrer'
          >
            Elo rating system
          </a>{' '}
          used in chess, amongst other games. It looks like this:
        </p>

        <img
          src='/assets/images/releases/hero_score_formula.png'
          alt='Hero Score computing formula'
        />

        <p>Here are the terms:</p>

        <ul style={{ marginBottom: '3em' }}>
          <li>
            <var className='Highlight'>
              S'<sub>A</sub>
            </var>{' '}
            is the new Hero Score
          </li>
          <li>
            <var className='Highlight'>
              S<sub>A</sub>
            </var>{' '}
            is the current Hero Score
          </li>
          <li>
            <var className='Highlight'>K</var> is the coefficient factor
            (sometimes named “K-factor” in elo rating systems) and works like in
            FIDE:
            <ul style={{ marginBottom: 0 }}>
              <li>
                K = 40 for new players until they have played 30 matches in
                Diamond
              </li>
              <li>K = 20 for players rated below 2400</li>
              <li>
                K = 10 for players who ever reached 2400, regardless of their
                current Hero Score
              </li>
            </ul>
          </li>
          <li>
            <var className='Highlight'>W</var> is either 1 in case of a win, 0
            for a loss
          </li>
          <li>
            <var className='Highlight'>
              S<sub>B</sub>
            </var>{' '}
            is the opponent’s score; the difference between{' '}
            <var className='Highlight'>
              S<sub>A</sub>
            </var>{' '}
            and{' '}
            <var className='Highlight'>
              S<sub>B</sub>
            </var>{' '}
            is capped to 400 to avoid causing too much fluctuations in case of
            uneven matchmaking
          </li>
        </ul>

        <Info icon='equalizer' title='Hero Score Calculator'>
          <p>
            To calculate your new expected Hero Score from the aforementionned
            variables, be sure to use the{' '}
            <Link to='/calculators/hero'>Hero Score calculator</Link>.
          </p>
        </Info>

        <CheapenedBrawl ratio={(1 / 3) * 2}>
          <p>
            To apologise for the server issues during the last discounted Brawl,
            we decided to make the Brawl starting on February 25th cheaper as
            well: all matches will cost two thirds of their original price!
          </p>
        </CheapenedBrawl>

        <Title id='ui-improvements'>UI improvements</Title>

        <Row desktopOnly wideGutter>
          <Row.Column>
            <Image
              src='/assets/images/releases/add_a_friend.png'
              alt='Button to add battled player as a friend on the outcome screen of a game'
            />
          </Row.Column>
          <Row.Column style={{ justifyContent: 'center' }}>
            <p style={{ marginTop: '2em' }}>
              This release will bring some quality of life and interface
              improvements, starting with a way to add the player you just
              battled as a friend!
            </p>

            <p>
              There will also be a dozen new avatars costing{' '}
              <Coins amount={1000} /> featuring cards from the game as well as
              14 new exclusive premium avatars which can be unlocked for{' '}
              <Rubies amount={200} /> each!
            </p>

            <p>
              The release will also introduce a lot of small UI tweaks here and
              there, as well as many bugfixes, including the infamous{' '}
              <Link to='/guides/known-bugs#tegor-ever-lasting-skull'>
                Tegor death bug
              </Link>
              .
            </p>
          </Row.Column>
        </Row>
      </Article.Narrow>

      <Article.Narrow>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'Temple of Space will be released on February 26th, and Flameless Lizards on March 19th.',
            },
            {
              id: 'diamond-and-heroes',
              question: 'Can I be in both Diamond and Heroes?',
              answer:
                'No, you are either in the Diamond league or in the Heroes league, but never both. However, when you are in Diamond, you already collect Hero Crowns but your score is not taken into consideration on the Heroes league leaderboard.',
            },
            {
              id: 'platinum-and-heroes',
              question:
                'Can I start increasing my Hero Score while in Platinum?',
              answer:
                'No, amongst all regular leagues, only the Diamond one takes the Hero Score into consideration.',
            },
            {
              id: 'crowns-count',
              question: 'How can I check how many crowns I have?',
              answer:
                'When you are in Diamond, you can already see your score in the Heroes League leaderboard, only it is marked with an info icon (?) that says you do not belong to this leaderboard yet.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
