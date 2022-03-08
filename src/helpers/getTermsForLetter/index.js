const getTermsForLetter = (abbreviations, letter) => {
  return Object.keys(abbreviations)
    .sort((a, b) => a.localeCompare(b))
    .filter(term => term.toUpperCase().startsWith(letter))
    .reduce((acc, term) => {
      acc[term] = abbreviations[term]
      return acc
    }, {})
}

export default getTermsForLetter
