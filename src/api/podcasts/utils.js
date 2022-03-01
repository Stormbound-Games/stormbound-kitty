import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
title,
meta,
date,
hosts,
href,
excerpt
`

export const MAPPER = podcast => {
  podcast.date = serializeDate(podcast.date)
  return podcast
}
