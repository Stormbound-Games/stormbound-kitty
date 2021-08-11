import React from 'react'
import { useFela } from 'react-fela'
import PageHeaderMeta from '../PageHeaderMeta'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Spacing from '../Spacing'
import styles from './styles'

export const PageContext = React.createContext({
  isEditorialContent: false,
  withDropCap: false,
})

const Page = React.memo(function Page(props) {
  const action = props.action || {}
  const authors = (props.authors || [props.author]).filter(Boolean)
  const { css } = useFela({
    isEditorialContent: props.isEditorialContent,
    withDropCap: props.withDropCap,
  })

  return (
    <article
      className={[
        css(styles.article, props.extend),
        props.isEditorialContent && 'EditorialContent',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <HeaderBanner
        title={props.title}
        background={props.background}
        ratio={props.ratio}
        withAvif={props.withAvif}
        withoutWebp={props.withoutWebp}
      />

      <PageHeaderMeta authors={authors} meta={props.meta} action={action} />

      <PageContext.Provider
        value={{
          isEditorialContent: props.isEditorialContent,
          withDropCap: props.withDropCap,
        }}
      >
        <div className={css(styles.content)}>{props.children}</div>
      </PageContext.Provider>

      <PageMeta {...props} authors={authors.join(',')} />
    </article>
  )
})

Page.Narrow = React.memo(function Narrow(props) {
  const { withDropCap } = React.useContext(PageContext)
  const { css } = useFela({ withDropCap })

  return (
    <div className={css(styles.narrow, props.extend)} style={props.style}>
      {props.children}
    </div>
  )
})

Page.Embed = React.memo(function Embed(props) {
  return <Spacing vertical={['LARGE', 'LARGER']}>{props.children}</Spacing>
})

export default Page
