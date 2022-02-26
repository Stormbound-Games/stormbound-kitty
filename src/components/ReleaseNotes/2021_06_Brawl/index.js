import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Image from '~/components/Image'
import Info from '~/components/Info'
import FAQSection from '~/components/FAQSection'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import Table from '~/components/Table'
import Row from '~/components/Row'
import { Coins, Crowns } from '~/components/Resource'
import getMilestoneCost from '~/helpers/getMilestoneCost'
import getResourceLabel from '~/helpers/getResourceLabel'
import {
  MILESTONES_CASUAL,
  MILESTONES_WARRIOR,
  MILESTONES_ULTIMATE,
} from '~/constants/brawl'

const BrawlTable = ({ data }) => (
  <Table>
    <thead>
      <tr>
        <th>Crowns goal</th>
        <th>Cost per match</th>
        <th>With Premium Pass</th>
        <th>Reward</th>
      </tr>
    </thead>
    <tbody>
      {data.map(milestone => (
        <tr key={milestone.crowns}>
          <td data-label='Crowns goal'>
            <Crowns amount={milestone.crowns} />
          </td>
          <td data-label='Cost per match'>
            <Coins amount={milestone.cost} />
          </td>
          <td data-label='With Premium Pass'>
            <Coins amount={getMilestoneCost(milestone, 0.9)} />
          </td>
          <td data-label='Reward'>{getResourceLabel(milestone, true)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default React.memo(function ReleaseNotesBrawl2021(props) {
  return (
    <>
      <>
        <p>
          On June 17th, a Stormbound update will be released to revamp the Brawl
          system. It’s not a complete overhaul, but it should make the Brawl
          mode more inclusive and open it to more people!
        </p>

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

        <p>
          The purpose of remaking the known Brawl mode is to give players the
          opportunity to participate in it at any time during their Stormbound
          progression. This creative game mode should appeal to both advanced
          players and people just starting their adventure with Stormbound.
        </p>

        <p>
          Up until now, the Brawl mode has very much been intended as end-game
          content for players with very advanced collections. Others had nothing
          to look for in this mode, because the advantage of one over the other
          excluded the possibility of any fair competition.
        </p>

        <Info icon='equalizer' title='Calculators'>
          <p>
            The <Link to='/calculators/brawl'>Brawl calculator</Link>,{' '}
            <Link to='/brawl/elder-strength'>Brawl tracker</Link>,{' '}
            <Link to='/calculators/income'>income calculator</Link> and{' '}
            <Link to='/guides/brawl'>Brawl guide</Link> all have been updated to
            handle the new Brawl updates.
          </p>
        </Info>

        <Title>Three difficulties</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing top='LARGE'>
              <p>
                From now on, there will be 3 running Brawl events per week, of
                three different difficulties: Casual, Warrior and Ultimate. The
                current Brawl version is the new Ultimate one, so there will be
                two new difficulty levels{' '}
                <span className='Highlight'>under</span> the current one.
              </p>
            </Spacing>

            <p>
              Additionally, every match will have a{' '}
              <span className='Highlight'>Fortress Level cap</span>, a{' '}
              <span className='Highlight'>card level cap</span> and a{' '}
              <span className='Highlight'>limited number of turns</span>, which
              can therefore result in a draw. This is intended to make matches
              more fair by eliminating a lot of the differences in base health
              and cards between players.
            </p>

            <p>
              The crossed diamonds in the joint screenshot are further explained
              in the{' '}
              <Link href='#crowns-and-milestones'>Crowns &amp; milestones</Link>{' '}
              section.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/brawl_1.png'
              alt='Brawl screen now displaying 3 different Brawl events, one Casual, one Warrior and one Ultimate, with their own cost, defeat counter and reward'
            />
          </Row.Column>
        </Row>

        <h3>Casual</h3>
        <p>
          The Casual Brawl unlocks at Fortress Level 11. In this Brawl event,
          the Fortress Level is limited to 12, the cards’ level are fixed to
          level 1 and matches last up to 10 turns per player.
        </p>

        <BrawlTable data={MILESTONES_CASUAL} />

        <h3>Warrior</h3>
        <p>
          The Warrior Brawl unlocks at Fortress Level 12. In this Brawl event,
          the Fortress Level is limited to 14, the cards’ level are capped to 3
          and matches last up to 15 turns per player.
        </p>

        <BrawlTable data={MILESTONES_WARRIOR} />

        <h3>Ultimate</h3>
        <p>
          The Ultimate Brawl unlocks at Fortress Level 14. In this Brawl event,
          the Fortress Level and cards are not capped and matches last up to 20
          turns per player.
        </p>

        <BrawlTable data={MILESTONES_ULTIMATE} />

        <Title id='crowns-and-milestones'>Crowns &amp; milestones</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing top='LARGE'>
              <p>
                Victories will still yield <Crowns amount={5} /> and losses will
                still yield <Crowns amount={1} />. However, due to the fact that
                matches are limited in length, draws can happen and will reward{' '}
                <Crowns amount={2} /> to each player. A draw occurs when both
                players have the same amount of health by the end of the last
                turn.{' '}
              </p>
            </Spacing>

            <p>
              To avoid making the Brawl too easy for lower tiers and difficulty
              levels, every milestone needs to be reached without losing more
              than 2 times. After 3 losses across a given milestone, the crowns
              will be reset to the previously reached milestone. For instance,
              if losing 3 times between <Crowns amount={50} /> and{' '}
              <Crowns amount={70} />, the crowns will be reset to{' '}
              <Crowns amount={50} />.
            </p>

            <p>
              We will be keeping a very close eye on this system as the goal is
              not to make Brawl frustrating. Additionally, we are looking for
              ways to make losses redeemable in the near future so it’s a little
              more fluctuating than just 3 losses per milestone.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/brawl_3.png'
              alt='Brawl view now featuring 3 different Brawls'
            />
          </Row.Column>
        </Row>

        <Info icon='equalizer' title='Last crown for milestone'>
          <p>
            If missing <Crowns amount={1} /> to reach a given milestone while
            having lost twice already, losing a 3rd game will{' '}
            <span className='Highlight'>not</span> reset the crowns to the
            previous milestone. Instead, the last crown awarded by the loss will
            be enough to reach the next milestone.
          </p>
        </Info>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'current-brawl',
              question: 'What will happen to the current Brawl?',
              answer:
                'The current unique Brawl will no longer exist. It will always be 3 Brawl events per week, one for each difficulty.',
            },
            {
              id: 'brawl-duration',
              question: 'How long will each Brawl last?',
              answer:
                'The Brawl events will still last from Thursday to Sunday—nothing changes in that regard. That being said, we are considering changing this in future patches.',
            },
            {
              id: 'brawl-leaderboard',
              question: 'What will happen to the Brawl leaderboard?',
              answer:
                'Each Brawl event will have its own weekly leaderboard, but besides that it will stay the same.',
            },
            {
              id: 'new-modifiers',
              question: 'Will there ever be new modifiers?',
              answer:
                'Yes, we are working on bring new modifiers to the Brawl to keep it fresh.',
            },
            {
              id: 'brawl-order',
              question: 'Will the Brawls follow the same order as usual?',
              answer:
                'No, this will be somewhat random now—it won’t follow a cycle anymore. That being said, there will (hopefully soon) be a way to see the next week’s Brawls within the game.',
            },
          ]}
        />
      </>
    </>
  )
})
