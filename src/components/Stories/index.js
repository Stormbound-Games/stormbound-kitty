import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Teasers from '~/components/Teasers'
import Link from '~/components/Link'
import getExcerpt from '~/helpers/getExcerpt'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import capitalize from '~/helpers/capitalize'

const StoryAuthor = React.memo(function StoryAuthor(props) {
  return (
    <>
      {capitalize(props.type || 'story')} by{' '}
      <Link to={'/members/' + props.author.toLowerCase()}>{props.author}</Link>{' '}
    </>
  )
})

const getStoryTeaser = cardsIndex => story => {
  const meta = <StoryAuthor {...story} />

  return {
    ...story,
    card: {
      ...getResolvedCardData(cardsIndex, { id: story.cardId, level: 1 }),
      ...story.card,
    },
    meta: meta,
    excerpt: story.excerpt,
    to: `/stories/${story.slug}`,
  }
}

export default React.memo(function Stories(props) {
  const { cardsIndex } = React.useContext(CardsContext)

  return <Teasers items={props.stories.map(getStoryTeaser(cardsIndex))} />
})
