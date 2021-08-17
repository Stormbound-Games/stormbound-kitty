import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import FeedItem from '~/components/FeedItem'
import Image from '~/components/Image'
import Info from '~/components/Info'
import MemberToC from '~/components/MemberToC'
import Row from '~/components/Row'
import isKATMember from '~/helpers/isKATMember'
import useMemberContent from '~/hooks/useMemberContent'
import useRouter from '~/hooks/useRouter'
import styles from './styles'
import VIDEOS from '~/data/videos'

export default React.memo(function Member(props) {
  const { css } = useFela()
  const { params } = useRouter()
  const id = params.memberId.toLowerCase()
  const { count, content, details, displayName: name } = useMemberContent(id)
  const channel = VIDEOS.find(channel => channel.author.toLowerCase() === id)
  // This is basically a hack for people listed as video content creators, but
  // without any contributions to the site itself.
  const displayName = channel ? channel.author : name
  const { isKAT, isSuperKAT } = isKATMember(details)

  return (
    <Page
      title={displayName}
      description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      noIndex={count === 0 && !channel}
      action={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {count} contribution{count === 1 ? '' : 's'}
          {isKAT ? (
            <>
              {' '}
              · {isSuperKAT ? 'Super ' : null}
              <abbr title='Kitty Appreciation Team'>KAT</abbr> member
            </>
          ) : (
            ''
          )}
        </>
      }
      isEditorialContent
    >
      <Row isDesktopOnly withWideGutter>
        <Row.Column width='1/3'>
          <p>
            <span className='Highlight'>{displayName}</span> is a member of the
            Stormbound community. Their contribution can be found below.
          </p>

          <MemberToC {...details} />

          {details.donations.length > 0 && (
            <Info
              icon={isSuperKAT ? 'super-star' : 'star'}
              title='Financial contributor'
            >
              <p>
                {displayName} is one of the generous contributors who can make
                Stormbound-Kitty a reality. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}

          {details.contributions.length > 0 && (
            <Info icon='hammer' title='Technical contributor'>
              <p>
                {displayName} is one of the skilled contributors who help make
                Stormbound-Kitty better every day. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          {count > 0 || channel ? (
            <ul className={css(styles.feed)}>
              {channel && (
                <li className={css(styles.item)}>
                  <FeedItem {...channel} type='YOUTUBE' />
                </li>
              )}
              {content.map((entry, index) => (
                <li key={index} className={css(styles.item)}>
                  <FeedItem {...entry} user={id} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={css(styles.empty)}>
              <Image
                src='/assets/images/cards/sweetcap_kittens.png'
                extend={styles.image}
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
    </Page>
  )
})
