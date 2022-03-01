import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import FeedItem from '~/components/FeedItem'
import Image from '~/components/Image'
import Info from '~/components/Info'
import MemberToC from '~/components/MemberToC'
import Row from '~/components/Row'
import parseDate from '~/helpers/parseDate'
import useMemberName from '~/hooks/useMemberName'
import styles from './styles'

const parseEntryDate = entry => ({
  ...entry,
  date: entry.date ? parseDate(entry.date).valueOf() : entry.date,
})

const addType = type => entry => ({ ...entry, type })

export default React.memo(function Member(props) {
  const { css } = useFela()
  const [name] = useMemberName()
  const content = [
    ...props.content.artwork.map(addType('ART')),
    ...props.content.contribution.map(addType('CONTRIBUTION')),
    ...props.content.deck.map(addType('DECK')),
    ...props.content.donation.map(addType('DONATION')),
    ...props.content.event,
    ...props.content.guide.map(addType('GUIDE')),
    ...props.content.podcast.map(addType('PODCAST')),
    ...props.content.podium.map(addType('PODIUM')),
    ...props.content.puzzle.map(addType('PUZZLE')),
    ...props.content.story.map(addType('STORY')),
    ...props.content.swcc.map(addType('CARD')),
    ...props.content.tournament.map(addType('HOST')),
  ]
    .map(parseEntryDate)
    .sort((a, b) => b.date - a.date)

  const isCurrentUser = name === props.name

  return (
    <Page
      title={isCurrentUser ? 'Activity Feed' : props.name}
      description={`Find all of ${props.name}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      noIndex={props.contributions === 0 && !props.channel}
      action={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {props.contributions} contribution
          {props.contributions === 1 ? '' : 's'}
          {props.role === 'KAT' || props.role === 'SUPER_KAT' ? (
            <>
              {' '}
              · {props.role === 'SUPER_KAT' ? 'Super ' : null}
              <abbr title='Kitty Appreciation Team'>KAT</abbr> member
            </>
          ) : (
            ''
          )}
        </>
      }
      isEditorialContent
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          {isCurrentUser ? (
            <p>
              You are a valuable member of the Stormbound community, thank you!
              Find your contributions below.
            </p>
          ) : (
            <p>
              <span className='Highlight'>{props.name}</span> is a member of the
              Stormbound community. Their contributions can be found below.
            </p>
          )}

          <MemberToC {...props.content} />

          {props.content.donation.length > 0 && (
            <Info
              icon={props.role === 'SUPER_KAT' ? 'super-star' : 'star'}
              title='Financial contributor'
            >
              <p>
                {isCurrentUser ? 'You are' : <>{props.name} is</>} one of the
                generous contributors who can make Stormbound-Kitty a reality.
                Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}

          {props.content.contribution.length > 0 && (
            <Info icon='hammer' title='Technical contributor'>
              <p>
                {isCurrentUser ? 'You are' : <>{props.name} is</>} one of the
                skilled contributors who help make Stormbound-Kitty better every
                day. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          {props.contributions > 0 || props.channel ? (
            <ul className={css(styles.feed)}>
              {props.channel && (
                <li className={css(styles.item)}>
                  <FeedItem
                    {...props.channel}
                    type='YOUTUBE'
                    displayName={props.name}
                  />
                </li>
              )}
              {content.map((entry, index) => (
                <li key={index} className={css(styles.item)}>
                  <FeedItem
                    {...entry}
                    date={new Date(entry.date)}
                    user={props.slug}
                    displayName={props.name}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className={css(styles.empty)}>
              <Image
                src='https://cdn.sanity.io/images/5hlpazgd/production/f675c9ec86b27088ee6433b53433a9a3fdd96803-512x512.png'
                alt='Sparkly Kitties'
                extend={styles.image}
                width={250}
                height={280}
                lazy
              />
              <p>
                No ‘{props.name}’ user could be found, or no content was
                associated to that user. If you believe this is a bug, please
                report it to Kitty#1909 on Discord.
              </p>
            </div>
          )}
        </Row.Column>
      </Row>
    </Page>
  )
})
