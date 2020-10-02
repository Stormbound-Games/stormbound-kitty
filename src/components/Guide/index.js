import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Notice from '../Notice'
import Only from '../Only'
import PageMeta from '../PageMeta'
import getExcerpt from '../../helpers/getExcerpt'
import toSentence from '../../helpers/toSentence'
import { CATEGORIES } from '../../constants/guides'
import './index.css'

const Guide = React.memo(function Guide(props) {
  return (
    <>
      <Article
        className='Guide'
        meta={props.readingTime}
        authors={props.authors}
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
        <Link to={{ pathname: '/faq', hash: '#adding-a-guide' }}>
          Have your own guide published
        </Link>
        .
      </Notice>

      <PageMeta
        author={toSentence(props.authors, 'and')}
        title={props.name}
        image={props.background}
        description={getExcerpt(props.excerpt, 160)}
      />
    </>
  )
})

Guide.FullWidth = Article.FullWidth

export default Guide
