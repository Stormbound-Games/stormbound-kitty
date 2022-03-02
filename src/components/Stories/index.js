import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Teasers from '~/components/Teasers'
import Link from '~/components/Link'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function Stories(props) {
  const { cardsIndex } = React.useContext(CardsContext)

  return (
    <Teasers
      items={props.stories.map(story => {
        const card = {
          ...getResolvedCardData(cardsIndex, { id: story.cardId, level: 1 }),
          ...story.card,
        }
        const meta = (
          <>
            Story by{' '}
            <Link to={'/members/' + story.author.slug}>
              {story.author.name}
            </Link>{' '}
          </>
        )

        return {
          ...story,
          card,
          meta,
          excerpt: story.excerpt,
          to: `/stories/${story.slug}`,
        }
      })}
    />
  )
})
