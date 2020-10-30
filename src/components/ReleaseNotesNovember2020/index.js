import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import CardLink from '../CardLink'
import Column from '../Column'
import FAQSection from '../FAQSection'
import Info from '../Info'
import Only from '../Only'
import ReleaseNotes from '../ReleaseNotes'
import { Coins, Crowns, Rubies, Stones } from '../Resource'
import Row from '../Row'
import Table from '../Table'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesNovember2020(props) {
  return (
    <ReleaseNotes id='11_2020' withAvif={false}>
      <Article.Narrow>
        <p>
          It’s spooky season, and Sheepyard is releasing a small update. The
          situation with Apple has been resolved and the Halloween event can
          finally start! Find below all the goodness scheduled for this release!
        </p>

        <ul style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#updated-freeze-mechanic'>Update freeze mechanic</a>
          </li>
          <li>
            <a href='#new-ancient-race'>New Ancient race</a>
          </li>
          <li>
            <a href='#cheapened-brawl'>Cheapened brawl</a>
          </li>
          <li>
            <a href='#exclusive-promotions'>Exclusive promotions</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ul>

        <Info icon='gift' title='Free rubies'>
          Anyone logging into the game at least once between October 31th and
          November 15th will be granted <Rubies amount={20} />. Happy Halloween!
          🎃
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          Continuing with their pledge to balance cards regularly, Sheepyard
          makes no exception of this release. On the menu today: some love for
          forgotten cards, and a nerf of Rain of Frogs.
        </p>

        <ul>
          <li>
            <CardLink id='F8' /> now costs 3/2/2/2/2 (from 3/3/2/2/1). As a
            result, the amount of spawned toads is adjusted 4/4/4-5/5/6 (from
            4/5/5/6/6).
          </li>
          <li>
            <CardLink id='N77' /> now costs 6 mana at all levels (down from 7).
          </li>
          <li>
            <CardLink id='F21' /> now costs 6 mana at all levels (down from 7).
          </li>
          <li>
            <CardLink id='I17' /> now moves forward if it kills the pushed unit.
          </li>
          <li>
            <CardLink id='N24' /> now cost 3 mana at all levels (down from 4).
            As a result, their strength is reduced by 1 (from 2/2/3/3/4 to
            1/2/2/3/3) and their ability is adjusted (from 2/3/3/4/4 to
            2/2/3/3/4).
          </li>
          <li>
            <CardLink id='W1' /> now can freeze a unit instead of dealing damage
            if it is not frozen yet.
          </li>
        </ul>

        <Info icon='heart' title='Nerf compensation'>
          Owners of Rain of Frogs will be compensated proportionally to the
          level of the card: <Coins amount='0/15/40/120/250' /> and{' '}
          <Stones amount='0/2/5/10/20' />.
        </Info>

        <Title id='updated-freeze-mechanic'>Updated freeze mechanic</Title>

        <p>
          As hinted before, the freeze mechanic is being reworked. Until now, a
          frozen unit would simply skip its moving phase at the beginning of its
          next turn. That remains the case, however it also temporarily loses
          its Death Trigger Effect and its Survive Trigger Effect.
        </p>

        <p>
          That means freezing is no longer solely used to slow down the enemy,
          but can be used to avoid side-effects of attacking a unit, such as the
          elders’ abilities or ‘on death’ effects.
        </p>

        <p>
          This impacts Icicle Burst, Frosthexers, Moment’s Peace and Midwinter
          Chaos directly, and Spellbinder Zhevana and Wisp Clouds indirectly.
        </p>

        <Title id='new-ancient-race'>New Ancient race</Title>

        <p>
          Originally announced as “Bisanu”, later renamed “Stoic Protectors”,
          the new Ancient card will finally be available from November 1st and
          will bring a whole new concept into the game through the “Ancient”
          race.
        </p>

        <p>
          On play, Stoic Protectors effectively disable the ability of
          bordering/surrounding units (depending on level). This effect is
          permanent, lasting until the unit dies, and cannot be canceled. It
          only works on units and cannot be used to disable structures. This
          peculiar property makes Stoic Protectors another pretty effective
          counter to elders.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N80')} />
      </Article.Embed>

      <Article.Narrow>
        <Title id='cheapened-brawl'>Cheapened brawl</Title>

        <p>
          Similar to what happened for the{' '}
          <Link to='/releases/3rd-anniversary'>third anniversary</Link>, the
          Brawl starting on November 5th is going to be cheaper. All fight will
          cost 50% of their original price.
          <Only.Desktop>
            {' '}
            Here are the adjusted values for every milestone:
          </Only.Desktop>
        </p>

        <Only.Desktop>
          <Article.Embed>
            <Table>
              <thead>
                <tr>
                  <th>Required crowns</th>
                  <th>Cost per match</th>
                  <th>Reward once reached</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES.map(milestone => {
                  const cost =
                    Math.round(Math.round(milestone.cost / 2) / 5) * 5
                  return (
                    <tr key={milestone.crowns}>
                      <td>
                        <Crowns amount={milestone.crowns} />
                      </td>
                      <td>
                        <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
                      </td>
                      <td>{getBrawlRewardLabel(milestone, true)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Article.Embed>
        </Only.Desktop>
      </Article.Narrow>

      <Article.Narrow>
        <Title id='exclusive-promotions'>Exclusive promotions</Title>

        <p>
          Halloween event means exclusive promotion packs and offers. Quite a
          few options as always:
        </p>
        <ul>
          <li>
            The <span className='Highlight'>Stoic Protectors pack</span>: 3
            copies of <CardLink id='N80' />, <Stones amount={5} /> and{' '}
            <Coins amount={750} />. This one-time $9.99 pack will be available
            between November 1st and November 8th.
          </li>
          <li>
            The <span className='Highlight'>Trick or Treat bundle</span>: 6
            Mythic Tomes, 6 Heroic Tomes and 6 Classic Tomes. This one-time
            bundle $29.99 will be available between October 31st and November
            15th.
          </li>
          <li>
            There will be some special weekly and monthly vanishing packs
            available throughout the month of November.
          </li>
          <li>
            All coin and ruby bundles will yield +20% more resources between
            October 31st and November 15th.
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Column>
            <img
              src='/assets/images/releases/stoic_protectors_pack.png'
              alt='Stoic Protectors pack: 3 copies of the card, 5 fusion stones, 750 coins'
            />
          </Column>
          <Column>
            <img
              src='/assets/images/releases/halloween_bundle.png'
              alt='Trick or Treat bundle: 6 Mythic Tomes, 6 Heroic Tomes, 6 Classic Tomes'
            />
          </Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When will the release be available?',
              answer: (
                <>
                  The release will be ready for October 31st. The balance
                  changes and <CardLink id='N80' /> will only be available from
                  November 1st though.
                </>
              ),
            },
            {
              id: 'event-duration',
              question: 'How long will the event last?',
              answer: (
                <>
                  The Stoic Protector’s pack will be available from November 1st
                  to November 8th. The Trick of Treat offer and the coin/ruby
                  packs’ boost will be available from October 31st to November
                  15th. The extra weekly and monthly vanishing packs will be
                  available all throughout November.
                </>
              ),
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
