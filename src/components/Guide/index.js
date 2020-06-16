import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Notice from '../Notice'
import Only from '../Only'
import PageMeta from '../PageMeta'
import getExcerpt from '../../helpers/getExcerpt'
import { CATEGORIES } from '../../constants/guides'
import './index.css'

export default React.memo(function Guide(props) {
  return (
    <>
      <Article
        className='Guide'
        readingTime={props.readingTime}
        author={props.author}
        title={props.name}
        background={props.background}
        backLink={{
          to: '/guides/' + CATEGORIES[props.category].slug,
          children: 'Back to guides',
        }}
      >
        {props.children}
      </Article>

      <hr />

      <Notice icon='compass'>
        Looking to teach others and guide them towards glorious battles?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to='/faq#adding-a-guide'>Have your own guide published</Link>.
      </Notice>

      <PageMeta
        author={props.author}
        title={props.name}
        image={props.background}
        description={getExcerpt(props.excerpt, 160)}
      />
    </>
  )
})
