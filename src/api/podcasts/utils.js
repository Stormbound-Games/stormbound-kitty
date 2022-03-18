import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
title,
meta,
date,
"hosts": users[] -> { name, "slug": slug.current },
href,
excerpt
`

export const MAPPER = podcast => {
  podcast.date = serializeDate(podcast.date)
  return podcast
}
