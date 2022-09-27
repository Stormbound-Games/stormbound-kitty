import unfetch from 'isomorphic-unfetch'

const minifyUrl = (url, { baseUrl = '' } = {}) =>
  unfetch(baseUrl + '/api/shorten?url=' + encodeURIComponent(url))
    .then(response => response.json())
    .then(data => data.shortLink || url)
    .catch(() => url)

export default minifyUrl
