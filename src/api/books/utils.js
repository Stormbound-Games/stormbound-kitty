export const FIELDS = `
id,
name,
cost { type, amount },
draws,
odds,
restrictions[] { ... },
"image": image { "url": asset -> url }.url,
`

export const MAPPER = book => {
  const restrictions = book.restrictions || []
  book.only = restrictions.reduce((acc, restriction) => {
    acc[restriction.property] = restriction['value_' + restriction.property]
    return acc
  }, {})
  delete book.restrictions
  return book
}
