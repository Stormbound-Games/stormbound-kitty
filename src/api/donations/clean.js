const clean = donation => {
  const [year, month] = donation.date.split(/[-/]/g)

  donation.date = month + '/' + year

  delete donation._createdAt
  delete donation._updatedAt
  delete donation._id
  delete donation._rev
  delete donation._type

  return donation
}

export default clean
