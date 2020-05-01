import React from 'react'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import Row from '../Row'
import getTermsForLetter from '../../helpers/getTermsForLetter'
import getLexiconTerms from '../../helpers/getLexiconTerms'
import './index.css'

const Terms = React.memo(function Terms(props) {
  const terms = getLexiconTerms()

  return (
    <ul className='Terms'>
      {Object.keys(props.terms).map(term => (
        <li key={term}>
          {term}: {terms[term]}
        </li>
      ))}
    </ul>
  )
})

export default React.memo(function Lexicon(props) {
  return (
    <>
      <HeaderBanner
        title='Lexicon'
        background='/assets/images/environment_ironclad.png'
      />

      <Row desktopOnly>
        <Column width='1/4'>
          <h2 className='Lexicon__title'>A</h2>
          <Terms terms={getTermsForLetter('A')} />
          <h2 className='Lexicon__title'>B</h2>
          <Terms terms={getTermsForLetter('B')} />
          <h2 className='Lexicon__title'>C</h2>
          <Terms terms={getTermsForLetter('C')} />
          <h2 className='Lexicon__title'>D</h2>
          <Terms terms={getTermsForLetter('D')} />
          <h2 className='Lexicon__title'>E</h2>
          <Terms terms={getTermsForLetter('E')} />
        </Column>
        <Column width='1/4'>
          <h2 className='Lexicon__title'>F</h2>
          <Terms terms={getTermsForLetter('F')} />
          <h2 className='Lexicon__title'>G</h2>
          <Terms terms={getTermsForLetter('G')} />
          <h2 className='Lexicon__title'>H</h2>
          <Terms terms={getTermsForLetter('H')} />
          <h2 className='Lexicon__title'>I</h2>
          <Terms terms={getTermsForLetter('I')} />
          <h2 className='Lexicon__title'>J</h2>
          <Terms terms={getTermsForLetter('J')} />
          <h2 className='Lexicon__title'>K</h2>
          <Terms terms={getTermsForLetter('K')} />
          <h2 className='Lexicon__title'>L</h2>
          <Terms terms={getTermsForLetter('L')} />
        </Column>
        <Column width='1/4'>
          <h2 className='Lexicon__title'>M</h2>
          <Terms terms={getTermsForLetter('M')} />
          <h2 className='Lexicon__title'>N</h2>
          <Terms terms={getTermsForLetter('N')} />
          <h2 className='Lexicon__title'>O</h2>
          <Terms terms={getTermsForLetter('O')} />
          <h2 className='Lexicon__title'>P</h2>
          <Terms terms={getTermsForLetter('P')} />
          <h2 className='Lexicon__title'>Q</h2>
          <Terms terms={getTermsForLetter('Q')} />
          <h2 className='Lexicon__title'>R</h2>
          <Terms terms={getTermsForLetter('R')} />
          <h2 className='Lexicon__title'>S</h2>
          <Terms terms={getTermsForLetter('S')} />
        </Column>
        <Column width='1/4'>
          <h2 className='Lexicon__title'>T</h2>
          <Terms terms={getTermsForLetter('T')} />
          <h2 className='Lexicon__title'>U</h2>
          <Terms terms={getTermsForLetter('U')} />
          <h2 className='Lexicon__title'>V</h2>
          <Terms terms={getTermsForLetter('V')} />
          <h2 className='Lexicon__title'>W</h2>
          <Terms terms={getTermsForLetter('W')} />
          <h2 className='Lexicon__title'>X</h2>
          <Terms terms={getTermsForLetter('X')} />
          <h2 className='Lexicon__title'>Y</h2>
          <Terms terms={getTermsForLetter('Y')} />
          <h2 className='Lexicon__title'>Z</h2>
          <Terms terms={getTermsForLetter('Z')} />
        </Column>
      </Row>

      <PageMeta
        title='Lexicon'
        description='List of terms and abbreviations for Stormbound.'
      />
    </>
  )
})
