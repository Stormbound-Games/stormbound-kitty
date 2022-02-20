require('module-alias').addAlias('~', __dirname + '/../src')

const fs = require('fs')
const sanityClient = require('@sanity/client')
const artworks = require('~/data/artworks.json')

const client = sanityClient({
  projectId: '5hlpazgd',
  dataset: 'production',
  apiVersion: '2022-02-01',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
})

artworks.slice(0, 1).forEach(artwork => {
  client.assets
    .upload(
      'image',
      fs.createReadStream(`./public/assets/images/art/${artwork.image}`)
    )
    .then(document => {
      console.log('The image was uploaded!', document)
    })
    .catch(error => {
      console.error('Upload failed:', error.message)
    })
})
