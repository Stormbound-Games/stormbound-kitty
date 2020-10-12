import React from 'react'
import Masonry from 'react-masonry-css'
import Article from '../Article'
import PageMeta from '../PageMeta'
import { CATEGORIES } from '../../constants/guides'
import getTermsForLetter from '../../helpers/getTermsForLetter'
import getLexiconTerms from '../../helpers/getLexiconTerms'
import './index.css'

const Terms = React.memo(function Terms(props) {
  const terms = getLexiconTerms()

  return (
    <ul className='Terms'>
      {Object.keys(props.terms).map(term => (
        <li key={term} className='Terms__item'>
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
  )
})

export default React.memo(function Lexicon(props) {
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
        className='Lexicon'
        columnClassName='Lexicon__column'
      >
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <React.Fragment key={letter}>
            <h2 className='Lexicon__title'>{letter}</h2>
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
