import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import { Coins, Rubies, Stones } from '~/components/Resource'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesOctober2020(props) {
  const { css } = useFela()

  return (
    <>
      <>
        <p>
          The long awaited “Friendly Matches update” from Sheepyard is finally
          here, and it brings a lot of new things on the table. As always, I’m
          feeling very excited and honored to be able to announce the changes in
          exclusivity.
        </p>

        <TableOfContents>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#friendly-matches-settings'>
              Friendly matches settings
            </Link>
          </li>
          <li>
            <Link href='#social-panel'>Social panel</Link>
          </li>
          <li>
            <Link href='#vanishing-packs'>Vanishing packs</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Title id='new-cards'>New Cards</Title>

        <p>
          As <Link to='/releases/07-2020'>announced back in July</Link>, this
          update introduces two new cards aiming at buffing the confusion
          mechanic: <CardLink id='N78' /> (available as soon as October 1st) and{' '}
          <CardLink id='N79' /> (which will only be available from October 15th
          onwards).
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N78')} />
      </Page.Embed>

      <>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/slyboots_pack.png'
              alt='$9.99 pack: 5 copies of Slyboots + 750 coins + 5 fusion stones'
              extend={{ marginTop: 0 }}
            />
          </Row.Column>
          <Row.Column>
            <p className={css({ marginTop: 'var(--s-base)' })}>
              If you would like to put your hands on this card immediately, a
              $9.99 one-time limited pack grants 5 copies of Slyboots, making it
              possible to get it level 2 right away. It also offers{' '}
              <Coins amount={750} /> and <Stones amount={5} />.
            </p>
          </Row.Column>
        </Row>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N79')} />
      </Page.Embed>

      <>
        <p>
          Additionally, a new card{' '}
          <span className='Highlight'>from a new race</span> makes its entrance:
          Stoic Protectors, an ancient card bringing a whole new mechanic into
          the landscape (which will come out 2 weeks after Excited Mouser).
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N80')} />
      </Page.Embed>

      <>
        <Title id='balance-changes'>Balance Changes</Title>

        <p>
          Following on Sheepyard’s commitment to tweak some cards on a regular
          basis, this update is no exception and changes 12 cards, mostly to
          buff them.
        </p>

        <ul>
          <li>
            <CardLink id='I2' />
            ’s ability now affects surrounding structures at level 2 instead of
            bordering only, all at level 4 instead of surrounding only, and has
            +1 strength at level 3 and to differentiate level 2 and level 3.
          </li>
          <li>
            <CardLink id='I27' />’ strength is increased by 1 (from 3/4/5/6/7 to
            4/5/6/7/8) but their ability remains the same.
          </li>
          <li>
            <CardLink id='I28' /> no longer have initial movement (down from 1).
          </li>
          <li>
            <CardLink id='N25' /> now have 1 movement (up from 0), and their
            ability affect surrounding structures instead of bordering only.
          </li>
          <li>
            <CardLink id='N36' />’ ability now triggers when having at least 2
            surrounding enemies instead of bordering only.
          </li>
          <li>
            <CardLink id='N40' /> now grants more strength to the main target
            (from 5/6/6/8/10 to 6/7/7/9/11).
          </li>
          <li>
            <CardLink id='N49' />’ mana cost is now 6 (down from 7).
          </li>
          <li>
            <CardLink id='N61' />’ ability now triggers for a surrounding enemy
            instead of bordering only.
          </li>
          <li>
            <CardLink id='N66' />’ mana cost is now 2 (down from 3) but their
            strength is now 1/2/3/4/5 (down from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='N69' />
            ’s ability strength limit is increased by 1 (from 3/4/5/6/7 to
            4/5/6/7/8).
          </li>
          <li>
            <CardLink id='S15' /> now affects enemy surrounding a friendly unit
            instead of bordering only.
          </li>
          <li>
            <CardLink id='F4' />
            ’s mana cost is now 2 (up from 1) but deals one more damage (from
            1/2/3/4/5 to 2/3/4/5/6).
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='friendly-matches-settings'>Friendly matches settings</Title>

        <p>
          It has been announced and snapshot a few times on Discord over the
          last few weeks so it’s no longer a surprise for many of you: advanced
          friendly matches are coming!
        </p>
        <p>
          When starting a friendly match with an in-game friend, it is now
          possible to:
        </p>
        <ul>
          <li>cap the level of cards (from 1 to 5)</li>
          <li>cap the fortress level (1, 3, 6, 9, 10, 11, 12, 14, 17, 20)</li>
          <li>pick the starting mana (1, 3, 6, 9, 12, 15, 18, 21 or 24)</li>
          <li>
            set up a turn counter (10, 20 or 30; with possibility of ties as
            shown in the video below)
          </li>
          <li>apply Brawl modifiers</li>
        </ul>

        <p>
          Not all these settings are available to all players. They get unlocked
          as one progresses throughout the game.
        </p>
      </>

      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Image
            src='/assets/images/releases/friendly_matches_2.png'
            alt='A screenshot of the new advanced friendly matches options for a new player'
            extend={{ marginTop: 0 }}
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Image
            src='/assets/images/releases/friendly_matches_3.png'
            alt='A screenshot of the new advanced friendly matches options for a high-level player'
            extend={{ marginTop: 0 }}
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <video
            src='/assets/images/releases/draw.mp4'
            muted
            controls
            className={css({ maxWidth: '100%', display: 'block' })}
          ></video>
        </Row.Column>
      </Row>

      <>
        <Title id='social-panel'>Social panel</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <p>
              The “social panel” has been hyped a few times on Discord over the
              last few weeks, and is a good testament of Sheepyard’s intents to
              grow the game and its community.
            </p>
            <p>
              It features Discord, Reddit, Stormbound-Kitty (needless to say I’m
              deeply honored to be featured in the game), the Stormbound Wiki
              (by FrozenEarth) and social networks (Facebook, Twitter and
              Instagram).
            </p>
            <p>
              Connecting with Stormbound on Facebook, Twitter and Instagram will
              grant <Rubies amount={10} /> for each, so <Rubies amount={30} />{' '}
              total. Not bad for just a few taps!
            </p>

            <p className='Highlight'>
              Additionally, there will be many more UI improvements aiming at
              making the game overall better.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/social_panel.png'
              alt='New in-game social panel feature Discord, Reddit, Stormbound-Kitty, the wiki and social networks'
              extend={{ marginTop: 0 }}
            />
          </Row.Column>
        </Row>

        <Title id='vanishing-packs'>Vanishing Packs</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/vanishing_packs.png'
              alt='A screenshot of the new tab dedicated to vanishing packs'
              extend={{ marginTop: 0 }}
            />
          </Row.Column>
          <Row.Column>
            <p>
              For those of you who are not against putting a few Real-Life
              Coins™ in the game every now and then, you will be pleased to know
              that there are now many more packs called{' '}
              <span className='Highlight'>vanishing packs</span>.
            </p>

            <p>
              Every day, every week, and every month (client local time 9AM),
              you will be offered one random resource pack and one random card
              pack (amongst the existing ones).
            </p>

            <p>
              All daily packs cost $1.99, all weekly packs cost $9.99 and all
              monthly packs cost $29.99. These packs can be bought only once per
              period and are specific to your shop.
            </p>

            <p>
              The exhaustive list of all existing packs will be released at a
              later stage.
            </p>
          </Row.Column>
        </Row>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'new-cards-date',
              question: 'When will the new cards be available in game?',
              answer: (
                <>
                  <CardLink id='N78' /> will be available as of October 1st,{' '}
                  <CardLink id='N79' /> from October 15th onwards, and Stoic
                  Protectors 2 weeks after that.
                </>
              ),
            },
            {
              id: 'milestone-1',
              question:
                'Why the first Brawl milestone reward a Classic Tome and not a Humble book as usual?',
              answer:
                'This is a minor bug and will stay like this for this week but will be fixed for the next Brawl.',
            },
            {
              id: 'extra-coins',
              question: 'How come I received 300 coins?',
              answer:
                'Anyone logging into the game before October 2nd 11:59pm CET will be awarded 300 coins. This is a global compensation to apologize for the multiple hotfixes interrupting the game on October 1st, particularly Brawl matches.',
            },
            {
              id: 'doctor-mia',
              question: 'Why are level 2 and level 3 of Doctor Mia the same?',
              answer: 'This is a known oversight and will be addressed soon..',
            },
          ]}
        />
      </>
    </>
  )
})
