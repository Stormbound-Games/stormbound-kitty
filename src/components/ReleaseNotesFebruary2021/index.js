import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import Only from '../Only'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, Crowns, Rubies } from '../Resource'
import Table from '../Table'
import Title from '../Title'
import getRewardLabel from '../../helpers/getRewardLabel'
import getInitialCardData from '../../helpers/getInitialCardData'
import { MILESTONES } from '../../constants/brawl'

export default React.memo(function ReleaseNotesFebruary2021(props) {
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
            <blockquote>
              When played{' '}
              <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                bordering
              </span>{' '}
              <span className='Highlight'>
                in front or your temple structure or
              </span>{' '}
              your base <span style={{ opacity: 0.7 }}>[…]</span>
            </blockquote>
          </li>
          <li>
            Confused units can no longer go forward. This change indirectly
            impacts <CardLink id='N62' />, <CardLink id='N61' />,{' '}
            <CardLink id='N64' />, <CardLink id='N78' />, <CardLink id='N79' />{' '}
            and <CardLink id='N60' />.
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Title id='new-card'>New card</Title>
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
            <Image src='/assets/images/releases/avatars_3.png' alt='' />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image src='/assets/images/releases/avatars_2.png' alt='' />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image src='/assets/images/releases/avatars_1.png' alt='' />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <Title id='cheapened-brawl'>Cheapened Brawl</Title>

        <p>
          Similar to what happened in{' '}
          <Link to='/releases/11-2020'>November</Link>, the Brawl starting on
          February 11th (and only that one) is going to be cheaper. All fight
          will cost two thirds of their original price.
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
                    Math.round(Math.round((milestone.cost / 3) * 2) / 5) * 5
                  return (
                    <tr key={milestone.crowns}>
                      <td>
                        <Crowns amount={milestone.crowns} />
                      </td>
                      <td>
                        <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
                      </td>
                      <td>{getRewardLabel(milestone, true)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Article.Embed>
        </Only.Desktop>

        <Info icon='equalizer' title='Brawl calculator'>
          <p>
            To calculate how far you can go with a given amount of coins, or how
            much it will cost you to reach a certain milestone, be sure to use
            the <Link to='/calculators/brawl'>Brawl calculator</Link>. It makes
            it possible to define a certain Brawl discount as well (here 66%).
          </p>
        </Info>

        <Title id='valentine-offers'>Valentine offers</Title>

        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The
          Valentine exclusive packs will be available from February 8th (9AM
          CET) until Feburary 14th (end of day) so be sure to jump on them!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Raining Cats</span> ($9.99): guaranteed
            3 copies of each of the 6 rare and epic felines + 3 Classic Tomes
          </li>
          <li>
            <span className='Highlight'>Edrik’s Army</span> ($19.99): 2 copies
            of <CardLink id='N59' /> + 18 cards{' '}
            <a
              href='#most-played-cards'
              aria-describedby='Footnotes'
              id='edriks-army'
              style={{ textDecoration: 'none' }}
            >
              amongst the most played across the last 3 months globally
              <span
                style={{
                  color: 'var(--beige)',
                  marginLeft: '2px',
                  fontSize: '120%',
                }}
              >
                *
              </span>
            </a>
          </li>
          <li>
            <span className='Highlight'>Emblem of Heroism</span> ($49.99): 35
            Heroic Tomes
          </li>
          <li>
            <span className='Highlight'>The Greatest Treasure</span> ($99.99):
            30 cards from each rarity + <Rubies amount={1000} /> +{' '}
            <Coins amount={5000} />
          </li>
        </ul>

        <p>
          On top of that, <span className='Highlight'>all books</span> (but
          Noble) will yield an extra card until the end of the Black Friday
          event. Similarly, the paid bundles yield coins and rubies will also
          grant more resources for the duration of the Black Friday event.
        </p>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes and the player profiles will be effective with the season reset on February 1st. The exclusive offers will be available between February 8th and February 14th (end of day).',
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
