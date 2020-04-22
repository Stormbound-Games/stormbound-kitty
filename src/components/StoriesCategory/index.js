import React from 'react'
import { Link } from 'react-router-dom'
import stories from '../../data/stories'
import Banner from '../Banner'
import PageMeta from '../PageMeta'
import capitalise from '../../helpers/capitalise'
import getExcerpt from '../../helpers/getExcerpt'
import getRawCardData from '../../helpers/getRawCardData'
import sortCards from '../../helpers/sortCards'

const StoriesCategory = props => {
  const categoryName = capitalise(props.category)
  const categoryStories = stories.filter(
    story => story.category === props.category
  )
  const sortCardsInCategory = (a, b) =>
    sortCards()(getRawCardData(a.cardId), getRawCardData(b.cardId))

  return (
    <>
      <h1 className='VisuallyHidden'>{categoryName} stories</h1>

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
            subline={
              <>
                By <Link to={'/member/' + story.author}>{story.author}</Link>
              </>
            }
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

      <PageMeta
        title={`${categoryName} stories`}
        description={`Stories from the community about ${categoryName} Stormbound cards`}
      />
    </>
  )
}

export default StoriesCategory
