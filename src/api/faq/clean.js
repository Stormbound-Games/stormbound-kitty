const clean = section => {
  section.id = section.id.current
  section.entries.forEach(entry => {
    entry.id = entry.id.current

    delete entry._createdAt
    delete entry._updatedAt
    delete entry._id
    delete entry._rev
    delete entry._type
  })

  delete section._createdAt
  delete section._updatedAt
  delete section._id
  delete section._rev
  delete section._type

  return section
}

export default clean
