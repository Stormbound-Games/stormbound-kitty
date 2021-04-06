import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import FeedItem from '../FeedItem'
import Image from '../Image'
import Info from '../Info'
import MemberToC from '../MemberToC'
import PageMeta from '../PageMeta'
import Row from '../Row'
import useMemberContent from '../../hooks/useMemberContent'
import './index.css'
import { VIDEOS } from '../Videos'

export default React.memo(function Member(props) {
  const match = useRouteMatch()
  const id = match.params.memberId.toLowerCase()
  const { count, content, details, displayName: name } = useMemberContent(id)
  const channel = VIDEOS.find(channel => channel.author.toLowerCase() === id)
  // This is basically a hack for people listed as video content creators, but
  // without any contributions to the site itself.
  const displayName = channel ? channel.author : name

  return (
    <Article
      title={displayName}
      action={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {count} contribution{count === 1 ? '' : 's'}
          {details.donations.length > 0 || details.contributions.length > 0 ? (
            <>
              {' '}
              · {details.donations.length > 1 ? 'Super ' : null}
              <abbr title='Kitty Appreciation Team'>KAT</abbr> member
            </>
          ) : (
            ''
          )}
        </>
      }
    >
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <p>
            <span className='Highlight'>{displayName}</span> is a member of the
            Stormbound community. Their contribution can be found below.
          </p>

          <MemberToC {...details} />

          {details.donations.length > 0 && (
            <Info
              icon={details.donations.length > 1 ? 'super-star' : 'star'}
              title='Financial contributor'
            >
              {displayName} is one of the generous contributors who can make
              Stormbound-Kitty a reality. Thank you and welcome to the{' '}
              <abbr title='Kitty Appreciation Team'>KAT</abbr>!
            </Info>
          )}

          {details.contributions.length > 0 && (
            <Info icon='hammer' title='Technical contributor'>
              {displayName} is one of the skilled contributors who help make
              Stormbound-Kitty better every day. Thank you and welcome to the{' '}
              <abbr title='Kitty Appreciation Team'>KAT</abbr>!
            </Info>
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          {count > 0 || channel ? (
            <ul className='Member__feed'>
              {channel && (
                <div className='Member__item'>
                  <FeedItem {...channel} type='YOUTUBE' />
                </div>
              )}
              {content.map((entry, index) => (
                <li key={index} className='Member__item'>
                  <FeedItem {...entry} user={id} />
                </li>
              ))}
            </ul>
          ) : (
            <div className='Member__empty'>
              <Image
                src='/assets/images/cards/sweetcap_kittens.png'
                className='Error__image'
                withAvif
              />
              <p>
                No ‘{displayName}’ user could be found, or no content was
                associated to that user. If you believe this is a bug, please
                report it to Kitty#1909 on Discord.
              </p>
            </div>
          )}
        </Row.Column>
      </Row>

      <PageMeta
        noIndex={count === 0 && !channel}
        title={displayName}
        description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      />
    </Article>
  )
})
