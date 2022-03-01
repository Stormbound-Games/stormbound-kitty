import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
title,
meta,
date,
"hosts": coalesce(users[] -> name, hosts),
href,
excerpt
`

export const MAPPER = podcast => {
  podcast.date = serializeDate(podcast.date)
  return podcast
}
