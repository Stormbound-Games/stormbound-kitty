import getEvents from './getEvents'

const getEventsFromAuthor = async author => {
  const events = await getEvents()

  return events.filter(event =>
    event.authors.map(memver => memver.toLowerCase()).includes(author)
  )
}

export default getEventsFromAuthor
