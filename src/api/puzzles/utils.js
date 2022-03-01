import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"author": coalesce(user -> name, author),
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
