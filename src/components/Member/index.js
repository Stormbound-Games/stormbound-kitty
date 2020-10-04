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
import capitalise from '../../helpers/capitalise'
import useMemberContent from '../../hooks/useMemberContent'
import './index.css'

export default React.memo(function Member(props) {
  const match = useRouteMatch()
  const id = match.params.memberId.toLowerCase()
  const displayName = capitalise(id)
  const { content, details } = useMemberContent(id)

  return (
    <Article title={displayName}>
      <Article.FullWidth>
        {content.length > 0 ? (
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
            </Column>
            <Column width='2/3'>
              <ul className='Member__feed'>
                {content.map((entry, index) => (
                  <li key={index} className='Member__item'>
                    <FeedItem {...entry} user={id} />
                  </li>
                ))}
              </ul>
            </Column>
          </Row>
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
      </Article.FullWidth>

      <PageMeta
        noIndex={content.length === 0}
        title={displayName}
        description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      />
    </Article>
  )
})
