import React from 'react'
import { MILESTONES } from '../../constants/brawl'
import { NotificationContext } from '../NotificationProvider'
import serialisation from '../../helpers/serialisation'

export const BrawlContext = React.createContext([])

export default function BrawlProvider(props) {
  const STORAGE_KEY = 'sk.brawl.' + props.id
  const now = Date.now()
  // Every type of Brawl is stored separately as an array. Each entry in that
  // array constitutes a weekly Brawl of the given type (e.g. construct =2
  // movement). The last item in the array is the currently displayed Brawl; the
  // other ones are only maintained to be able to do comparison stats.
  const [brawls, setBrawls] = React.useState([
    {
      createdAt: now,
      updatedAt: now,
      id: props.id,
      matches: [],
    },
  ])
  const brawl = brawls[brawls.length - 1] || {}

  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'sword', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    try {
      const savedBrawls = JSON.parse(localStorage.getItem(STORAGE_KEY)).map(
        brawl => ({
          ...brawl,
          matches: serialisation.brawl.deserialise(brawl.matches),
        })
      )

      if (savedBrawls) {
        setBrawls(savedBrawls)
        notify('Locally saved Brawl data found and loaded.')
      }
    } catch (error) {}
  }, [STORAGE_KEY, notify])

  React.useEffect(() => {
    const data = brawls.map(brawl => ({
      ...brawl,
      matches: serialisation.brawl.serialise(brawl.matches),
    }))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [STORAGE_KEY, brawls])

  // `updateCurrentBrawl` is just a shorthand to manipulate the last item in the
  // array of Brawls.
  const updateCurrentBrawl = handler =>
    setBrawls(brawls => [
      ...brawls.slice(0, -1),
      handler(brawls[brawls.length - 1]),
    ])

  const addMatch = match =>
    updateCurrentBrawl(brawl => ({
      ...brawl,
      updatedAt: Date.now(),
      matches: [...brawl.matches, match],
    }))

  const crowns = brawl.matches.reduce(
    (crowns, match) => crowns + (match.status === 'LOST' ? 1 : 5),
    0
  )

  return (
    <BrawlContext.Provider
      value={{
        id: props.id,
        brawl,
        addMatch,
        meta: {
          crowns,
          milestone: MILESTONES.find(milestone => milestone.crowns >= crowns),
        },
      }}
    >
      {props.children}
    </BrawlContext.Provider>
  )
}
