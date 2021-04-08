import React from 'react'
import Guide from '../Guide'
import Info from '../Info'
import Row from '../Row'
import Title from '../Title'
import { Stones, Coins, Rubies } from '../Resource'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('KNOWN_BUGS')

export default React.memo(function GuideKnownBugs(props) {
  return (
    <Guide {...guide}>
      <p style={{ marginBottom: '2em' }}>
        Bugs are{' '}
        <s style={{ textDecoration: 'line-through', opacity: 0.5 }}>storm</s>
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
          <a href='#displayed-debug-view'>Displayed debug view</a>
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
        <li>
          <a href='#misplaced-game-invite'>Misplaced game invite</a>
        </li>
        <li>
          <a href='#unwatchable-ads'>Unwatchable ads</a>
        </li>
        <li>
          <a href='#glitchy-friend-list'>Glitchy friend list</a>
        </li>
      </ul>

      <Title id='displayed-debug-view'>Displayed debug view</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
          <img
            src='/assets/images/guides/brawl_debug_view.jpg'
            alt='Debug Brawl view with infinite resources, test name and missing UI elements'
          />
        </Row.Column>
        <Row.Column>
          <div>
            <h3>Problem</h3>
            <p>
              When already in the game when the Brawl starts on Thursday or the
              season resets on the 1st of the month at the same time, one might
              see:{' '}
            </p>
            <ul>
              <li>
                “Long Player Namer” as a name and <Stones amount={999} />,{' '}
                <Coins amount={99999} /> and <Rubies amount={9999} />.
              </li>
              <li>
                In the case of the Brawl page, the Dragon Brawl is displayed,
                but the image is a white square instead of Eloth the Ignited and
                the leaderboard shows an ever-lasting loading state.
              </li>
              <li>
                Some interface elements are glitchy, missing or not properly
                rendered.
              </li>
            </ul>

            <h3>Workaround</h3>
            <p>
              This is only a data fetching issue causing the fallback data to be
              displayed. It has no incidence on a player’s account and will be
              “resolved” with a simple game restart.
            </p>
          </div>
        </Row.Column>
      </Row>

      <Title id='double-animations'>Double animations</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
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
              same time for a friendly match. Because of two parts of the
              server-side code not being aware of each other, all animations are
              played twice.
            </p>

            <h3>Workaround</h3>
            <p>
              Closing and restarting the game to join the same match again does
              not appear to fix the problem, as it seems like a server-side bug.
              The match should be abandoned and restarted, making sure only one
              of the two players invite the other.
            </p>
          </div>
        </Row.Column>
        <Row.Column>
          <img
            src='/assets/images/guides/double_animation_bug.jpg'
            alt='All in-game animations are doubled'
          />
        </Row.Column>
      </Row>

      <Title id='missing-resources'>Missing resources</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
          <img
            src='/assets/images/guides/fusion_stone_reward.jpeg'
            alt='Animation when being rewarded with fusion stones'
          />
        </Row.Column>
        <Row.Column>
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
              successfully credited to the account though on the server, but are
              not reflected on the client.
            </p>

            <h3>Workaround</h3>
            <p>
              Moving to a view that does not display resources (such as deck
              collection) to the home screen again should fix it since it would
              cause the panel to fetch the actual data. Otherwise restarting the
              game should do it.
            </p>
          </div>
        </Row.Column>
      </Row>

      <Title id='three-cards-in-hand'>Three-cards in hand</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
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
              consistently. This seems to happen only on the first game after
              opening the game or changing decks, so probably some missing data.
            </p>

            <h3>Workaround</h3>
            <p>
              There is no known fix over than closing the game and reopening it.
              The match can safely be joined again, and the hand should contain
              4 cards.
            </p>
          </div>
        </Row.Column>
        <Row.Column>
          <img
            src='/assets/images/guides/three_cards_bug.jpg'
            alt='Stormbound hand with only 3 cards despite having cycled'
          />
        </Row.Column>
      </Row>

      <Title id='misplaced-game-invite'>Misplaced game invite</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
          <img
            src='/assets/images/guides/challenge_in_deck_selection.jpg'
            alt='Friendly challenge dialog being displayed in the deck view'
          />
        </Row.Column>
        <Row.Column>
          <div>
            <h3>Problem</h3>
            <p>
              It is possible to be invited to a friendly match despite not being
              in the “Friends” tab of the game or the home screen, such as the
              deck builder for instance.
            </p>

            <p>
              This happens when quickly entering and exiting the Friends tab,
              resulting in being marked “Online” for a few seconds despite
              having left that screen.
            </p>

            <p>
              This is likely due to the player’s status update being
              asynchronous and having to reach the server before being
              redispatched to online friends.
            </p>

            <h3>Workaround</h3>

            <p>
              It is not such a problematic bug per se. The invite can be
              accepted or declined normally, and the match would work as any
              other. In case the current deck is incomplete, it falls back with
              a complete deck from the collection.
            </p>
          </div>
        </Row.Column>
      </Row>

      <Title id='unwatchable-ads'>Unwatchable ads</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
          <div>
            <h3>Problem</h3>
            <p>
              From time to time, it might not be possible to watch an ad to
              increase the reward after having won a game. Something similar
              might be experienced in the shop where it is not possible to watch
              an ad to get the daily Humble book.
            </p>
            <p>
              It is not clear why this happens or what causes it, as it seems
              pretty random all in all.
            </p>

            <h3>Workaround</h3>
            <p>
              Most of the time, restarting the game entirely is enough to
              resolve the problem.
            </p>
            <p>
              If it persists, reseting the “ads ID” might be necessary. To do
              so:
            </p>
            <ul>
              <li>
                On <span className='Highlight'>Android</span>, go to Settings >
                Privacy > Advanced > Ads >{' '}
                <span className='Highlight'>Reset advertising ID</span>.
              </li>
              <li>
                On <span className='Highlight'>iOS</span>, go to Settings >
                Privacy > Advertising >{' '}
                <span className='Highlight'>Reset Advertising Identifier</span>.
              </li>
            </ul>
          </div>
        </Row.Column>
        <Row.Column>
          <img
            src='/assets/images/guides/unwatchable_ads.jpg'
            alt='The reward screen does not allow watching an ad'
          />
        </Row.Column>
      </Row>

      <Title id='glitchy-friend-list'>Glitchy friend list</Title>
      <Row wideGutter desktopOnly>
        <Row.Column>
          <img
            src='/assets/images/guides/friend-list-gaps.jpg'
            alt='Friend list having odd empty gaps'
          />
        </Row.Column>
        <Row.Column>
          <div>
            <h3>Problem</h3>
            <p>
              The friend list sometimes display empty slots, and these tend to
              move back and forth on scroll. It does not seem to be replacing
              any actual tile though; it feels more like an off-by-one error.
            </p>

            <h3>Workaround</h3>

            <p>
              Leaving the friend list view and opening it again is usually
              enough to restore the proper display.
            </p>
          </div>
        </Row.Column>
      </Row>
    </Guide>
  )
})
