require('module-alias/register')
require('dotenv').config()

const sanityClient = require('@sanity/client')
const releases = require('~/data/releases')
const client = sanityClient({
  projectId: '5hlpazgd',
  dataset: 'production',
  apiVersion: '2022-02-01',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
})

releases.forEach(release => {
  const [month, year] = release.date.split('/')
  const doc = {
    _type: 'release',
    title: release.title,
    slug: { current: release.slug },
    excerpt: release.excerpt,
    date: year + '-' + month + '-01',
    id: release.id,
    cardId: release.cardId,
    ratio: parseInt(release.ratio, 10),
  }

  client.create(doc).then(res => {
    console.log(`Document was created, document ID is ${res._id}`)
  })
})

/*
const fetchDocuments = () =>
  client.fetch(`*[_type == 'story'][0...100] {_id, _rev, name}`)

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: { unset: ['content'] },
  }))

const createTransaction = patches =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  )

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})
*/
