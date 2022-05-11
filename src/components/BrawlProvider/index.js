import React from 'react'
import { NotificationContext } from '~/components/NotificationProvider'
import getBrawlStatus from '~/helpers/getBrawlStatus'
import serialization from '~/helpers/serialization'

export const BrawlContext = React.createContext([])

const getDefaultBrawlData = id => {
  const now = Date.now()

  return [{ createdAt: now, updatedAt: now, id, matches: [] }]
}

const getInitialBrawlData = id => {
  try {
    const deserialize = brawl => ({
      ...brawl,
      matches: serialization.brawl.deserialize(brawl.matches),
    })

    return JSON.parse(localStorage.getItem('sk.brawl.' + id)).map(deserialize)
  } catch (error) {
    // Every type of Brawl is stored separately as an array. Each entry in that
    // array constitutes a weekly Brawl of the given type (e.g. construct =2
    // movement). The last item in the array is the currently displayed Brawl;
    // the other ones are only maintained to be able to do comparison stats.
    return getDefaultBrawlData(id)
  }
}

export default React.memo(function BrawlProvider(props) {
  const STORAGE_KEY = 'sk.brawl.' + props.brawl.id
  const [sessions, setSessions] = React.useState(
    getDefaultBrawlData(props.brawl.id)
  )
  const session = React.useMemo(
    () => sessions[sessions.length - 1] || {},
    [sessions]
  )
  const { notify: sendNotification } = React.useContext(NotificationContext)
  const notify = React.useCallback(
    message => sendNotification({ icon: 'crown', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    const sessions = getInitialBrawlData(props.brawl.id)

    setSessions(sessions)

    if (sessions.length > 1) {
      notify('Locally saved Brawl data found and loaded.')
    }
    // We only want to run that once on page load if there were locally saved
    // Brawls, so we need to make sure not to pass `sessions` as a dependency,
    // otherwise this is going to run every time the Brawl data gets updated.
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const data = sessions.map(session => ({
      ...session,
      matches: serialization.brawl.serialize(session.matches),
    }))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [STORAGE_KEY, sessions])

  // `updateCurrentSession` is just a shorthand to manipulate the last item in
  // the array of Brawls.
  const updateCurrentSession = handler =>
    setSessions(sessions => [
      ...sessions.slice(0, -1),
      handler(sessions[sessions.length - 1]),
    ])

  const addMatch = match =>
    updateCurrentSession(session => ({
      ...session,
      updatedAt: Date.now(),
      matches: [...session.matches, match],
    }))
  const updateMatch = (index, match) =>
    updateCurrentSession(session => ({
      ...session,
      updatedAt: Date.now(),
      matches: [
        ...session.matches.slice(0, index),
        match,
        ...session.matches.slice(index + 1),
      ],
    }))

  const resetBrawl = discard => {
    const now = Date.now()

    setSessions(sessions => [
      ...sessions.slice(0, discard ? -1 : undefined),
      {
        createdAt: now,
        updatedAt: now,
        id: props.brawl.id,
        matches: [],
      },
    ])
  }

  const restoreBrawls = items => {
    // Group all Brawl entries coming from the CSV per ID, to group similar
    // Brawl together.
    const groups = items.reduce((groups, item) => {
      if (typeof groups[item.id] === 'undefined') {
        groups[item.id] = []
      }
      groups[item.id].push(item)
      return groups
    }, {})

    // For each Brawl type present in the CSV, sort the entries by date and set
    // them in the local storage.
    Object.keys(groups).forEach(id => {
      const brawls = groups[id]
        .slice(0)
        .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))

      localStorage.setItem('sk.brawl.' + id, JSON.stringify(brawls))
    })

    // If there were saved entries from the current Brawl, update the state so
    // the view re-renders.
    if (groups[props.brawl.id].length) {
      setSessions(
        groups[props.brawl.id].map(brawl => ({
          ...brawl,
          matches: serialization.brawl.deserialize(brawl.matches),
        }))
      )
    }
  }

  const meta = React.useMemo(
    () => getBrawlStatus(session.matches, props.difficulty),
    [session, props.difficulty]
  )

  return (
    <BrawlContext.Provider
      value={{
        info: props.brawl,
        session,
        addMatch,
        updateMatch,
        resetBrawl,
        restoreBrawls,
        meta,
      }}
    >
      {props.children}
    </BrawlContext.Provider>
  )
})
