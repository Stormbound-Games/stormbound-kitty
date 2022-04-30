const track = (eventName, props = {}) => {
  if (!window.plausible) {
    return console.log(
      `Failed attempt to track event ‘${eventName}’ with props`,
      props
    )
  }

  window.plausible(eventName, { props })
}

export default track
