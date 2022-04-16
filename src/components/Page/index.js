import React from 'react'
import { useFela } from 'react-fela'
import PageEmbed from '~/components/PageEmbed'
import PageHeaderMeta from '~/components/PageHeaderMeta'
import HeaderBanner from '~/components/HeaderBanner'
import PageMeta from '~/components/PageMeta'
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
    <div
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

      <PageMeta
        {...props}
        author={authors.map(author => author.name || author).join(',')}
      />
    </div>
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
  return <PageEmbed>{props.children}</PageEmbed>
})

export default Page
