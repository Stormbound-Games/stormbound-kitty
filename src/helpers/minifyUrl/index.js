import unfetch from 'isomorphic-unfetch'

const minifyUrl = url => {
  return unfetch('/api/shorten?url=' + encodeURIComponent(url), {
    method: 'GET',
  })
    .then(response => response.json())
    .then(response => response.shortLink || url)
    .catch(() => url)
}

export default minifyUrl
