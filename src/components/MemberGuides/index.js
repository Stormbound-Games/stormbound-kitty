import React from 'react'
import Banner from '../Banner'
import MemberSection from '../MemberSection'
import getRawCardData from '../../helpers/getRawCardData'
import toSentence from '../../helpers/toSentence'

export default React.memo(function MemberGuides(props) {
  if (props.guides.length === 0) return null

  return (
    <MemberSection>
      {props.guides.map(guide => {
        const authors = toSentence(guide.authors)

        return (
          <Banner
            key={guide.name}
            faction={guide.faction}
            title={guide.name}
            subline={`By ${authors}`}
            copy={guide.excerpt}
            cta={{
              'aria-label': `Read ${guide.name} by ${authors}`,
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
