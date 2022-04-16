import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
board,
category,
objective,
date,
image,
name,
"slug": slug.current,
restrictions,
solution,
"image": image { "url": asset -> url }.url
`

export const MAPPER = puzzle => {
  puzzle.date = serializeDate(puzzle.date)
  puzzle.restrictions = puzzle.restrictions || []

  return puzzle
}
