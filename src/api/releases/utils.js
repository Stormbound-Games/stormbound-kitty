import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
id,
title,
date,
"author": user -> { name, "slug": slug.current },
"slug": slug.current,
"cardId": card -> { "id": coalesce(id.current, id) }.id,
excerpt
`

export const MAPPER = release => {
  release.date = serializeDate(release.date)

  return release
}
