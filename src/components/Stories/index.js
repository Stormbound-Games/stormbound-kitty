import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Teasers from '~/components/Teasers'
import Link from '~/components/Link'
import ListLayoutItem from '~/components/ListLayoutItem'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'

export default React.memo(function Stories(props) {
  const { cardsIndex } = React.useContext(CardsContext)

  return (
    <>
      {props.layout === 'GRID' ? (
        <Teasers
          items={props.stories.map(story => {
            const card = {
              ...getResolvedCardData(cardsIndex, {
                id: story.cardId,
                level: 1,
              }),
              ...story.card,
            }
            const meta = (
              <>
                By{' '}
                <Link to={'/members/' + story.author.slug}>
                  {story.author.name}
                </Link>{' '}
                in {formatDate(parseDate(story.date))}
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
      ) : props.layout === 'LIST' ? (
        props.stories.map(story => (
          <ListLayoutItem
            key={story.title}
            date={story.date}
            title={story.title}
            author={story.author}
            icon='quill'
            path={`/stories/${story.slug}`}
            excerpt={story.excerpt}
          />
        ))
      ) : null}
    </>
  )
})
