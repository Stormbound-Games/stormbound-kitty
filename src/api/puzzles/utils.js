import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"user": user -> { name, "slug": slug.current },
board,
category,
date,
difficulty,
image,
name,
restrictions,
"image": image { "url": asset -> url }.url
`

export const MAPPER = puzzle => {
  puzzle.date = serializeDate(puzzle.date)
  puzzle.restrictions = puzzle.restrictions || []

  return puzzle
}
