const minifyUrl = url => {
  return window
    .fetch('/api/shorten?url=' + encodeURIComponent(url), { method: 'GET' })
    .then(response => response.json())
    .then(response => response.shortLink || url)
    .catch(() => url)
}

export default minifyUrl
