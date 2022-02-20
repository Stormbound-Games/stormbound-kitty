const clean = artwork => {
  const [year, month] = artwork.date.split('-')
  const { dimensions } = artwork.image.asset.metadata

  artwork.date = month + '/' + year
  artwork.dimensions = dimensions.width + 'x' + dimensions.height
  artwork.image = artwork.image.asset.url + '?auto=format'

  delete artwork._createdAt
  delete artwork._updatedAt
  delete artwork._id
  delete artwork._rev
  delete artwork._type

  return artwork
}

export default clean
