import React from 'react'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Spacing from '~/components/Spacing'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import {
  Coins,
  Rubies,
  Stones,
  Common,
  Rare,
  Epic,
  Legendary,
} from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesFebruary2022(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          February bringing balance changes, 2 new Ancient cards, compensation
          and some exclusive offers!
        </p>

        <TableOfContents>
          <li>
            <Link href='#compensation'>Compensation</Link>
          </li>
          <li>
            <Link href='#cheapened-brawls'>Cheapened Brawls</Link>
          </li>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#new-brawls'>New Brawls</Link>
          </li>
          <li>
            <Link href='#valentines-event'>Valentine’s Event</Link>
          </li>
          <li>
            <Link href='#qol-improvements'>Quality of life improvements</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated and got a booster shot. You
            can still carry the disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='compensation'>Compensation</Title>

        <p>
          Over the last month, there were a few issues related to one of our
          service providers performing a framework update. This may have
          resulted in decreased performance, which was aggravated by the fact
          that the release of the Draft Mode caused more players than usual to
          play.
        </p>

        <p>
          We did our best to roll out quick fixes to bring back the game to a
          playable state, with only occasional performance drops in specific
          cases. With the community’s help, we have identified all remaining
          issues and fixed them one by one, both via backend updates and client
          releases.
        </p>

        <p>
          Nevertheless, we would like to apologize for the issues you’ve faced
          and issue a small gift in compensation.
        </p>

        <ul>
          <li>
            We will enable a “double coin event” during the first week of
            February. Matches will yield twice as many coins, and the coin cap
            will be raised to <Coins amount={800} /> (
            <Coins amount={1400} /> for Premium Pass holders) for that week.
          </li>
          <li>
            The Brawl event for that week will be half the price (see{' '}
            <Link to='#cheapened-brawls'>Cheapened Brawls</Link> below).
          </li>
          <li>
            Every player logging into the game at least once during the first
            week of February will be granted 1 free entry card for the Draft
            mode.
          </li>
        </ul>

        <CheapenedBrawl ratio={1 / 2} title='Cheapened Brawls'>
          <p>
            The Brawl starting on February 3rd (as an apology){' '}
            <strong>and</strong> the Brawl starting on Fabruary 17th (for
            Valentine’s Day) are going to be cheaper. All fight will cost 50% of
            their original price.
          </p>
        </CheapenedBrawl>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N1' />’ ability now vitalizes the enemy unit as well.
          </li>
          <li>
            <CardLink id='N74' />
            ’s strength is now 7/8/9/11/13 (up from 6/7/8/10/12).
          </li>
          <li>
            <CardLink id='N81' />
            ’s strength is now 3/4/5/6/7 (up from 2/3/4/5/6).
          </li>
          <li>
            <CardLink id='N70' />’ strength is now 5/6/7/8/10 (up from
            4/5/6/7/9).
          </li>
          <li>
            <CardLink id='W15' />’ mana cost is now 6 (down from 7) and their
            strength is now 2 (down from 3).
          </li>
          <li>
            <CardLink id='W6' />
            ’s ability now grants 5/6/7/8/9 (up from 4/5/6/7/8).
          </li>
          <li>
            <CardLink id='N40' />
            ’s ability now grants 7/8/8/10/12 (up from 6/7/7/9/11).
          </li>
        </ul>

        <NerfCompensationInfo ids={['N1']} />

        <Title id='new-cards'>New cards</Title>

        <p>
          Four new epic Ancient cards will join the ranks of their respective
          factions over the next 2 months. These 2 cards will be introduced in
          February, then there will be 2 more in March.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('W33')} />
        <CardBuilderCardDisplay {...getInitialCardData('S31')} />
      </Page.Embed>

      <>
        <Spacing top='LARGEST'>
          <Info icon='hammer' title='Card Builder'>
            <p>
              A nice side-effect of these new cards being introduced is that the{' '}
              <Link to='/card'>card builder</Link> now supports creating Ancient
              cards of certain races, such as Frostling Ancient.
            </p>
          </Info>

          <p>
            As usual, there will be exclusive packs to collect early copies of
            the new Ancient cards. They all cost $9.99 and bring 3 copies of the
            given card + <Coins amount={750} /> and <Stones amount={5} />.
          </p>
        </Spacing>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/pack_orgone_leechers.png'
              alt='Orgone Leechers pack: 5 copies of Orgone Leechers + 750 coins + 5 fusion stones'
              withAvif
            />
            <p>
              <CardLink id='W33' /> will be introduced on February 7th along
              with its promotional pack, which can be purchased until February
              13th.
            </p>
            <p>
              <span className='Highlight'>Orgone Leechers Pack</span> ($9.99): 3
              copies of <CardLink id='W33' />, <Coins amount={750} /> and{' '}
              <Stones amount={5} />.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/pack_martyr_spongers.png'
              alt='Martyr Spongers pack: 5 copies of Martyr Spongers + 750 coins + 5 fusion stones'
              withAvif
            />
            <p>
              <CardLink id='S31' /> will be introduced on February 21st along
              with its promotional pack, which can be purchased until February
              28th.
            </p>
            <p>
              <span className='Highlight'>Martyr Spongers Pack</span> ($9.99): 3
              copies of <CardLink id='S31' />, <Coins amount={750} /> and{' '}
              <Stones amount={5} />.
            </p>
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <Title id='new-brawls'>New Brawls</Title>

        <p>
          Similar to what we did{' '}
          <Link to='/releases/12-2021'>back in December</Link> for{' '}
          <CardLink id='N91' />, we will introduce 2 new Brawl modifiers for the
          2 new cards. We think it’s a good way for you to be able to try, play
          with and enjoy newly added cards before you start collecting
        </p>

        <p>
          Like last time, a 0-mana level 1 (unless owned and leveled) copy of
          the new card will be added to everyone’s deck (thus causing all decks
          to have 13 cards). Only difference with last time is that if you also
          have that card in your base deck, it will cost 0 mana as well.
        </p>

        <ul>
          <li>
            The Warrior Brawl starting on the February 10th will be for{' '}
            <CardLink id='W33' />.
          </li>
          <li>
            The Warrior Brawl starting on the February 24th will be for{' '}
            <CardLink id='S31' />.
          </li>
        </ul>

        <Title id='valentines-event'>Valentine’s Event</Title>

        <p>
          With Valentine’s day approaching quickly, we thought we’d do a small
          event to mark the occasion. To begin with, and as mentioned before,
          the Brawl of the 17th will be half the price!
        </p>

        <p>
          Additionally, there will be 3 new Valentine avatars, each available at{' '}
          <Rubies amount={200} /> a piece.
        </p>

        <Row>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/avatars/valentine_woman_nobg.png'
              alt=''
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/avatars/valentine_man_nobg.png'
              alt=''
              withoutWebp
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/avatars/valentine_heart_monarch_nobg.png'
              alt=''
              withoutWebp
            />
          </Row.Column>
        </Row>

        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The
          Valentine exclusive packs will be available from February 14th (9AM
          CET) until Feburary 20th (end of day) so be sure to jump on them!
        </p>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/valentines_pack.png'
              alt='Valentines Pack ($29.99): all 4 weekly journals (48 cards in total, with guaranteed 4 legendaries, and 12 cards of each faction), 100 coins and 50 rubies; Lovely Bundle ($59.99): 100 neutral cards (with rarity odds being 45%, 30%, 15%, 10%), 1500 coins and 250 rubies'
            />
            <p>
              <span className='Highlight'>Valentines Pack</span> ($29.99): all 4
              weekly journals (48 cards in total, with guaranteed 4 legendaries,
              and 12 cards of each faction), <Coins amount={100} /> and{' '}
              <Rubies amount={50} />.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/lovely_bundle.png'
              alt='Lovely Bundle ($59.99): 100 neutral cards (with rarity odds being 45%, 30%, 15%, 10%), 1500 coins and 250 rubies'
            />
            <p>
              <span className='Highlight'>Lovely Bundle</span> ($59.99): 100
              neutral cards (with rarity odds being 45%, 30%, 15%, 10%),{' '}
              <Coins amount={1500} /> and <Rubies amount={250} />.
            </p>
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <Title id='qol-improvements'>Quality of life improvements</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <p>
              You will now be able to mark cards as favorite within your
              collection, as well as sort it with favorite cards first. This
              should help players frequently making new decks by letting them
              rapidly add their must-include cards!
            </p>

            <Image
              src='/assets/images/releases/favorite_sorting.jpg'
              alt='Screenshot of the collection view with a new “Favorite first” in the “Sort by” menu'
            />
          </Row.Column>
          <Row.Column>
            <p>
              Last but not least, the community menu will now provide a direct
              link to the release notes on the site. We hope this helps new
              player learn more about the release cycle we have, as well as the
              latest changes to the game.
            </p>

            <Image
              src='/assets/images/releases/patch_notes_button.png'
              alt='Screenshot of the community menu showing a new “Patch Notes” button'
            />
          </Row.Column>
        </Row>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: (
                <>
                  The balance changes will be deployed with the season reset as
                  usual. The 2 cards will be introduced on February 7th and
                  February 21st. The Valentine’s offer will be available between
                  February 14th and February 20th. The UI improvements will land
                  on February 7th.
                </>
              ),
            },
          ]}
        />
      </>
    </>
  )
})
