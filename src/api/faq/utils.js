import blocks from '~/api/misc/blocks'

export const FIELDS = `
"id": id.current,
title,
priority,
entries[] {
  id,
  question,
  answer[] { ${blocks} }
}
`
