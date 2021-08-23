import React from 'react'
import { useFela } from 'react-fela'
import HorizontalRule from '~/components/HorizontalRule'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import getExcerpt from '~/helpers/getExcerpt'
import { CATEGORIES } from '~/constants/guides'
import styles from './styles'

export const GuideRenderingContext = React.createContext({
  isWithinGuide: false,
})

const Guide = React.memo(function Guide(props) {
  return (
    <>
      <Page
        title={props.name}
        description={getExcerpt(props.excerpt, 160)}
        image={props.background}
        authors={props.authors}
        meta={CATEGORIES[props.category].name.short}
        background={props.background}
        action={{
          to: '/guides/' + CATEGORIES[props.category].slug,
          children: 'Back to guides',
        }}
        ratio={props.ratio}
        withAvif
        isEditorialContent
        withDropCap
      >
        <Page.Narrow>
          <GuideRenderingContext.Provider value={{ isWithinGuide: true }}>
            {props.children}
          </GuideRenderingContext.Provider>
        </Page.Narrow>
      </Page>

      <HorizontalRule />

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
    </>
  )
})

// Guides have a narrow width by default, imposed by the `Page.Narrow`
// wrapper, but it is sometimes necessary to display something across the full
// width of the container. For that, the `Guide.FullWidth` sub-component
// can be used.
Guide.FullWidth = React.memo(function FullWidth(props) {
  const { css } = useFela()

  return (
    <div
      className={css(styles.fullWidth)}
      style={{ '--padding': props.padding }}
    >
      <Spacing vertical={['LARGE', 'LARGER']}>{props.children}</Spacing>
    </div>
  )
})

export default Guide
