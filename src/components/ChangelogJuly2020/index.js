import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import BattleSimApp from '../BattleSimApp'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Quest from '../Quest'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import { Coins, Rubies, Stones } from '../Resource'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ChangelogJuly2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update July 2020'
      backLink={{ to: '/changelog', children: 'Back to changelog' }}
      readingTime='10 minutes'
      className='ChangelogJuly2020'
      background='/assets/images/environment_dragon.png'
      ratio='50%'
    >
      <p>
        Back in April, Paladin Studios announced they would hand over Stormbound
        to a Polish game development studio called{' '}
        <a
          href='https://www.sheepyard.pl/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sheepyard
        </a>
        . A few months later, Sheepyard is ready to{' '}
        <u style={{ textDecoration: 'line-through', opacity: 0.5 }}>sheep</u>{' '}
        ship their very first release, after a drought of about 8 months. I am
        very excited and honoured to be able to announce these changes in
        exclusivity!
      </p>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#economy-update'>Economy update</a>
        </li>
        <li>
          <a href='#new-legendary-card'>New legendary card</a>
        </li>
        <li>
          <a href='#balance-changes'>Balance changes</a>
        </li>
        <li>
          <a href='#matchmaking-tweaks'>Matchmaking tweaks</a>
        </li>
        <li>
          <a href='#ui-improvements'>UI improvements</a>
        </li>
      </ul>

      <Title id='economy-update'>Economy update</Title>

      <p>
        One thing Sheepyard has been quite adament to tackle is the somewhat
        awkward in-game economy, particularly the disparity between resources.
        Their first attempt at taming the beast has been to revisit quests to
        restore some balance between the three currencies.
      </p>

      <ul>
        <li>
          Tier 1 quests will now grant <Coins amount={100} />.
        </li>
        <li>
          Tier 2 quests will now grant <Rubies amount={5} />.
        </li>
        <li>
          Tier 3 quests will now grant 1 or <Stones amount={2} />, depending on
          the quest.
        </li>
      </ul>

      <p>
        On top of that, and to compensate the fact that quests overall grant
        less coins than before, the daily coin cap has been increased to{' '}
        <Coins amount={400} /> (up from <Coins amount={250} />
        ).
      </p>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Quest
              difficulty={1}
              name='Student'
              description='Play 20 cards'
              currency='COINS'
              amount={100}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={2}
              name='Grand recruitment'
              description='Spawn 15 token units'
              currency='RUBIES'
              amount={5}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={3}
              name='Masterful Blueprint'
              description='Play 15 structure cards'
              currency='STONES'
              amount={2}
            />
          </Column>
        </Row>
      </div>

      <Info title='Rerolling quests'>
        <p>
          Each quest can still be re-rolled once per day, but a quest tier 1
          will always grant coins, a tier 2 quest will always grant rubies and a
          tier 3 quest will always grant fusion stones.
        </p>
      </Info>

      <Title id='new-legendary-card'>New legendary card</Title>

      <p>
        To celebrate their involvement in Stormbound, the Sheepyard studio
        wanted to mark the occasion with a brand new card in their effigy:{' '}
        <span className='Highlight'>Rogue Sheep</span>, a legendary pirate
        sheep! Meanwhile, Siren is crying in the corner seeing her hopes and
        dreams of becoming a pirate hero crushed.
      </p>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/2'>
            <h3 style={{ marginTop: 0 }}>Sketches & illustrations</h3>
            <img
              style={{ marginTop: 0 }}
              src='/assets/images/banner_rogue_sheep.png'
              alt='New Rogue Sheep card'
            />
          </Column>
          <Column width='1/2'>
            <h3 style={{ marginTop: 0 }}>In-game 3D model</h3>
            <video
              style={{ marginTop: 0 }}
              src='/assets/videos/sheep_hero.mp4'
              muted
              controls
            ></video>
          </Column>
        </Row>
      </div>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('N77')} />
      </div>

      <p>
        <WikiLink id='N77' /> is available through crafting and{' '}
        <Link to='/collection/books'>books</Link>. Additionally, it is possible
        to buy a $10 limited edition pack containing Rogue Sheep and some
        resources. This one-time offer will only be available for a few days, so
        be sure to consider it!
      </p>
      <img
        style={{ marginTop: 0 }}
        src='https://i.gyazo.com/24207235577c36531a6e5d4af50cf6af.png'
        alt='Limited offer'
      />

      <Title id='balance-changes'>Balance changes</Title>

      <p>
        Sheepyard took a close look at the current state of the meta and went
        nuclear on its main assets, putting down the nerf hammer on many cards,
        especially but not limited to elders.
      </p>
      <p>
        This is only a first balance patch aiming at fixing the meta. It will be
        followed by over 30 card updates in the next patch to balance things
        further.
      </p>

      <h3>Nerfs</h3>

      <ul>
        <li>
          <WikiLink id='N70' /> has its strength and its ability both decreased
          by 1.
        </li>
        <li>
          <WikiLink id='N74' /> cost 6 mana at all levels (up from 5).
        </li>
        <li>
          <WikiLink id='N76' /> has its strength decreased by 1 at all levels.
        </li>
        <li>
          <WikiLink id='F20' /> have their strengrh decreased by 2 at all
          levels.
        </li>
        <li>
          <WikiLink id='F28' /> have their strength decreased by 2 at all
          levels.
        </li>
        <li>
          <WikiLink id='S20' /> costs 7 mana at all levels (up from 6).
        </li>
        <li>
          <WikiLink id='S21' /> costs 7 mana at all levels (up from 6).
          Additionally, its ability is no longer able to play a card of rarity
          higher than rare.
        </li>
        <li>
          <WikiLink id='S28' /> have their strength decreased by 1 at all
          levels.
        </li>
        <li>
          <WikiLink id='W9' /> have their strength and ability described by 1 at
          all levels.
        </li>
        <li>
          <WikiLink id='W13' /> have their movement decreased by 1 at all
          levels.
        </li>
        <li>
          <WikiLink id='W19' /> costs 8 mana at all levels (up from 7).
        </li>
        <li>
          <WikiLink id='W27' /> have their strength decreased by 1 at all levels
          and regenerate 3, 3, 3 (down from 4), 4 (down from 5), 4 (down from
          6).
        </li>
      </ul>

      <p>
        Like in the past, some compensation in the form of coins or fusion coins
        will be provided to owners of these nerfed cards, proportional to the
        amount of owned copies.
      </p>

      <h3>Buffs</h3>

      <ul>
        <li>
          <WikiLink id='N9' /> costs 3 mana at all levels (down from 4 at level
          1 to 3) and reduce strength to 5, 4, 3, 2 (down from 3) and 1.
        </li>
        <li>
          <WikiLink id='N21' /> does 1 more damage at all levels.
        </li>
        <li>
          <WikiLink id='N60' /> costs 5 mana at all levels (down from 6).
        </li>
      </ul>

      <h3>Confusion</h3>

      <p>
        On top of making <WikiLink id='N60' /> more accessible by decreasing
        their mana cost, Sheepyard has{' '}
        <u style={{ textDecoration: 'line-through', opacity: 0.5 }}>
          revisited
        </u>{' '}
        fixed the Confusion mechanic to make it more reliable.
      </p>

      <p>
        If confused, a unit has 1 chance out of 3 to move forward, 1 chance out
        of 3 to move inwards and 1 chance out of 3 to move outwards. If sitting
        on the edge of the board, the unit has 1 chance out of 3 to move forward
        and 2 chances out of 3 to move inwards.
      </p>

      <p>
        In the following situation, Gifted Recruits — who have been confused by
        Sweetcap Kittens — have 33% chance to move forward, and 66% chance to
        move to the right side. That’s because they are sitting on the edge of
        the board, so the 33% chance to move to the left are effectively
        redistributed to the right side.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          mode='DISPLAY'
          simId='MU42MlIxLCwsLCwsLCwsLCwsMU4zQjFDLCwsLCwsLDtSMTBOLUIxME47M00wOzs='
        />
      </div>

      <p>
        Sheepyard also allowed me to announce that 2 new feline cards will be
        added to the game in the next update to increase the Confusion synergy
        even further. Stay tuned for some more kitties!
      </p>

      <Title>Matchmaking tweaks</Title>

      <p>
        Stormbound has a long history of awkward matchmaking. In order to make
        it a little more fair, Sheepyard is introduced a base health upper limit
        based on the current league a player is in. The caps go as follow:
      </p>

      <ul>
        <li>
          <span style={{ color: '#c8c0df' }}>Diamond</span>: no other cap than
          the current maximum 20 health limit.
        </li>
        <li>
          <span style={{ color: '#c0e0cf' }}>Platinum</span>: health capped at
          17.
        </li>
        <li>
          <span style={{ color: '#f1e0be' }}>Gold</span>: health capped at 14.
        </li>
        <li>
          <span style={{ color: '#d6d9e2' }}>Silver</span>: health capped at 12.
        </li>
        <li>
          <span style={{ color: '#e2c3b7' }}>Bronze</span>: health capped at 11.
        </li>
        <li>
          <span style={{ color: '#d3d1cc' }}>Iron</span>: health capped at 10.
        </li>
      </ul>

      <p>
        Note that these upper limits on base health are not applied in Brawl
        mode whatsoever. Additionally, the CPU health has also been similarly
        adjusted when facing bots.
      </p>

      <Title id='ui-improvements'>UI improvements</Title>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <h3>Fortress Level</h3>
            <p>
              Sheepyard is starting to refresh the yee-old interface, starting
              with the one around the base health — which is now named “
              <span className='Highlight'>Fortress Level</span>”. It comes with
              a handy dialog box giving more information, as well as the
              effective progression.
            </p>

            <p>
              Still no disclosure of the actual formula determine one’s Fortress
              Level based on progression, but things are changing fast so who
              knows?
            </p>

            <p>
              Another minor interface change not displayed in the joined images
              — amongst a lot more improvements across all interfaces — is a new
              icon for the “Friends” button to replace to current one.
            </p>
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/base_health_dialog.png'
              alt='Dialog disclosing information about the current base health'
            />
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/base_health_level.gif'
              alt='Animation of the base health increasing'
            />
          </Column>
        </Row>
      </div>

      <hr />

      <p>
        That’s it for this update, which is not trivial for the first one from
        Sheepyard. They already have the next update in the starting blocks.
        Until then, beeeeeh!
      </p>

      <PageMeta
        title='Update 07-2020'
        description='Discover everything there is to know about the first Stormbound update from the Sheepyard studio!'
        image='/assets/images/environment_dragon.png'
      />
    </Article>
  )
})
