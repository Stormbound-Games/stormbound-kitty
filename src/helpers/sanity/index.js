import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5hlpazgd',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
})

export const createQuery = ({ conditions, fields = '...', options = {} }) => {
  const slice = typeof options.slice !== 'undefined' ? `[${options.slice}]` : ''
  const order = options.order ? `| order(${options.order})` : ''

  return `*[${conditions.join(' && ')}] { ${fields} } ${order} ${slice}`
}

export const getEntry = ({ conditions, fields, params, options = {} }) => {
  const query = createQuery({
    conditions,
    fields,
    options: { ...options, slice: 0 },
  })

  return client.fetch(query, params)
}

export const getEntries = ({ conditions, fields, params, options = {} }) => {
  const query = createQuery({ conditions, fields, options })

  return client.fetch(query, params)
}
