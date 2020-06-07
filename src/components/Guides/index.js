import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import GuideTeaser from '../GuideTeaser'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import guides from '../../data/guides'
import { CATEGORIES } from '../../constants/guides'
import chunk from '../../helpers/chunk'
import useViewportWidth from '../../hooks/useViewportWidth'

const Category = props =>
  chunk(props.guides, 3).map((row, index) => (
    <Row key={index} desktopOnly wideGutter>
      <Column width='1/3'>{row[0] && <GuideTeaser {...row[0]} />}</Column>
      <Column width='1/3'>{row[1] && <GuideTeaser {...row[1]} />}</Column>
      <Column width='1/3'>{row[2] && <GuideTeaser {...row[2]} />}</Column>
    </Row>
  ))

export default React.memo(function Guides(props) {
  const viewportWidth = useViewportWidth()
  const relevantGuides = guides.filter(
    guide => guide.category === props.category
  )

  return (
    <>
      <Only.Desktop>
        <HeaderBanner
          title={
            CATEGORIES[props.category].name[
              viewportWidth >= 700 ? 'long' : 'short'
            ]
          }
        />
      </Only.Desktop>

      <Category guides={relevantGuides} />

      <Notice icon='compass'>
        Looking to teach others and guide them towards glorious battles?{' '}
        <Link to='/faq#adding-a-guide'>Have your own guide published</Link>.
      </Notice>

      <PageMeta
        title='Guides'
        description='Find guides from the community about Stormbound and improve your gameplay and knowledge about the game'
      />
    </>
  )
})
