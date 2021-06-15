import React from 'react'
import { BRAWL_MILESTONES, CROWN_REWARDS } from '../../constants/brawl'
import { NotificationContext } from '../NotificationProvider'
import serialisation from '../../helpers/serialisation'

export const BrawlContext = React.createContext([])

const getInitialBrawlData = id => {
  try {
    const deserialise = brawl => ({
      ...brawl,
      matches: serialisation.brawl.deserialise(brawl.matches),
    })

    return JSON.parse(localStorage.getItem('sk.brawl.' + id)).map(deserialise)
  } catch (error) {
    const now = Date.now()
    // Every type of Brawl is stored separately as an array. Each entry in that
    // array constitutes a weekly Brawl of the given type (e.g. construct =2
    // movement). The last item in the array is the currently displayed Brawl;
    // the other ones are only maintained to be able to do comparison stats.
    return [{ createdAt: now, updatedAt: now, id: id, matches: [] }]
  }
}

export default function BrawlProvider(props) {
  const STORAGE_KEY = 'sk.brawl.' + props.id
  const [brawls, setBrawls] = React.useState(getInitialBrawlData(props.id))
  const brawl = brawls[brawls.length - 1] || {}
  const { notify: sendNotification } = React.useContext(NotificationContext)
  const notify = React.useCallback(
    message => sendNotification({ icon: 'crown', children: message }),
    [sendNotification]
  )
  const milestones = BRAWL_MILESTONES[props.difficulty || 'LEGACY']

  React.useEffect(() => {
    if (brawls.length > 1) {
      notify('Locally saved Brawl data found and loaded.')
    }
    // We only want to run that once on page load if there were locally saved
    // Brawls, so we need to make sure not to pass `brawls` as a dependency,
    // otherwise this is going to run every time the Brawl data gets updated.
    // eslint-disable-next-line
  }, [notify])

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
  const updateMatch = (index, match) =>
    updateCurrentBrawl(brawl => ({
      ...brawl,
      updatedAt: Date.now(),
      matches: [
        ...brawl.matches.slice(0, index),
        match,
        ...brawl.matches.slice(index + 1),
      ],
    }))

  const crowns = brawl.matches.reduce(
    (crowns, match) => crowns + CROWN_REWARDS[match.status],
    0
  )

  const resetBrawl = discard => {
    const now = Date.now()

    setBrawls(brawls => [
      ...brawls.slice(0, discard ? -1 : undefined),
      {
        createdAt: now,
        updatedAt: now,
        id: props.id,
        matches: [],
      },
    ])
  }

  const coinsSpent = (() => {
    let crowns = 0
    let currentMilestone = 0

    return brawl.matches.reduce((acc, match) => {
      const gameCost = milestones[currentMilestone].cost
      acc += gameCost
      crowns += CROWN_REWARDS[match.status]
      currentMilestone = milestones.findIndex(
        milestone => milestone.crowns > crowns
      )

      return acc
    }, 0)
  })()

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
    if (typeof groups[props.id].length) {
      setBrawls(
        groups[props.id].map(brawl => ({
          ...brawl,
          matches: serialisation.brawl.deserialise(brawl.matches),
        }))
      )
    }
  }

  return (
    <BrawlContext.Provider
      value={{
        id: props.id,
        brawl,
        addMatch,
        updateMatch,
        resetBrawl,
        restoreBrawls,
        meta: {
          crowns,
          coinsSpent,
          milestone: milestones.findIndex(
            milestone => milestone.crowns > crowns
          ),
        },
      }}
    >
      {props.children}
    </BrawlContext.Provider>
  )
}
