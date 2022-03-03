const getTermsForLetter = (terms, letter) => {
  return Object.keys(terms)
    .sort((a, b) => a.localeCompare(b))
    .filter(term => term.toUpperCase().startsWith(letter))
    .reduce((acc, term) => {
      acc[term] = terms[term]
      return acc
    }, {})
}

export default getTermsForLetter
