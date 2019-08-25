import React from 'react'
import Banner from '../Banner'
import PageMeta from '../PageMeta'
import stories from '../../data/stories'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import sortCards from '../../helpers/sortCards'
import capitalise from '../../helpers/capitalise'

const StoriesCategory = props => {
  const categoryName = capitalise(props.category)
  const categoryStories = stories.filter(
    story => getRawCardData(story.cardId).faction === props.category
  )
  const sortCardsInCategory = (a, b) =>
    sortCards()(getRawCardData(a.cardId), getRawCardData(b.cardId))

  return (
    <>
      <h1 className="visually-hidden">{categoryName} stories</h1>

      {categoryStories.sort(sortCardsInCategory).map(story => {
        const card = getRawCardData(story.cardId)
        const title = story.title || card.name || 'Story'
        const id = window.btoa(
          encodeURIComponent(story.title + '-' + story.author)
        )

        return (
          <Banner
            key={id}
            faction={card.faction}
            title={title}
            subline={`By ${story.author}`}
            copy={getExcerpt(story.content || '', 200)}
            cta={{
              'aria-label': 'Read story about ' + card.name,
              to: '/stories/' + id,
              children: 'Read story'
            }}
            image={card.image}
          />
        )
      })}

      <PageMeta
        title={`${categoryName} stories`}
        description={`Stories from the community about ${categoryName} Stormbound cards`}
      />
    </>
  )
}

export default StoriesCategory
