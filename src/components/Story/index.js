import React from 'react'
import { useInView } from 'react-intersection-observer'
import Page from '../Page'
import HorizontalRule from '../HorizontalRule'
import Notice from '../Notice'
import Only from '../Only'
import Link from '../Link'
import MicroMarkdown from '../MicroMarkdown'
import StoriesMore from '../StoriesMore'
import { STORY_CATEGORIES } from '../../constants/stories'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'

export default React.memo(function Story(props) {
  const [ref, inView] = useInView()
  const { story } = props

  return (
    <>
      <Page
        extend={
          story.type === 'poem'
            ? { textAlign: 'center', fontSize: '120%' }
            : undefined
        }
        title={story.title}
        author={story.author}
        image={'/assets/images/cards/' + getRawCardData(story.cardId).image}
        description={getExcerpt(story.content.replace('---', ''), 160)}
        background={STORY_CATEGORIES[story.category].background}
        meta={getReadingTime(story.content)}
        action={{
          to: '/stories/' + story.category,
          children: 'Back to stories',
        }}
        withAvif
        isEditorialContent
        withDropCap={story.type !== 'poem'}
      >
        <Page.Narrow>
          <MicroMarkdown content={story.content} />
        </Page.Narrow>
      </Page>

      <div ref={ref}>{inView && <StoriesMore {...story} />}</div>

      <HorizontalRule />

      <Notice icon='quill'>
        Looking to contribute to the Stormbound lore?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-story' }}>
          Have your own story published
        </Link>
        .
      </Notice>
    </>
  )
})
