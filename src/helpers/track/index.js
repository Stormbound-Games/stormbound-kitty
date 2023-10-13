import va from '@vercel/analytics'

const track = (eventName, props = {}) => {
  if (!va.track) {
    return console.log(
      `Failed attempt to track event ‘${eventName}’ with props`,
      props,
    )
  }

  va.track(eventName, props)
}

export default track
