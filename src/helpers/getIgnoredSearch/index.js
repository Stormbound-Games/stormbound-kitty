export default (search, ignored, split = /\s+/g) =>
  ignored.length > 0
    ? '*Search: ' +
      search
        .trim()
        .split(split)
        .map(term => (ignored.includes(term) ? `~~${term}~~` : term))
        .join(' ') +
      '*'
    : ''
