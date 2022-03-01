import blocks from '~/api/misc/blocks'

export const FIELDS = `
"id": id.current,
title,
entries[] {
  id,
  question,
  answer[] { ${blocks} }
}
`
