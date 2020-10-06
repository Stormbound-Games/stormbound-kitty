import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import Column from '../Column'
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
  const { content, details, displayName: name } = useMemberContent(id)
  const channel = VIDEOS.find(channel => channel.author.toLowerCase() === id)
  // This is basically a hack for people listed as video content creators, but
  // without any contributions to the site itself.
  const displayName = channel ? channel.author : name

  return (
    <Article
      title={displayName}
      backLink={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {content.length} contribution{content.length === 1 ? '' : 's'}
          {details.donations.length > 0 ? (
            <>
              {' '}
              · <abbr title='Kitty Appreciation Team'>KAT</abbr> member
            </>
          ) : (
            ''
          )}
        </>
      }
    >
      <Article.FullWidth>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <p>
              <span className='Highlight'>{displayName}</span> is a member of
              the Stormbound community. Their contribution can be found below.
            </p>

            <MemberToC {...details} />

            {details.donations.length > 0 && (
              <Info icon='heart' title='Financial contributor'>
                {displayName} is one of the generous contributors who can make
                Stormbound-Kitty a reality. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </Info>
            )}

            {channel && (
              <Info icon='youtube' title='Video creator'>
                {displayName} is a video content creator. Be sure to check their
                video on{' '}
                <a
                  href={channel.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  their YouTube channel
                </a>
                .
              </Info>
            )}
          </Column>
          <Column width='2/3'>
            {content.length > 0 ? (
              <ul className='Member__feed'>
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
          </Column>
        </Row>
      </Article.FullWidth>

      <PageMeta
        noIndex={content.length === 0}
        title={displayName}
        description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      />
    </Article>
  )
})
