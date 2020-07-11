import React from 'react'
import { RELEASE_DATE } from '../../constants/game'

export const UpdateContext = React.createContext(false)

export default React.memo(function UpdateProvider(props) {
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    window
      .fetch('http://worldtimeapi.org/api/timezone/Europe/Berlin.json')
      .then(response => response.json())
      .then(response => setEnabled(new Date(response.datetime) >= RELEASE_DATE))
  }, [])

  return (
    <UpdateContext.Provider value={enabled}>
      {props.children}
    </UpdateContext.Provider>
  )
})
