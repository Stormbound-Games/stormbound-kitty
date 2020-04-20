import React from 'react'
import Banner from '../Banner'
import MemberSection from '../MemberSection'
import getExcerpt from '../../helpers/getExcerpt'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const MemberStories = props => {
  if (props.stories.length === 0) return null

  return (
    <MemberSection title={<>Stories by {props.displayName}</>}>
      {props.stories.map(story => {
        const card = getRawCardData(story.cardId)
        const title = story.title || card.name || 'Story'
        const id = window.btoa(
          encodeURIComponent(story.title + '-' + story.author)
        )

        return (
          <Banner
            className='MemberStories__story'
            key={id}
            faction={card.faction}
            title={title}
            subline={`By ${story.author}`}
            copy={getExcerpt(story.content || '', 200)}
            cta={{
              'aria-label': 'Read story about ' + card.name,
              to: '/stories/' + id,
              children: 'Read story',
            }}
            image={card.image}
          />
        )
      })}
    </MemberSection>
  )
}

export default MemberStories
