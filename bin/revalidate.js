require('dotenv').config()
const fetch = require('node-fetch')

const NODE_ENV = process.env.NODE_ENV || 'development'
const NEXT_REVALIDATION_TOKEN = process.env.NEXT_REVALIDATION_TOKEN

const domain =
  NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://stormbound-kitty.com'

const path = process.argv[2]

if (!path) {
  console.error('Missing path to revalidate.')
  process.exit(1)
}

if (!path.startsWith('/')) {
  console.error('Invalid path to revalidate.')
  process.exit(1)
}

console.log('Revalidating', domain + path)
fetch(domain + '/api/revalidate', {
  method: 'POST',
  body: JSON.stringify({ path }),
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + NEXT_REVALIDATION_TOKEN,
  },
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error(response.status + ' ' + response.statusText)
    }
    console.log('Path revalidated', domain + path)
  })
  .catch(error => console.error(error))
