import React from 'react'
import Banner from '../Banner'
import MemberSection from '../MemberSection'
import getRawCardData from '../../helpers/getRawCardData'

export default React.memo(function MemberGuides(props) {
  if (props.guides.length === 0) return null

  return (
    <MemberSection>
      {props.guides.map(guide => {
        return (
          <Banner
            key={guide.name}
            faction={guide.faction}
            title={guide.name}
            subline={`By ${guide.author}`}
            copy={guide.excerpt}
            cta={{
              'aria-label': `Read ${guide.name} by ${guide.author}`,
              to: guide.link,
              children: 'Read guide',
            }}
            image={'/assets/images/cards/' + getRawCardData(guide.cardId).image}
          />
        )
      })}
    </MemberSection>
  )
})
