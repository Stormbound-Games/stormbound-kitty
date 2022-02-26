const clean = release => {
  const [year, month] = release.date.split(/[-/]/g)

  release.date = month + '/' + year
  release.slug = release.slug.current

  if (release.background) {
    if (typeof release.background.ratio === 'number') {
      release.ratio = release.background.ratio + '%'
    }
    release.background = release.background.asset.url + '?auto=format'
  }

  delete release._createdAt
  delete release._updatedAt
  delete release._id
  delete release._rev
  delete release._type

  return release
}

export default clean
