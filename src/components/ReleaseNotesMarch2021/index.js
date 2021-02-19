import React from 'react'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import EloCalculator from '../EloCalculator'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, EloCrowns, Rubies, Stones } from '../Resource'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesMarch2021(props) {
  return (
    <ReleaseNotes id='03_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          March, bringing balance changes, new cards, new avatars, some UI
          improvements, some exclusive offers as usual and most important, the
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
            ’s ability now grants 1/2/3/4/5 strength (down from 2/3/4/5/6).
          </li>
          <li>
            <CardLink id='F28' />’ strength is now 4/5/7/9/12 (down from
            5/6/8/10/13).
          </li>
          <li>
            <CardLink id='N23' />
            ’s mana cost is now 3 on all levels (up from 2).
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-cards'>New cards</Title>

        <p>
          On February 26th will be released Temple of Space, a new Ironclad
          structure. On March 19th will be added a common dragon card called
          Flameless Lizards.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('I29')} />
      </Article.Embed>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N82')} />
      </Article.Embed>

      <Article.Narrow>
        <p>As usual, two exclusive $9.99 packs will be available:</p>
        <ul>
          <li>
            Flameless Lizards pack ($9.99): 10 copies of <CardLink id='N82' />,
            as well as <Stones amount={5} /> and <Coins amount={750} />.
          </li>
          <li>
            Temple of Space pack ($9.99): 1 copy of <CardLink id='N82' />, as
            well as <Stones amount={5} /> and <Coins amount={750} />.
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
      </Article.Embed>

      <Article.Narrow>
        <Title id='new-books'>New books</Title>

        <p>
          Five new books will make their entrance in the next update: the former
          Dragon and Feline tomes, but also a Legendary Dragon tome, and Elder
          tome and a Pirate tome. They all contain 3 cards and cost{' '}
          <Rubies amount={60} />, except the Legendary Dragon one which costs{' '}
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
          src='/assets/images/releases/books.png'
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
          others—instead it has a ladder. Players move along that ladder based
          on the amount of <span className='Highlight'>Elo Crowns</span> they
          own, also known as their{' '}
          <span className='Highlight'>Elo Ranking</span> (e.g. owning{' '}
          <EloCrowns amount={1500} /> is the same as having a ranking of 1500).
          These are gained and lost after each ranked game performed in Diamond
          and the Heroes League (see formula below).
        </p>

        <p>
          When entering the Diamond league, every player is granted{' '}
          <EloCrowns amount={1000} /> to start with. As they progress through
          Diamond, they already collect (or loose) Elo Crowns (see below). When
          finally passing Diamond 1 and entering the Heroes League, the amount
          of Elo Crowns collected represents the Elo Ranking—provided it is
          above 1000. If the Diamond progress was difficult and a player was to
          enter Heroes League with less than 1000 Elo Crowns, their ranking
          would be set to 1000.
        </p>

        <img
          src='/assets/images/releases/chest_hero.png'
          alt='Heroes League chest'
          style={{ maxWidth: '300px', margin: '3em auto' }}
        />

        <p>
          At the end of the season, players having reached the Heroes League
          will be down-ranked back to Diamond 5, their ranking will be reset,
          and will receive a Heroes League chest (20 common cards, 16 rare
          cards, 8 epic cards and 3 legendary cards, as well as{' '}
          <Coins amount={3000} /> and <Rubies amount={100} />) as well as
          rewards based on their final position in the ladder as follow:
        </p>

        <ul>
          <li>
            The 1st player in the ladder will earn a Mythic tome, one Elder tome
            and one legendary dragon card (worth <Rubies amount={260} /> total).
          </li>
          <li>
            The other players in the top 10 will earn a Mythic tome and a Feline
            tome (worth <Rubies amount={140} /> total).
          </li>
          <li>
            The other players in the top 100 will earn a Heroic tome and a
            common dragon card (worth <Rubies amount={100} /> total).
          </li>
          <li>
            The other players in the top 500 will earn a Pirate tome (worth{' '}
            <Rubies amount={60} /> total).
          </li>
        </ul>

        <hr />

        <p>
          The formula used to determine the new ranking (
          <var className='Highlight'>
            R<sub>n</sub>
          </var>
          ) from the old ranking (
          <var className='Highlight'>
            R<sub>o</sub>
          </var>
          ) at the end of a ranked battle goes as follow:
        </p>

        <img
          src='/assets/images/releases/elo_formula.png'
          alt='Ranking formula'
        />

        <p>Here are the terms:</p>

        <ul style={{ marginBottom: '3em' }}>
          <li>
            <var className='Highlight'>
              R<sub>n</sub>
            </var>{' '}
            is the new ranking
          </li>
          <li>
            <var className='Highlight'>
              R<sub>o</sub>
            </var>{' '}
            is the old ranking
          </li>
          <li>
            <var className='Highlight'>K</var> is the coefficient factor: it is
            worth 40 for new players until they have played 30 matches in
            Diamond, 20 for players rated below 2400, and 10 for players who
            ever reached 2400, regardless of their current ranking
          </li>
          <li>
            <var className='Highlight'>W</var> is either 1 in case of a win, 0
            for a loss
          </li>
          <li>
            <var className='Highlight'>dr</var> is the difference between the
            two player’s ranking and is capped to 400 too much rating
            fluctuations in case of uneven matchmaking
          </li>
        </ul>

        <Info icon='equalizer' title='Ranking calculator'>
          <p>
            This calculator executes the aforementioned formula on the given
            variables to compute your expect Elo ranking.
          </p>
          <EloCalculator />
        </Info>

        <Title id='ui-improvements'>UI improvements</Title>

        <p>
          This release will bring some quality of life and interface
          improvements, starting with a way to add the player you just battled
          as a friend!
        </p>

        <p>
          There will also be a dozen new avatars for everyone including Siren of
          the Seas, Dopplebocks, Stoic Protectors, Snake Eyes, Doctor Mia, First
          Mutineer, Dreadfauns, Laurus King in Exile, Bigthrust Tigers, Agents
          in Charge, Bluesail Raiders and Mystwives.
        </p>

        <p>
          Additionally, there will be 14 new exclusive premium avatars which can
          be unlocked for <Rubies amount={200} /> each, shown below!
        </p>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/premium_avatars_female.png'
              alt='Female premium avatars selection screen'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/premium_avatars_neutral.png'
              alt='Neutral premium avatars selection screen'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/premium_avatars_male.png'
              alt='Male premium avatars selection screen'
            />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <Title id='new-books'>New books</Title>

        <p>
          Five new books will make their entrance in the next update: the former
          Dragon and Feline tomes, but also a Legendary Dragon tome, and Elder
          tome and a Pirate tome. They all contain 3 cards and cost{' '}
          <Rubies amount={60} />, except the Legendary Dragon one which costs{' '}
          <Rubies amount={120} />.
        </p>

        <ul>
          <li>Dragon tome: 3 cards, with rarity distribution of 20/60/20/0.</li>
          <li>
            Legendary Dragon tome: 3 cards, with rarity distribution of
            0/0/70/30.
          </li>
          <li>Feline tome: 3 cards, with rarity distribution of 50/30/15/5.</li>
          <li>Elder tome: 3 cards, with rarity distribution of 0/60/35/5.</li>
          <li>Pirate tome: 3 cards, with rarity distribution of 55/25/15/5.</li>
        </ul>

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
                'No, you are either in the Diamond league or in the Heroes league, but never both. However, when you are in Diamond, you are already in Elo ranking but your score is not taken into consideration on the Heroes league leaderboard.',
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
