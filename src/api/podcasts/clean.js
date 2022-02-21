const clean = podcast => {
  const [year, month] = podcast.date.split(/[-/]/g)

  podcast.date = month + '/' + year

  delete podcast._createdAt
  delete podcast._updatedAt
  delete podcast._id
  delete podcast._rev
  delete podcast._type

  return podcast
}

export default clean
