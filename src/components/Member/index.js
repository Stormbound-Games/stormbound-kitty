import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import FeedItem from '~/components/FeedItem'
import Image from '~/components/Image'
import Info from '~/components/Info'
import MemberToC from '~/components/MemberToC'
import Row from '~/components/Row'
import useUser from '~/hooks/useUser'
import styles from './styles'

export default React.memo(function Member(props) {
  const { css } = useFela()
  const [currentUser] = useUser()
  const isCurrentUser = currentUser
    ? currentUser.slug === props.user.slug
    : false
  const { channel, playerId, ...user } = props.user

  return (
    <Page
      title={isCurrentUser ? 'Activity Feed' : props.user.name}
      description={`Find all of ${props.user.name}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      noIndex={props.feed.length === 0 && !channel}
      action={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {props.feed.length} contribution
          {props.feed.length === 1 ? '' : 's'}
          {props.user.role === 'KAT' || props.user.role === 'SUPER_KAT' ? (
            <>
              {' '}
              · {props.user.role === 'SUPER_KAT' ? 'Super ' : null}
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
              <span className='Highlight'>{props.user.name}</span> is a member
              of the Stormbound community. Their contributions can be found
              below.
            </p>
          )}

          <MemberToC feed={props.feed} />

          {props.hasDonated && (
            <Info
              icon={props.user.role === 'SUPER_KAT' ? 'super-star' : 'star'}
              title='Financial contributor'
            >
              <p>
                {isCurrentUser ? 'You are' : <>{props.user.name} is</>} one of
                the generous contributors who can make Stormbound-Kitty a
                reality. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}

          {props.hasContributed > 0 && (
            <Info icon='hammer' title='Technical contributor'>
              <p>
                {isCurrentUser ? 'You are' : <>{props.user.name} is</>} one of
                the skilled contributors who help make Stormbound-Kitty better
                every day. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          {props.feed.length > 0 || channel || playerId ? (
            <ul className={css(styles.feed)}>
              {playerId && (
                <li className={css(styles.item)}>
                  <FeedItem playerId={playerId} user={user} _type='playerId' />
                </li>
              )}
              {channel && (
                <li className={css(styles.item)}>
                  <FeedItem {...channel} user={user} _type='channel' />
                </li>
              )}
              {props.feed.map((entry, index) => (
                <li key={index} className={css(styles.item)}>
                  <FeedItem {...entry} user={user} />
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
                No ‘{props.user.name}’ user could be found, or no content was
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
