import { getEntries } from '~/helpers/sanity'

const getChannels = async ({ isPreview } = {}) => {
  const users = await getEntries({
    conditions: [
      '_type == "user"',
      'defined(channel.thumbnail)',
      'defined(channel.href)',
      'defined(channel.description)',
    ],
    fields: `channel, "author": name`,
    options: { order: 'author asc', isPreview },
  })

  return users.map(user => ({ author: user.author, ...user.channel }))
}

export default getChannels
