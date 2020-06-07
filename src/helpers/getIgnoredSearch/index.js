const STRATEGIES = {
  COMMA: { regex: /\s*,\s*/g, connector: ',' },
  SPACE: { regex: /\s+/g, connector: ' ' },
}

export default (search, ignored, strategy = 'SPACE') =>
  ignored.length > 0
    ? '*Search: ' +
      search
        .trim()
        .split(STRATEGIES[strategy].regex)
        .map(term => (ignored.includes(term) ? `~~${term}~~` : term))
        .join(STRATEGIES[strategy].connector) +
      '*'
    : ''
