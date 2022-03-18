const track = (eventName, props = {}) => {
  if (window.plausible) {
    window.plausible(eventName, { props })
  } else {
    console.log(
      'Failed attempt to track event `' + eventName + '` with props',
      props
    )
  }
}

export default track
