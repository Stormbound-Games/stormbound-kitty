export default (search, ignored) =>
  ignored.length > 0
    ? '*Search: ' +
      search
        .split(/\s+/g)
        .map(term => (ignored.includes(term) ? `~~${term}~~` : term))
        .join(' ') +
      '*'
    : ''
