import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CheapenedBrawl from '../CheapenedBrawl'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, Rubies, Stones } from '../Resource'
import Table from '../Table'
import Title from '../Title'
import TogglableContent from '../TogglableContent'
import displayBundle from '../../helpers/displayBundle'
import getCalendarValue from '../../helpers/getCalendarValue'
import getRewardLabel from '../../helpers/getRewardLabel'
import getInitialCardData from '../../helpers/getInitialCardData'
import rewards from './rewards'

export default React.memo(function ReleaseNotesFebruary2021(props) {
  const [isTableExpanded, expandTable] = React.useState(false)

  return (
    <ReleaseNotes id='02_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          February, bringing balance changes (and a well-deserved confusion
          buff), custom avatars, a cheap Brawl and some exclusive offers as
          usual!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-card'>New card</a>
          </li>
          <li>
            <a href='#player-profiles'>Player profiles</a>
          </li>
          <li>
            <a href='#daily-check-in-calendar'>Daily check-in calendar</a>
          </li>
          <li>
            <a href='#valentine-offers'>Valentine offers</a>
          </li>
          <li>
            <a href='#cheapened-brawl'>Cheapened Brawl</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please wear a mask and avoid
            unnecessary travels—especially if you live in an area with rampant
            COVID-19 cases. It takes everyone’s effort to slow down this
            pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any others, brings some balance changes.</p>
        <ul>
          <li>
            <CardLink id='N56' />’ ability trigger is being extended.
            <blockquote style={{ textIndent: 0 }}>
              When played{' '}
              <s style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                bordering
              </s>{' '}
              <span className='Highlight'>
                on the tile in front of your temple structure or
              </span>{' '}
              your base, spawn 4/5/6/7/8 strength Knights on all{' '}
              <s style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                tiles in the same row
              </s>{' '}
              <span className='Highlight'>of its bordering tiles</span>
            </blockquote>
          </li>
          <li>
            Confused units can no longer go forward. This change indirectly
            impacts <CardLink id='N62' />, <CardLink id='N61' />,{' '}
            <CardLink id='N64' />, <CardLink id='N78' />, <CardLink id='N79' />{' '}
            and <CardLink id='N60' />.
          </li>
        </ul>
        <Title id='new-card'>New card</Title>
        <p>
          On February 8th, a new temple card will be introduced: the Temple of
          Heart. Look how pretty it is! 💖
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N81')} />
      </Article.Embed>

      <Article.Narrow>
        <Title id='player-profiles'>Player profiles</Title>
        <p>
          A brand new feature is coming with this release:{' '}
          <span className='Highlight'>player profiles</span>. Every player will
          be able to select a portrait amongst a predefined collection as well
          as a preferred faction, both of which will show up in the friends
          list.
        </p>

        <p>
          As a result, the Fortress Level screen is being rebranded “Player
          Profile”, suggesting there will be more content to come, eventually
          fleshing out advanced player profiles!
        </p>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatars_3.png'
              alt='Player profile screen showcasing the new player avatar'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatars_2.png'
              alt='Avatar selection screen offering 9 different avatars from characters in the game'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatars_1.png'
              alt='Friend list screen displayed players’ avatar and preferred faction'
            />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <CheapenedBrawl ratio={(1 / 3) * 2}>
          <p>
            Similar to what happened in{' '}
            <Link to='/releases/11-2020'>November</Link>, the Brawl starting on
            February 11th (and only that one) is going to be cheaper. All fight
            will cost two thirds of their original price.
          </p>
        </CheapenedBrawl>

        <Title id='daily-check-in-calendar'>Daily check-in calendar</Title>

        <p>
          The daily check-in calendar will pursue in Feburary. It will work
          exactly like the{' '}
          <Link to='/releases/12-2020#daily-check-in-calendar'>
            Advent Calendar from December
          </Link>{' '}
          and will cost only $5 to boost to Premium.
        </p>

        <p>
          This is the total value for the calendar, free and premium
          respectively (including free rewards within the premium one):{' '}
        </p>
        <ul>
          <li>
            Total free rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'FREE'))}
          </li>
          <li>
            Total Premium (including free) rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'PREMIUM'))}
          </li>
        </ul>

        <TogglableContent
          isExpanded={isTableExpanded}
          id='reward-table'
          renderToggle={toggleProps => (
            <p>
              Refer to the following table to get the rewards breakdown per day.{' '}
              <button
                {...toggleProps}
                type='button'
                className='ButtonAsLink'
                onClick={() => expandTable(isExpanded => !isExpanded)}
              >
                {isTableExpanded
                  ? '- Hide table breakdown'
                  : '+ Show table breakdown'}
              </button>
            </p>
          )}
        >
          <Table>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Day</th>
                <th>Free</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map(([free, premium], index) => (
                <tr key={index}>
                  <td style={{ width: '100px' }}>#{index + 1}</td>
                  <td>{getRewardLabel(free, true)}</td>
                  <td>{getRewardLabel(premium, true)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TogglableContent>

        <Title id='valentine-offers'>Valentine offers</Title>
        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The
          Valentine exclusive packs will be available from February 8th (9AM
          CET) until Feburary 14th (end of day) so be sure to jump on them!
        </p>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/temple_of_heart_pack.png'
              alt='Temple of Heart ($9.99): 10 copies of the Temple of Heart card, 5 fusions stones and 750 coins'
            />
            <p>
              <span className='Highlight'>Temple of Heart pack</span> ($9.99):
              10 copies of <CardLink id='N81' />, <Stones amount={5} /> and{' '}
              <Coins amount={750} />.
            </p>
          </Row.Column>
          <Row.Column width='1/3'>
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
          <Row.Column width='1/3'>
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
      </Article.Embed>

      <Article.Narrow>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes and the player profiles will be effective with the season reset on February 1st. The new card will be available from February 8th. The exclusive offers will be available between February 8th and February 14th (end of day).',
            },
            {
              id: 'custom-avatars',
              question: 'Will we ever have fully custom avatars?',
              answer:
                'Maybe, but unlikely. Image analysis and moderation to make sure all uploaded content is safe and within the accepted guidelines is really difficult. Most likely, we will extend the predefined collection with more options in the future.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
