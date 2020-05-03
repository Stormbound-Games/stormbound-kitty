import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import chapters from '../../data/stories.easternHeat'
import Article from '../Article'
import InfoHint from '../InfoHint'
import MicroMarkdown from '../MicroMarkdown'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Stories from '../Stories'
import Title from '../Title'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'

export default React.memo(function StoryEasternHeat(props) {
  const match = useRouteMatch()
  const chapter = +match.params.chapter
  const story = chapters[chapter - 1]
  const otherChapters = chapters.filter(c => c.title !== story.title)

  return (
    <>
      <Article
        title={story.title}
        author='Zyries'
        readingTime={getReadingTime(story.content)}
        backLink={{
          to: '/stories/eastern-heat',
          children: 'Back to index',
        }}
      >
        <MicroMarkdown content={story.content} />
      </Article>

      <Title>
        Other chapters<Only.Desktop> from Eastern Heat</Only.Desktop>
      </Title>
      <Stories stories={otherChapters} columns={3} />

      <InfoHint>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </InfoHint>

      <PageMeta
        title={story.title}
        author={story.author}
        image={story.card.image}
        description={getExcerpt(story.content, 160)}
      />
    </>
  )
})
