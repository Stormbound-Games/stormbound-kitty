import React from 'react'
import { Link } from 'react-router-dom'
import chapters from '../../data/stories.easternHeat'
import PageMeta from '../PageMeta'
import HeaderBanner from '../HeaderBanner'
import InfoHint from '../InfoHint'
import Stories from '../Stories'

export default React.memo(function StoriesEasternHeat(props) {
  const title = 'Eastern Heat'
  const description =
    'Read ‘Eastern Heat’, the immersive saga by Zyries about Stormbound'

  return (
    <>
      <HeaderBanner background='/assets/images/dragons.jpg' title={title} />
      <Stories stories={chapters} columns={3} />
      <InfoHint icon='quill'>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </InfoHint>
      <PageMeta title={title} author='Zyries' description={description} />
    </>
  )
})
