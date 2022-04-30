import getIP from '~/helpers/getIP'
import isChecklyRequest from '~/helpers/isChecklyRequest'

const API_URL = 'https://plausible.io/api/event'

const getHeaders = request => ({
  'User-Agent': request.headers['user-agent'],
  'X-Forwarded-For': getIP(request),
  'Content-Type': 'application/json',
})

const getBody = (eventName, pathname, props) => ({
  name: eventName,
  domain: 'stormbound-kitty.com',
  url: 'https://stormbound-kitty.com' + pathname,
  props,
})

const trackAsync = async (request, eventName, pathname, props = {}) => {
  if (
    process.env.NODE_ENV !== 'production' ||
    // Avoid Checkly’s automated checks registering pageviews.
    isChecklyRequest(request)
  ) {
    return console.log(
      `Failed attempt to track event ‘${eventName}’ at ‘${pathname}’ with props`,
      props
    )
  }

  try {
    return await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(request),
      body: JSON.stringify(getBody(eventName, pathname, props)),
    })
  } catch (error) {
    // Make sure failing to register a tracking event does not cause an error.
    return console.error(
      `Failed attempt to track event ‘${eventName}’ at ‘${pathname}’ with props`,
      props,
      error
    )
  }
}

export default trackAsync
