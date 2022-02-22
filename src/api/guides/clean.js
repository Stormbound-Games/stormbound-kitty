const clean = guide => {
  const [year, month] = guide.date.split(/[-/]/g)

  guide.date = month + '/' + year
  guide.slug = guide.slug.current

  if (guide.background) {
    guide.background = guide.background.asset.url + '?auto=format'
  }

  delete guide._createdAt
  delete guide._updatedAt
  delete guide._id
  delete guide._rev
  delete guide._type

  return guide
}

export default clean
