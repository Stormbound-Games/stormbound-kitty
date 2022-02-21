import getPodcasts from './getPodcasts'

const getPodcastsFromAuthor = async author => {
  const podcasts = await getPodcasts()

  return podcasts.filter(podcast =>
    podcast.hosts.map(host => host.toLowerCase()).includes(author)
  )
}

export default getPodcastsFromAuthor
