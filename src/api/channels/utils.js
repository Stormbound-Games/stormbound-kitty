export const FIELDS = `
_id,
"author": coalesce(user -> name, author),
href,
thumbnail,
description
`
