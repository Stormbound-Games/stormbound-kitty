import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
id,
title,
date,
author,
"slug": slug.current,
"cardId": card -> id,
excerpt
`

export const MAPPER = release => {
  release.date = serializeDate(release.date)

  return release
}
