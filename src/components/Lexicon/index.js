import React from 'react'
import { useFela } from 'react-fela'
import Masonry from 'react-masonry-css'
import Article from '../Article'
import PageMeta from '../PageMeta'
import Spacing from '../Spacing'
import { CATEGORIES } from '../../constants/guides'
import getTermsForLetter from '../../helpers/getTermsForLetter'
import getLexiconTerms from '../../helpers/getLexiconTerms'
import styles from './styles'

const Terms = React.memo(function Terms(props) {
  const { css } = useFela()
  const terms = getLexiconTerms()

  return (
    <Spacing bottom='LARGE'>
      <ul className={css(styles.terms)}>
        {Object.keys(props.terms).map(term => (
          <li key={term} className={css(styles.item)}>
            {term}:{' '}
            {terms[term].map((entry, index) => (
              <React.Fragment key={index}>
                {entry}
                {index < terms[term].length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </Spacing>
  )
})

export default React.memo(function Lexicon(props) {
  const { css } = useFela()
  return (
    <Article
      title='Lexicon'
      author='Kitty'
      meta={CATEGORIES.ESSENTIALS.name.short}
      action={{
        to: '/guides/' + CATEGORIES.ESSENTIALS.slug,
        children: 'Back to guides',
      }}
    >
      <Masonry
        breakpointCols={{ default: 2, 700: 2, 500: 1 }}
        className={css(styles.lexicon)}
        columnClassName={css(styles.column)}
      >
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <React.Fragment key={letter}>
            <h2 className={css(styles.title)}>{letter}</h2>
            <Terms terms={getTermsForLetter(letter)} />
          </React.Fragment>
        ))}
      </Masonry>

      <PageMeta
        title='Lexicon'
        description='Find a list of terms and abbreviations for Stormbound'
      />
    </Article>
  )
})
