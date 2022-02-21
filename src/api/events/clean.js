const clean = event => {
  const [year, month] = event.date.split(/[-/]/g)

  event.date = month + '/' + year
  Object.assign(event, JSON.parse(event.data))

  delete event._createdAt
  delete event._updatedAt
  delete event._id
  delete event._rev
  delete event._type

  return event
}

export default clean
