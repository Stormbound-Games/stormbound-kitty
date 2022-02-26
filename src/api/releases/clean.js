const clean = release => {
  const [year, month] = release.date.split(/[-/]/g)

  release.date = month + '/' + year
  release.slug = release.slug.current

  if (release.background) {
    release.background = release.background.asset.url + '?auto=format'
  }

  if (typeof release.ratio === 'number') {
    release.ratio = release.ratio + '%'
  }

  delete release._createdAt
  delete release._updatedAt
  delete release._id
  delete release._rev
  delete release._type

  return release
}

export default clean
