import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Notice from '../Notice'
import Only from '../Only'
import PageMeta from '../PageMeta'
import getExcerpt from '../../helpers/getExcerpt'
import toSentence from '../../helpers/toSentence'
import { CATEGORIES } from '../../constants/guides'
import styles from './styles'

const Guide = React.memo(function Guide(props) {
  return (
    <>
      <Article
        className='Guide'
        meta={CATEGORIES[props.category].name.short}
        authors={props.authors}
        title={props.name}
        background={props.background}
        action={{
          to: '/guides/' + CATEGORIES[props.category].slug,
          children: 'Back to guides',
        }}
        ratio={props.ratio}
        withAvif
        withEditorialContent
      >
        <Article.Narrow>{props.children}</Article.Narrow>
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

// Guides have a narrow width by default, imposed by the `Article.Narrow`
// wrapper, but it is sometimes necessary to display something across the full
// width of the container. For that, the `Guide.FullWidth` sub-component
// can be used.
Guide.FullWidth = React.memo(function FullWidth(props) {
  return (
    <Article.Embed
      extend={styles.fullWidth}
      style={{ '--padding': props.padding }}
    >
      {props.children}
    </Article.Embed>
  )
})

export default Guide
