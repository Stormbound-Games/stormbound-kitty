import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import HeaderBanner from '../HeaderBanner'
import Icon from '../Icon'
import Spacing from '../Spacing'
import styles from './styles'

export const ArticleContext = React.createContext({
  isEditorialContent: false,
  withDropCap: false,
})

export const renderAuthorsLinks = (acc, author, index, authors) => {
  if (authors.length > 1 && index === authors.length - 1) {
    acc.push(' and ')
  } else if (index !== 0) {
    acc.push(', ')
  }

  acc.push(
    <Link to={`/member/${author}`} key={author}>
      {author}
    </Link>
  )

  return acc
}

const Article = React.memo(function Article(props) {
  const action = props.action || {}
  const authors = (props.authors || [props.author]).filter(Boolean)
  const { css } = useFela({
    smallFontSize: props.smallFontSize,
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

      <p className={css(styles.meta)}>
        {authors.length > 0 && (
          <span>
            By&nbsp;{authors.reduce(renderAuthorsLinks, [])}
            {props.meta && <>&nbsp;·&nbsp;</>}
          </span>
        )}
        {props.meta}
        {Object.keys(action).length > 0 &&
          (action.onClick ? (
            <button
              type='button'
              onClick={action.onClick}
              disabled={action.disabled}
              className={css(styles.action) + ' ButtonAsLink'}
            >
              {action.icon && (
                <Icon icon={action.icon} extend={styles.actionIcon} />
              )}
              <span>{action.children}</span>
            </button>
          ) : (
            <Link
              to={action.to}
              href={action.href}
              inNewTab={!!action.href}
              extend={styles.action}
            >
              {action.to && (
                <Icon
                  icon={action.icon || 'arrow-left'}
                  extend={styles.actionIcon}
                />
              )}
              <span>{action.children}</span>
              {action.href && (
                <Icon
                  icon={action.icon || 'arrow-right'}
                  extend={styles.actionIcon}
                />
              )}
            </Link>
          ))}
      </p>

      <ArticleContext.Provider
        value={{
          isEditorialContent: props.isEditorialContent,
          withDropCap: props.withDropCap,
        }}
      >
        <div className={css(styles.content)}>{props.children}</div>
      </ArticleContext.Provider>
    </article>
  )
})

Article.Narrow = React.memo(function Narrow(props) {
  const { withDropCap } = React.useContext(ArticleContext)
  const { css } = useFela({ withDropCap })

  return (
    <div className={css(styles.narrow, props.extend)} style={props.style}>
      {props.children}
    </div>
  )
})

Article.Embed = React.memo(function Embed(props) {
  return <Spacing vertical={['LARGE', 'LARGER']}>{props.children}</Spacing>
})

export default Article
