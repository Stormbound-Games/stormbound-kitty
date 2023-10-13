import unfetch from 'isomorphic-unfetch'
import track from '#helpers/track'

const minifyUrl = (url, { baseUrl = '' } = {}) => {
  track('shorten_url')

  return unfetch(baseUrl + '/api/shorten?url=' + encodeURIComponent(url))
    .then(response => response.json())
    .then(data => data.shortLink || url)
    .catch(() => url)
}

export default minifyUrl
