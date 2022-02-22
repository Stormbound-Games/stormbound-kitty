const clean = contribution => {
  const [year, month] = contribution.date.split(/[-/]/g)

  contribution.date = month + '/' + year

  delete contribution._createdAt
  delete contribution._updatedAt
  delete contribution._id
  delete contribution._rev
  delete contribution._type

  return contribution
}

export default clean
