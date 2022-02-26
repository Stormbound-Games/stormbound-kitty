import React from 'react'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Footnotes, { Footnote } from '~/components/Footnotes'
import Link from '~/components/Link'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Only from '~/components/Only'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import { Coins, Rubies, Stones } from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'
import { BOOKS } from '~/constants/books'

export default React.memo(function ReleaseNotesNovember2021(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          November, bringing balance changes, new cards, new books, some
          generous offers and a deck import/export functionality!
        </p>

        <TableOfContents>
          <li>
            <Link href='#disclaimer'>Disclaimer</Link>
          </li>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#deck-import-export'>Deck import/export</Link>
          </li>
          <li>
            <Link href='#new-books'>New books</Link>
          </li>
          <li>
            <Link href='#black-friday-offers'>Black Friday offers</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

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

        <Title id='disclaimer'>Disclaimer</Title>

        <p>
          In October, we needed to finish a lot of things that were planned
          regarding Stormbound’s monetization. That’s why we have tweaked
          vanishing packs and in last 2 weeks you could see some great
          time-limited offers around. Right now we can fully conentrate on
          delivering features and content you’ve been waiting for a long time.
        </p>

        <p>
          Therefore, you can expect the following to come in the next few
          months:
        </p>
        <ul>
          <li>
            <span className='Highlight'>New game mode</span>: A draft mode that
            you’ve never seen before. We are using all of Stormbound’s existing
            features to make this mode the best around.
          </li>
          <li>
            <span className='Highlight'>Reworked campaign mode</span>: It will
            bring much more enjoyment to your daily gaming sessions.
          </li>
          <li>
            <span className='Highlight'>Cards level limits in ranked mode</span>
            : We are finally ready to get Stormbound to the always desired state
            of progression. Skill will now be more important.
          </li>
          <li>
            <span className='Highlight'>New login system</span>: We are almost
            there. It’s currently being internally tested.
          </li>
        </ul>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N87' />’ strength is now 2/3/3/4/5 (up from
            1/2/2/3/4).
          </li>
          <li>
            <CardLink id='N88' />’ strength is now 3/4/5/6/7 (up from
            2/3/4/5/6).
          </li>
          <li>
            <CardLink id='N90' />’ strength is now 2/3/4/5/6 (down from
            3/4/5/6/7).
          </li>
          <li>
            <CardLink id='F12' />
            ’s ability now grants 2/3/4/5/6 strength (down from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='N59' />
            ’s ability now spawns knights with 2/3/4/5/6 strength (down from
            3/4/5/6/7).
          </li>
          <li>
            <CardLink id='W19' /> now costs 9 mana (up from 8), and grants
            11/12/13/14/15 mana (up from 10/11/12/13/14).
          </li>
          <li>
            <CardLink id='W22' />
            ’s ability no longer triggers against the base.
          </li>
        </ul>

        <NerfCompensationInfo ids={['W22', 'W19', 'N59', 'F12', 'N90']} />

        <Title id='new-cards'>New cards</Title>

        <p>
          Throughout November, four new cards will be released, one per faction.
        </p>
      </>

      <Page.Embed>
        <h3>Released on November 8th</h3>
        <CardBuilderCardDisplay {...getInitialCardData('S30')} />
        <h3>Released on November 15th</h3>
        <CardBuilderCardDisplay {...getInitialCardData('I30')} />
        <h3>Released on November 22nd</h3>
        <CardBuilderCardDisplay {...getInitialCardData('F30')} />
        <h3>Released on November 29th</h3>
        <CardBuilderCardDisplay {...getInitialCardData('W32')} />
      </Page.Embed>

      <>
        <Spacing top='LARGEST'>
          <p>
            As usual, there will be 4 exclusive packs to collect early copies of
            the new cards. They all cost $9.99 and bring 5 copies of the given
            card + <Stones amount={5} /> + <Coins amount={750} />. They will be
            available at the pace of one per week throughout November.
          </p>
        </Spacing>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack-blizzard-bombs.png'
              alt='Blizzard Bombs pack: 5 copies of Blizzard Bombs + 5 Fusion Stones + 750 coins'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack-function-wilds.png'
              alt='Function Wilds pack: 5 copies of Function Wilds + 5 Fusion Stones + 750 coins'
              withAvif
            />
          </Row.Column>
        </Row>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack-soap-cleanse.png'
              alt='Soap Cleanse pack: 5 copies of Soap Cleanse + 5 Fusion Stones + 750 coins'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ marginTop: 0, marginBottom: 0 }}
              src='/assets/images/releases/pack-diehards.png'
              alt='Diehards pack: 5 copies of Diehards + 5 Fusion Stones + 750 coins'
              withAvif
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <Title id='deck-import-export'>Deck import/export</Title>
      </>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column width='1/3'>
            <p>
              The long awaited deck import/export feature is finally coming!
              This will help players sharing decks with one another.
            </p>

            <p>
              The deck selection screen will now provide an option to export
              their own decks, or import the deck from other players using
              unique codes.
            </p>

            <p>
              To import a deck via its code, players need to have all required
              cards in their collection. If they don’t have all of them, the
              game will inform which cards are missing.
            </p>

            <Info icon='stack' title='Compatibility with the site'>
              <p>
                It is already possible to load decks from their Stormbound ID in
                the <Link to='/deck'>deck builder</Link>. Similarly, the sharing
                feature from the deck builder will provide the Stormbound ID so
                it can pasted in the game!
              </p>
            </Info>
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              withoutWebp
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/deck_import.png'
              alt='Screenshot of the new deck import feature showcasing an open dialog with a text field labeled “Paste deck number”'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              withoutWebp
              extend={{ marginTop: 0 }}
              src='/assets/images/releases/deck_options.png'
              alt='Screenshot of the new deck options feature showcasing 4 buttons labeled “Relocate”, “Import”, “Export”, “Delete”'
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <Title id='new-books'>New books</Title>

        <p>
          There will be 8 new books—one per non-neutral race—and a Book of
          Knights, working in a similar fashion to the Book of Felines and Book
          of Pirates. They cost <Rubies amount={40} />, contain 3 cards and have
          a rarity drop of 50% / 30% / 15% / 5%. There is also a new Book of
          Temples for <Rubies amount={60} />, containing 3 cards with 35% / 30%
          / 20% / 15%.
        </p>
      </>

      <Page.Embed>
        <Only.Desktop>
          <Row>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.SATYR.image + '?auto=format&w=250'}
                alt='New Book of Satyrs'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.UNDEAD.image + '?auto=format&w=250'}
                alt='New Book of Undead'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.TOAD.image + '?auto=format&w=250'}
                alt='New Book of Toads'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.RAVEN.image + '?auto=format&w=250'}
                alt='New Book of Ravens'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.DWARF.image + '?auto=format&w=250'}
                alt='New Book of Dwarves'
                withAvif
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.FROSTLING.image + '?auto=format&w=250'}
                alt='New Book of Frostlings'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.CONSTRUCT.image + '?auto=format&w=250'}
                alt='New Book of Constructs'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.RODENT.image + '?auto=format&w=250'}
                alt='New Book of Rodents'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.TEMPLE.image + '?auto=format&w=250'}
                alt='New Book of Temples'
                withAvif
              />
            </Row.Column>
            <Row.Column width='1/5'>
              <Image
                src={BOOKS.KNIGHT.image + '?auto=format&w=250'}
                alt='New Book of Knights'
                withAvif
              />
            </Row.Column>
          </Row>
        </Only.Desktop>

        <Only.Mobile>
          <Row>
            <Row.Column>
              <Image
                src={BOOKS.SATYR.image + '?auto=format&w=250'}
                alt='New Book of Satyrs'
                withAvif
              />
            </Row.Column>
            <Row.Column>
              <Image
                src={BOOKS.UNDEAD.image + '?auto=format&w=250'}
                alt='New Book of Undead'
                withAvif
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Image
                src={BOOKS.TOAD.image + '?auto=format&w=250'}
                alt='New Book of Toads'
                withAvif
              />
            </Row.Column>
            <Row.Column>
              <Image
                src={BOOKS.RAVEN.image + '?auto=format&w=250'}
                alt='New Book of Ravens'
                withAvif
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Image
                src={BOOKS.DWARF.image + '?auto=format&w=250'}
                alt='New Book of Dwarves'
                withAvif
              />
            </Row.Column>
            <Row.Column>
              <Image
                src={BOOKS.FROSTLING.image + '?auto=format&w=250'}
                alt='New Book of Frostlings'
                withAvif
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Image
                src={BOOKS.CONSTRUCT.image + '?auto=format&w=250'}
                alt='New Book of Constructs'
                withAvif
              />
            </Row.Column>
            <Row.Column>
              <Image
                src={BOOKS.RODENT.image + '?auto=format&w=250'}
                alt='New Book of Rodents'
                withAvif
              />
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Image
                src={BOOKS.TEMPLE.image + '?auto=format&w=250'}
                alt='New Book of Temples'
                withAvif
              />
            </Row.Column>
            <Row.Column>
              <Image
                src={BOOKS.KNIGHT.image + '?auto=format&w=250'}
                alt='New Book of Knights'
                withAvif
              />
            </Row.Column>
          </Row>
        </Only.Mobile>
      </Page.Embed>

      <>
        <Title id='black-friday-offers'>Black Friday offers</Title>

        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The Black
          Friday exclusive packs will be available from November 22nd (9AM CET)
          until November 28th (end of day) so be sure to jump on them!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Raining Cats</span> ($9.99): guaranteed
            3 copies of each of the 7 rare and epic felines + 3 Classic Tomes
          </li>
          <li>
            <span className='Highlight'>Edrik’s Army</span> ($19.99): 2 copies
            of <CardLink id='N59' /> + 18 cards{' '}
            <Footnote id='most-played-cards'>
              amongst the most played across the last 3 months globally
            </Footnote>
          </li>
          <li>
            <span className='Highlight'>Emblem of Heroism</span> ($49.99): 35
            Heroic Tomes + <Coins amount={2000} />
          </li>
          <li>
            <span className='Highlight'>The Greatest Treasure</span> ($99.99):
            30 cards from each rarity + <Rubies amount={1000} /> +{' '}
            <Coins amount={5000} />
          </li>
        </ul>

        <p>
          On top of that, <span className='Highlight'>all books</span>{' '}
          (including Noble) will yield an extra card until the end of the Black
          Friday event. Similarly, the paid bundles yielding coins and rubies
          will grant +40% more resources for the duration of the Black Friday
          event.
        </p>

        <CheapenedBrawl ratio={0.5}>
          <p>
            Similar to previous events, the Brawl starting on November 25th (and
            only that one) is going to be cheaper. All fights will be 50% off.
            Owners of the Premium Pass will also have their usual discount
            applied, leading to a 60% reduction.
          </p>
        </CheapenedBrawl>

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
                  usual. The rest of the release will come a week later, on
                  November 8th, along with the first of the new cards. The 3
                  other new cards will be released once per week during the next
                  3 weeks. The Black Friday special offers will be available
                  during the last week of November.
                </>
              ),
            },
          ]}
        />

        <Footnotes>
          <p id='most-played-cards'>
            (*) The most played cards globally across the last 3 months are:
            Execution, Gifted Recruits, Green Prototypes, Personal Servers,
            Doppelbocks, Felflares, Dreadfauns, Bladestorm, Summon Militia,
            Chillbeards, Veterans of War, Icicle Burst, Crimson Sentry, Twilight
            Prowlers, Frosthexers, Copperskin Rangers, The Hearth and
            Confinement.
            <Link href='#most-played-cards' aria-label='Back to content'>
              ↩
            </Link>
          </p>
        </Footnotes>
      </>
    </>
  )
})
