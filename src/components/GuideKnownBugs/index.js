import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import Guide from '../Guide'
import Info from '../Info'
import Row from '../Row'
import Title from '../Title'
import { Stones, Coins, Rubies } from '../Resource'
import guides from '../../data/guides'

const guide = guides.find(g => g.id === 'KNOWN_BUGS')

export default React.memo(function GuideKnownBugs(props) {
  return (
    <Guide {...guide}>
      <p>
        Bugs are{' '}
        <u style={{ textDecoration: 'line-through', opacity: 0.5 }}>storm</u>
        bound to happen. Software development is not infallible, and honest
        mistakes, inconsistencies or omissions exist in pretty much any program.
        Stormbound is no exception. A few common bugs have stood out over the
        years, and are compiled here.
      </p>

      <Info icon='warning' title='Important Disclaimer'>
        This is <span className='Highlight'>not</span> a bug report page. If you
        are experiencing an issue with your account, please kindly open a
        support ticket within the game, or visit the{' '}
        <a
          href='https://paladinstudios.zendesk.com/hc/en-us'
          target='_blank'
          rel='noopener noreferrer'
        >
          Zendesk
        </a>
        .
      </Info>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#the-9AM-debug-view'>The 9AM debug view</a>
        </li>
        <li>
          <a href='#double-animations'>Double animations</a>
        </li>
        <li>
          <a href='#missing-resources'>Missing resources</a>
        </li>
        <li>
          <a href='#three-cards-in-hand'>Three-cards in hand</a>
        </li>
      </ul>

      <Title id='the-9AM-debug-view'>The 9AM debug view</Title>
      <Row wideGutter desktopOnly>
        <Column>
          <img
            src='/assets/images/brawl_debug_view.jpg'
            alt='Debug Brawl view with infinite resources, test name and missing UI elements'
          />
        </Column>
        <Column>
          <div>
            <h3>Problem</h3>
            <p>
              Every Thursday, the <Link to='/brawl'>Brawl</Link> starts at 9AM
              sharp. When already in the game when it does, one might be faced
              with a very odd view:{' '}
            </p>
            <ul>
              <li>
                The player’s in-game name is replaced with “Long Player Namer”.
              </li>
              <li>
                The player’s resources are <Stones amount={999} />,{' '}
                <Coins amount={99999} /> and <Rubies amount={9999} />.
              </li>
              <li>
                The Dragon Brawl is displayed, but the image is a white square
                instead of Eloth the Ignited.
              </li>
              <li>The leaderboard shows an ever-lasting loading state.</li>
            </ul>

            <h3>Workaround</h3>
            <p>
              This is only a data fetching issue. It has no incidence on a
              player’s account and will be “resolved” with a simple game
              restart.
            </p>
          </div>
        </Column>
      </Row>
      <Title id='double-animations'>Double animations</Title>
      <Row wideGutter desktopOnly>
        <Column>
          <div>
            <h3>Problem</h3>
            <p>
              From the very beginning of the game, all animations are played
              twice. From the “Your turn”/“Opponent’s turn” one, to the on-play
              card display, to the actual 3D animation: they all play once, then
              a second time right away. The card history also display cards as
              if they were played twice.
            </p>

            <p>
              This happens when two players mutually invite themselves at the
              same time for a friendly match. For some reason, despite a single
              match being initiated, all animations are played twice.
            </p>

            <h3>Workaround</h3>
            <p>
              Closing and restarting the game to join the same match again does
              not appear to fix the problem, as it seems like a server-side bug.
              The match should be abandoned and restarted, making sure only one
              of the two players invite the other.
            </p>
          </div>
        </Column>
        <Column>
          <img
            src='/assets/images/double_animation_bug.jpg'
            alt='All in-game animations are doubled'
          />
        </Column>
      </Row>
      <Title id='missing-resources'>Missing resources</Title>
      <Row wideGutter desktopOnly>
        <Column>
          <img
            src='/assets/images/fusion_stone_reward.jpeg'
            alt='Animation when being rewarded with fusion stones'
          />
        </Column>
        <Column>
          <div>
            <h3>Problem</h3>
            <p>
              Occasionally, players are awarded resources without doing anything
              specific, such as for nerf compensations for instance. Upon
              opening the game, the resources animations are played (once per
              card), but then the numbers in the resource panel at the top of
              the screen are not updated.
            </p>
            <p>
              This is due to the fact that these animations do not cause the
              resource panel to refetch the actual data, therefore it still
              displays the previous numbers. The resources have been
              successfully credited to the account though.
            </p>

            <h3>Workaround</h3>
            <p>
              Moving to a view that does not display resources (such as deck
              collection) to the home screen again should fix it since it would
              cause the panel to fetch the actual data. Otherwise restarting the
              game should do it.
            </p>
          </div>
        </Column>
      </Row>
      <Title id='three-cards-in-hand'>Three-cards in hand</Title>
      <Row wideGutter desktopOnly>
        <Column>
          <div>
            <h3>Problem</h3>
            <p>
              After opening the game and jumping into a match, cycling a card
              takes the card out of the hand but does not bring a card back.
              From there, every turn grants only 3 cards in total, causing the
              game to be a disaster.
            </p>
            <p>
              This is unclear why this happens and it is believed the reason it
              has never been fixed is because it is hard to reproduce
              consistently. This always happen on the first game after opening
              the game, so probably some missing data.
            </p>

            <h3>Workaround</h3>
            <p>
              There is no known fix over than closing the game and reopening it.
              The match can safely be joined again, and the hand should contain
              4 cards.
            </p>
          </div>
        </Column>
        <Column>
          <img
            src='/assets/images/three_cards_bug.jpg'
            alt='Stormbound hand with only 3 cards despite having cycled'
          />
        </Column>
      </Row>
    </Guide>
  )
})
