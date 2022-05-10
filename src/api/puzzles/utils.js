import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
board,
objective,
date,
image,
name,
"slug": slug.current,
"restrictions": coalesce(restrictions, []),
solution,
"image": image.asset -> url
`

export const MAPPER = puzzle => {
  puzzle.date = serializeDate(puzzle.date)

  return puzzle
}
