import React from 'react'
import { useFela } from 'react-fela'
import Masonry from 'react-masonry-css'
import Embellish from '~/components/Embellish'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import getTermsForLetter from '~/helpers/getTermsForLetter'
import styles from './styles'

const Terms = React.memo(function Terms(props) {
  const { css } = useFela()

  return (
    <Spacing bottom='LARGE'>
      <ul className={css(styles.terms)}>
        {Object.entries(props.terms).map(([term, terms]) => (
          <li key={term} className={css(styles.item)}>
            {term}:{' '}
            {terms.map((entry, index) => (
              <Embellish key={index}>
                {entry}
                {index < terms.length - 1 ? ', ' : ''}
              </Embellish>
            ))}
          </li>
        ))}
      </ul>
    </Spacing>
  )
})

export default React.memo(function PageLexicon(props) {
  const { css } = useFela()

  return (
    <Page
      title='Lexicon'
      description='Find a list of terms and abbreviations for Stormbound'
      isEditorialContent
    >
      <Masonry
        breakpointCols={{ default: 2, 700: 2, 500: 1 }}
        className={css(styles.lexicon)}
        columnClassName={css(styles.column)}
      >
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <React.Fragment key={letter}>
            <h2 className={css(styles.title)}>{letter}</h2>
            <Terms terms={getTermsForLetter(props.abbreviations, letter)} />
          </React.Fragment>
        ))}
      </Masonry>
    </Page>
  )
})
