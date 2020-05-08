import React from 'react'
import { MILESTONES } from '../../constants/brawl'
import { NotificationContext } from '../NotificationProvider'

export const BrawlContext = React.createContext([])

export default function BrawlProvider(props) {
  const STORAGE_KEY = 'sk.brawl.' + props.id
  const now = Date.now()
  const [brawl, setBrawl] = React.useState({
    createdAt: now,
    updatedAt: now,
    id: props.id,
    matches: [],
  })
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'sword', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    try {
      const savedBrawl = JSON.parse(localStorage.getItem(STORAGE_KEY))

      if (savedBrawl) {
        setBrawl(savedBrawl)
        notify('Locally saved brawl found and loaded.')
      }
    } catch (error) {}
  }, [STORAGE_KEY, notify])

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(brawl))
  }, [STORAGE_KEY, brawl])

  const addMatch = match =>
    setBrawl(brawl => ({
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
        crowns,
        milestone: MILESTONES.find(milestone => milestone.crowns >= crowns),
      }}
    >
      {props.children}
    </BrawlContext.Provider>
  )
}
