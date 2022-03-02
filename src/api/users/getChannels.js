import { getEntries } from '~/helpers/sanity'

const getChannels = async ({ isPreview } = {}) => {
  const users = await getEntries({
    conditions: [
      '_type == "user"',
      'defined(channel.thumbnail)',
      'defined(channel.href)',
      'defined(channel.description)',
    ],
    fields: `channel, "user": { name, "slug": slug.current }`,
    options: { order: 'author asc', isPreview },
  })

  return users
}

export default getChannels
