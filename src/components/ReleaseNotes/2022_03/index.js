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

export default React.memo(function ReleaseNotesMarch2022(props) {
  return (
    <>
      <Page.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early March
          bringing balance changes, 2 new Ancient cards, QoL improvements, and
          some exclusive offers!
        </p>

        <TableOfContents>
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

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N64' />’ ability will now deal damage to the units
            surrounding the target instead of bordering it.
          </li>
          <li>
            <CardLink id='N56' />’ ability now also triggers when played on the
            sides of a temple.
          </li>
          <li>
            <CardLink id='N60' />
            ’s strength is now 5/6/7/8/10 (down from 6/7/8/10/12).
          </li>
          <li>
            <CardLink id='N79' />’ strength is now 6/7/8/10/12 (up from
            5/6/7/9/11).
          </li>
          <li>
            <CardLink id='N77' />’ strength is now 4/5/6/7/9 (up from
            3/4/5/6/7).
          </li>
          <li>
            <CardLink id='I30' />’ strength is now 2/3/4/5/6 (up from
            1/2/3/4/5).
          </li>
        </ul>

        <NerfCompensationInfo ids={['N60']} />

        <Title id='new-cards'>New cards</Title>

        <p>
          As promised last month, here are the last 2 of the 4 new epic Ancient
          cards.
        </p>
      </Page.Narrow>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('I31')} />
        <CardBuilderCardDisplay {...getInitialCardData('F31')} />
      </Page.Embed>

      <Page.Narrow>
        <Spacing top='LARGEST'>
          <Info icon='wand' title='Card Builder'>
            <p>
              In case you missed it last month, the{' '}
              <Link to='/card'>card builder</Link> now supports creating Ancient
              cards of certain races, such as Ironclad Ancient.
            </p>
          </Info>

          <p>
            As usual, there will be exclusive packs to collect early copies of
            the new Ancient cards. They all cost $9.99 and bring 3 copies of the
            given card + <Coins amount={750} /> and <Stones amount={5} />.
          </p>
        </Spacing>
      </Page.Narrow>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/pack_absorbing_varmints.png'
              alt='Absorbing Varmints pack: 5 copies of Absorbing Varmints + 750 coins + 5 fusion stones'
              withAvif
            />
            <p>
              <CardLink id='I31' /> will be introduced on March 7th along with
              its promotional pack, which can be purchased until March 13th.
            </p>
            <p>
              <span className='Highlight'>Absorbing Varmints Pack</span>{' '}
              ($9.99): 3 copies of <CardLink id='I31' />, <Coins amount={750} />{' '}
              and <Stones amount={5} />.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/pack_plague_monarchs.png'
              alt='Plague Monarchs pack: 5 copies of Plague Monarchs + 750 coins + 5 fusion stones'
              withAvif
            />
            <p>
              <CardLink id='F31' /> will be introduced on March 21st along with
              its promotional pack, which can be purchased until March 28th.
            </p>
            <p>
              <span className='Highlight'>Plague Monarchs Pack</span> ($9.99): 3
              copies of <CardLink id='F31' />, <Coins amount={750} /> and{' '}
              <Stones amount={5} />.
            </p>
          </Row.Column>
        </Row>
      </Page.Embed>

      <Page.Narrow>
        <Title id='new-brawls'>New Brawls</Title>

        <p>
          Similar to what we did <Link to='/releases/02-2022'>last month</Link>,
          we will introduce 2 new Brawl modifiers for the 2 new cards. We think
          it’s a good way for you to be able to try, play with and enjoy newly
          added cards before you start collecting
        </p>

        <p>
          Like last time, a 0-mana level 1 (unless owned and leveled) copy of
          the new card will be added to everyone’s deck (thus causing all decks
          to have 13 cards). Only difference with last time is that if you also
          have that card in your base deck, it will cost 0 mana as well.
        </p>

        <ul>
          <li>
            The Warrior Brawl starting on the March 10th will be for{' '}
            <CardLink id='I31' />.
          </li>
          <li>
            The Warrior Brawl starting on the March 24th will be for{' '}
            <CardLink id='F31' />.
          </li>
        </ul>

        <Title id='qol-improvements'>Quality of life improvements</Title>
        <p>
          We are happy to introduce a handful of bug fixes as will interface
          improvements in this release, starting with the friends notifications
          toggle. When turned off, other players cannot send you invites.
        </p>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/GUI_friends_busy.png'
              alt='Screenshot of the friends menu displaying a toggle on the top right corner for notifications, labeled “Busy” and “Online”, currently set to “Busy”'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/GUI_friends_not_busy.png'
              alt='Screenshot of the friends menu displaying a toggle on the top right corner for notifications, labeled “Busy” and “Online”, currently set to “Online”'
            />
          </Row.Column>
        </Row>

        <p>
          Another small but highly requested feature: being able to buy several
          books at once. This is now possible with the new multi-buy feature!
        </p>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/GUI_multi_buy.png'
              alt='Screenshot of the shop screen displaying plus and minus buttons on both sides of the buttons to purchase books, in order to buy several at once'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/GUI_multi_buy_dialog.png'
              alt='Screenshot of a book purchasing dialog displaying plus and minus buttons to update the quantity, and the total amount on the main button to purchase'
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
                  usual. The 2 cards will be introduced on March 7th and March
                  21st. The UI improvements will land some time during March.
                </>
              ),
            },
          ]}
        />
      </Page.Narrow>
    </>
  )
})
