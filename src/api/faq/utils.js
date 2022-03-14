import blocks from '~/api/users/blocks'

export const FIELDS = `
_id,
"id": id.current,
title,
order,
entries[] {
  "id": id.current,
  question,
  answer[] { ${blocks} }
}
`
