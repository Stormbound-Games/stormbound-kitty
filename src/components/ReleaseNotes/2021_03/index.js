import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import FAQSection from '~/components/FAQSection'
import HorizontalRule from '~/components/HorizontalRule'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Row from '~/components/Row'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  HeroCrowns,
  Rubies,
  Stones,
} from '~/components/Resource'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getBookName from '~/helpers/getBookName'
import getInitialCardData from '~/helpers/getInitialCardData'
import { BOOKS } from '~/constants/books'

export default React.memo(function ReleaseNotesMarch2021(props) {
  const { css } = useFela()

  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          March, bringing balance changes, new cards, new avatars, some UI
          improvements, some exclusive offers as usual and most importantly, the
          Heroes League!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#new-books'>New books</Link>
          </li>
          <li>
            <Link href='#heroes-league'>Heroes League</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#ui-improvements'>UI improvements</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please wear a mask and avoid
            unnecessary travels—especially if you live in an area with rampant
            COVID-19 cases. It takes everyone’s effort to slow down this
            pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any other, brings some balance changes.</p>

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
          <span className={css({ color: 'var(--legendary)' })}>legendary</span>{' '}
          Ironclad structure with an interesting teleportation mechanic.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('I29')} />
      </Page.Embed>

      <>
        <p>
          On March 19th, the very first common dragon card will be
          introduced—Flameless Lizards.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N82')} />
      </Page.Embed>

      <>
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
      </>

      <Page.Embed>
        <Row isDesktopOnly>
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

        <Row isDesktopOnly>
          <Row.Column width='1/5'>
            <Image
              src={BOOKS.PIRATE.image + '?auto=format&w=250'}
              alt={getBookName('PIRATE')}
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src={BOOKS.FELINE.image + '?auto=format&w=250'}
              alt={getBookName('FELINE')}
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src={BOOKS.ELDER.image + '?auto=format&w=250'}
              alt={getBookName('ELDER')}
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src={BOOKS.DRAGON.image + '?auto=format&w=250'}
              alt={getBookName('DRAGON')}
            />
          </Row.Column>
          <Row.Column width='1/5'>
            <Image
              src={BOOKS.ARCHDRAGON.image + '?auto=format&w=250'}
              alt={getBookName('ARCHDRAGON')}
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <p>
          Five new books will make their entrance in the next update: a Pirate
          book, a Feline book, an Elder book and a Dragon book, each containing
          3 cards of a specific type and costing <Rubies amount={60} /> as well
          as an Archdragon book with 3 dragon cards costing{' '}
          <Rubies amount={120} />.
        </p>

        <ul>
          <li>
            <span className='Highlight'>{getBookName('PIRATE')}</span>: 3 cards,
            with rarity distribution of 55/25/15/5.
          </li>
          <li>
            <span className='Highlight'>{getBookName('FELINE')}</span>: 3 cards,
            with rarity distribution of 50/30/15/5.
          </li>
          <li>
            <span className='Highlight'>{getBookName('ELDER')}</span>: 3 cards,
            with rarity distribution of 0/60/35/5.
          </li>
          <li>
            <span className='Highlight'>{getBookName('DRAGON')}</span>: 3 cards,
            with rarity distribution of 20/60/20/0.
          </li>
          <li>
            <span className='Highlight'>{getBookName('ARCHDRAGON')}</span>: 3
            cards, with rarity distribution of 0/0/70/30.
          </li>
        </ul>

        <Info icon='equalizer' title='Book Calculator'>
          <p>
            If you are curious about your odds of finding a specific card or
            type of card when opening books, remember that we have a handy{' '}
            <Link to='/calculators/books'>book calculator</Link>. It’s also
            available on Discord through the <code>!bookodds</code> command.
          </p>
        </Info>
      </>

      <Page.Embed>
        <Image
          src='https://cdn.sanity.io/images/5hlpazgd/production/176767c10756b7944310d408273d3c58dc610b0b-1920x617.png?&auto=format&w=1200'
          alt='Showcase of all books in the game'
        />
      </Page.Embed>

      <>
        <Title id='heroes-league'>Heroes League</Title>

        <p>
          March will introduce a brand new league: the{' '}
          <span className='Highlight'>Heroes League</span>! It is an additional
          league after Diamond which can be reached on a monthly basis by
          passing beyond Diamond 1.
        </p>

        <Spacing vertical='LARGER'>
          <Image
            src='/assets/images/releases/rank_hero.png'
            alt='Heroes League badge'
            extend={css({ maxWidth: '300px', margin: 'auto' })}
            withoutWebp
          />
        </Spacing>

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
          Diamond, they already collect (or lose) Hero Crowns (see calculations
          below). When finally passing Diamond 1 and entering the Heroes League,
          the amount of Hero Crowns collected represents the current Hero
          Score—provided it is above 1000. If the Diamond progress was difficult
          and a player was to enter Heroes League with less than{' '}
          <HeroCrowns amount={1000} />, their score would be set to 1000.
        </p>

        <Image
          src='/assets/images/releases/chest_hero.png'
          alt='Heroes League chest'
          extend={{ maxWidth: '300px', margin: 'var(--s-larger) auto' }}
          withoutWebp
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
            The 1st player in the ladder will earn <Stones amount={100} />, a
            Book of Archdragons, a Book of Felines, a Book of Dragons and a Book
            of Pirates.
          </li>
          <li>
            The 9 other players in the top 10 will earn <Stones amount={50} />,
            a Book of Felines, a Book of Dragons and a Book of Pirates.
          </li>
          <li>
            The 90 other players in the top 100 will earn <Stones amount={25} />
            , a Book of Dragons and a Book of Pirates.
          </li>
          <li>
            The 400 other players in the top 500 will earn{' '}
            <Stones amount={10} /> and a Book of Pirates.
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

        <HorizontalRule />

        <p>
          The formula used to update a player A’s Hero Score (<var>S</var>) is a
          variation of the{' '}
          <Link href='https://en.wikipedia.org/wiki/Elo_rating_system'>
            Elo rating system
          </Link>{' '}
          used in chess, amongst other games. It looks like this:
        </p>

        <Image
          src='/assets/images/formulas/hero.png'
          alt='Hero Score computing formula'
          width={702}
          height={90}
          withoutWebp
          lazy
        />

        <p>Here are the terms:</p>

        <Spacing bottom='LARGER'>
          <ul>
            <li>
              <var className='Highlight'>
                S’<sub>A</sub>
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
              (sometimes named “K-factor” in Elo rating systems) and works like
              in FIDE:
              <ul className={css({ marginBottom: 0 })}>
                <li>
                  K = 40 for new players until they have played 30 matches in
                  Diamond or Heroes league
                </li>
                <li>K = 20 for players rated below 2400</li>
                <li>
                  K = 10 for players who ever reached 2400 during the current
                  season, regardless of their current Hero Score
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
        </Spacing>

        <Info icon='equalizer' title='Hero Score Calculator'>
          <p>
            To calculate your new expected Hero Score from the aforementionned
            variables, be sure to use the{' '}
            <Link to='/calculators/hero'>Hero Score calculator</Link>.
          </p>
        </Info>

        <CheapenedBrawl ratio={(1 / 3) * 2} difficulty='LEGACY'>
          <p>
            To apologize for the server issues during the last discounted Brawl,
            we decided to make the Brawl starting on February 25th cheaper as
            well: all matches will cost two thirds of their original price!
          </p>
        </CheapenedBrawl>

        <Title id='ui-improvements'>UI improvements</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/add_a_friend.png'
              alt='Button to add battled player as a friend on the outcome screen of a game'
            />
          </Row.Column>
          <Row.Column extend={{ justifyContent: 'center' }}>
            <Spacing top='LARGE'>
              <p>
                This release will bring some quality of life and interface
                improvements, starting with a way to add the player you just
                battled as a friend!
              </p>
            </Spacing>

            <p>
              There will also be a dozen new avatars costing{' '}
              <Coins amount={1000} /> featuring cards from the game as well as
              14 new exclusive premium avatars which can be unlocked for{' '}
              <Rubies amount={200} /> each!
            </p>

            <p>
              One thing to note is that already claimed first-time rewards (for
              achieving a new rank) will no longer show up on the reward list
              next to the rank.
            </p>

            <p>
              The release will also introduce a lot of other small UI tweaks
              here and there, as well as many bugfixes.
            </p>
          </Row.Column>
        </Row>
      </>

      <>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'Temple of Space will be released on February 26th, and Flameless Lizards on March 19th. The Heroes League will be available from March onwards.',
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
              question: 'How can I check how many Hero Crowns I have?',
              answer:
                'When you are in Diamond, you can already see your score in the Heroes League leaderboard, only it is marked with an info icon (?) that says you do not belong to this leaderboard yet.',
            },
            {
              id: 'daily-check-in-calendar',
              question:
                'Is the daily check-in calendar going to continue in March?',
              answer:
                'Yes, the daily check-in calendar will continue in March, and can be boosted to Premium for $5 like previous months. The rewards are not finalised yet, but they will be similar to the ones from January and February.',
            },
          ]}
        />
      </>
    </>
  )
})
