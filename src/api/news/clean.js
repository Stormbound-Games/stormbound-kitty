const clean = event => {
  delete event._createdAt
  delete event._updatedAt
  delete event._id
  delete event._rev
  delete event._type

  return event
}

export default clean
