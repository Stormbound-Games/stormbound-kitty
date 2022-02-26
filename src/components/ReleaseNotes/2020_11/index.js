import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import { Coins, Rubies, Stones } from '~/components/Resource'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'
import CheapenedBrawl from '~/components/CheapenedBrawl'

export default React.memo(function ReleaseNotesNovember2020(props) {
  return (
    <>
      <>
        <p>
          It’s spooky season, and Sheepyard is releasing a small update. The
          situation with Apple has been resolved and the Halloween event can
          finally start! Find below all the goodness scheduled for this release!
        </p>

        <Info icon='bullhorn' title='Important announcement'>
          <p>
            The issue with Apple validation of the app has been brought up again
            and has caused issue with the season reset and the update—both of
            which did not happen on time. As a result, the Halloween event is
            once again delayed, and while we know that Halloween was yesterday,
            we unfortunately could not influence this to make it go live on
            time.
          </p>
          <p>
            We will run an hour long maintenance on November 1st at 12pm CET
            (10am UTC) in order to set everything up manually. After the
            upcoming maintenance, the new season will start (with chests as
            expected). Additionally, the balance changes will be live (with
            freeze, just without the new animations on iOS).
          </p>
        </Info>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#updated-freeze-mechanic'>Update freeze mechanic</Link>
          </li>
          <li>
            <Link href='#new-ancient-race'>New Ancient race</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#exclusive-promotions'>Exclusive promotions</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='gift' title='Free rubies'>
          <p>
            Anyone logging into the game at least once between November 1st and
            November 15th will be granted <Rubies amount={30} />. Happy
            Halloween! 🎃
          </p>
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
          <p>
            Owners of Rain of Frogs will be compensated proportionally to the
            level of the card: <Coins amount='0/15/40/120/250' /> and{' '}
            <Stones amount='0/2/5/10/20' />.
          </p>
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
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N80')} />
      </Page.Embed>

      <>
        <Title id='cheapened-brawl'>Cheapened Brawl</Title>
        <p>
          Similar to what happened for the{' '}
          <Link to='/releases/3rd-anniversary'>third anniversary</Link>, the
          Brawl starting on November 5th (and only that one) is going to be
          cheaper. All fight will cost 50% of their original price.
        </p>
        <CheapenedBrawl ratio={(1 / 3) * 2} difficulty='LEGACY' />

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
            bundle $29.99 will be available between November 1st and November
            15th.
          </li>
          <li>
            There will be some special weekly and monthly vanishing packs
            available throughout the month of November.
          </li>
          <li>
            All coin and ruby bundles will yield +20% more resources between
            November 1st and November 15th.
          </li>
        </ul>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/stoic_protectors_pack.png'
              alt='Stoic Protectors pack: 3 copies of the card, 5 fusion stones, 750 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/halloween_bundle.png'
              alt='Trick or Treat bundle: 6 Mythic Tomes, 6 Heroic Tomes, 6 Classic Tomes'
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When will the release be available?',
              answer: (
                <>
                  The release will be ready on November 1st, from 10AM UTC (so a
                  little later than the usual season reset due to the unforeseen
                  issues with Apple). Unfortunately, Stoic Protectors will not
                  be available just yet and will be delayed until the Apple
                  situation is fully resolved. No ETA yet.
                </>
              ),
            },
            {
              id: 'event-duration',
              question: 'How long will the event last?',
              answer: (
                <>
                  The Stoic Protector’s pack will be available until November
                  8th. The Trick of Treat offer and the coin/ruby packs’ boost
                  will be available until November 15th. The extra weekly and
                  monthly vanishing packs will be available all throughout
                  November.
                </>
              ),
            },
          ]}
        />
      </>
    </>
  )
})
