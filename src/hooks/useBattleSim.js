import React from 'react'
import clone from 'lodash.clonedeep'
import serialize from 'form-serialize'
import {
  DEFAULT_MANA,
  DEFAULT_CELL,
  DEFAULT_PLAYER,
  DEFAULT_BOARD,
} from '~/constants/battle'
import { CardsContext } from '~/components/CardsProvider'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import serialization from '~/helpers/serialization'
import useNavigator from '~/hooks/useNavigator'

const Z_KEY = 90
const C_KEY = 67
const V_KEY = 86
const X_KEY = 88

const useBattleSim = props => {
  const navigator = useNavigator()
  const { cardsIndex } = React.useContext(CardsContext)
  const [sim, setSim] = React.useState(props.sim)
  const [activeCell, setActiveCell] = React.useState(null)
  const [activePlayer, setActivePlayer] = React.useState(null)
  const [cardSelectValue, setCardSelectValue] = React.useState(null)
  const [undo, setUndo] = React.useState(false)
  const [zoomed, setZoomed] = React.useState(null)
  const [history, setHistory] = React.useState([props.id].filter(Boolean))
  const [copiedCard, setCopiedCard] = React.useState(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dndSource, setDndSource] = React.useState(null)
  const [dndTarget, setDndTarget] = React.useState(null)

  const registerShortcuts = React.useCallback(
    event => {
      switch (event.which) {
        case Z_KEY: {
          if (!(event.metaKey || event.ctrlKey)) return

          // Remove the last entry from the history
          const newHistory = history.slice(0, -1)
          // Retrieve the former second-to-last, now last entry to restore it
          const last = newHistory[newHistory.length - 1]

          if (newHistory.length) {
            setSim(getInitialBattleData(cardsIndex, last))
            setHistory(newHistory)
            setUndo(true)
          }
          return
        }

        case C_KEY: {
          if (!(event.metaKey || event.ctrlKey) || !activeCell) return
          return setCopiedCard(sim.board[activeCell[0]][activeCell[1]])
        }

        case V_KEY: {
          if (!(event.metaKey || event.ctrlKey) || !activeCell || !copiedCard)
            return

          const newBoard = clone(sim.board)

          copyCell(newBoard[activeCell[0]][activeCell[1]], copiedCard)
          setSim(sim => ({ ...sim, board: newBoard }))
          setActivePlayer(copiedCard.player)
          return
        }

        case X_KEY: {
          if (!(event.metaKey || event.ctrlKey) || !activeCell) return

          const newBoard = clone(sim.board)

          copyCell(newBoard[activeCell[0]][activeCell[1]], DEFAULT_CELL)
          setCopiedCard({ ...active })
          setSim(sim => ({ ...sim, board: newBoard }))

          return
        }
      }
    },
    [activeCell, cardsIndex, copiedCard, history, sim.board]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', registerShortcuts)

    return () => {
      document.removeEventListener('keydown', registerShortcuts)
    }
  }, [registerShortcuts])

  React.useEffect(() => {
    // When dragging end, and provided there is a valid source and a valid
    // target, perform board updates
    if (!isDragging && dndSource && dndTarget) {
      const newBoard = clone(sim.board)
      const sourceCell = newBoard[dndSource[0]][dndSource[1]]
      const targetCell = newBoard[dndTarget[0]][dndTarget[1]]
      const targetCellCopy = { ...targetCell }
      const sourceCellCopy = { ...sourceCell }
      const areFromDifferentPlayers =
        !!sourceCell.player &&
        !!targetCell.player &&
        sourceCell.player !== targetCell.player
      const areOnTheSameColumn = dndSource[1] === dndTarget[1]
      const areFacingEachOther = Math.abs(dndSource[0] - dndTarget[0]) === 1
      const areOnTheSameRow = dndSource[0] === dndTarget[0]
      const areNextToEachOther = Math.abs(dndSource[1] - dndTarget[1]) === 1
      const areFacingCorrectDirection =
        sourceCell.player === 'RED'
          ? dndSource[0] < dndTarget[0]
          : dndSource[0] > dndTarget[0]
      const qualifiesAsSidewaysAttack = areOnTheSameRow && areNextToEachOther
      const qualifiesAsFrontAttack =
        areOnTheSameColumn && areFacingEachOther && areFacingCorrectDirection

      // If the swapped cells are filled, in next to each other and from
      // different players, it’s no longer a swap but an attack and should be
      // resolved as such
      if (
        areFromDifferentPlayers &&
        (qualifiesAsSidewaysAttack || qualifiesAsFrontAttack)
      ) {
        // If the defender has more strength than the attacker, it survives the
        // attack, although gets its strength reduced by the strength of the
        // attacker; the attacker cell gets emptied
        if (targetCell.strength > sourceCell.strength) {
          targetCell.strength -= sourceCellCopy.strength

          copyCell(sourceCell, DEFAULT_CELL)
        }
        // If the defender has less strength than the attacker, it dies from
        // the attack, although the attacker gets its strength reduced by the
        // strength of the defender; the attacker cell gets emptied
        // The attacker’s cell (source cell) becomes empty
        // The defender’s cell (target cell) becomes the attacker, with reduced
        // strength
        else if (targetCell.strength < sourceCell.strength) {
          copyCell(targetCell, sourceCellCopy)
          copyCell(sourceCell, DEFAULT_CELL)

          targetCell.strength =
            sourceCellCopy.strength - targetCellCopy.strength
        }
        // If the attacker and the defender have the same amount of strength,
        // they both die from the attack
        else {
          copyCell(targetCell, DEFAULT_CELL)
          copyCell(sourceCell, DEFAULT_CELL)
        }
      } else {
        // If it’s not a combat scenario, simply swap the two cells.
        copyCell(targetCell, sourceCellCopy)
        copyCell(sourceCell, targetCell.card.id ? targetCellCopy : DEFAULT_CELL)
      }

      setActiveCell(null)
      setDndSource(null)
      setDndTarget(null)
      setSim(sim => ({ ...sim, board: newBoard }))
    }
  }, [sim.board, isDragging, dndTarget, dndSource])

  React.useEffect(() => {
    if (props.mode !== 'EDITOR') return

    const id = serialization.battle.serialize(
      sim.board,
      sim.players,
      { mana: sim.mana, gridMarkers: sim.gridMarkers },
      sim.cards
    )

    navigator.replace('/simulators/battle/' + id)

    // If the update was caused by an undo, do not add a new entry into the
    // history and simply mark undo as `false` for the next state update
    if (undo) setUndo(false)
    else setHistory(history => [...history, id].slice(-20))

    // eslint-disable-next-line
  }, [sim, undo])

  React.useEffect(() => {
    // If the display mode has been updated, reset the zoom
    setZoomed(null)

    // If display mode is enabled, reset local board state
    if (props.mode === 'DISPLAY') {
      setActiveCell(null)
      setActivePlayer(null)
      setCardSelectValue(null)
    }
  }, [props.mode])

  const copyCell = (targetCell, sourceCell) => {
    targetCell.strength = sourceCell.strength
    targetCell.level = sourceCell.level
    targetCell.player = sourceCell.player
    targetCell.card = { ...sourceCell.card }
    targetCell.poisoned = sourceCell.poisoned
    targetCell.vitalized = sourceCell.vitalized
    targetCell.frozen = sourceCell.frozen
    targetCell.confused = sourceCell.confused
    targetCell.disabled = sourceCell.disabled
  }

  const updateActiveCell = ({
    strength,
    player,
    level,
    card,
    poisoned,
    vitalized,
    frozen,
    confused,
    disabled,
  }) => {
    const newBoard = clone(sim.board)
    const cell = newBoard[activeCell[0]][activeCell[1]]

    cell.strength = +strength
    cell.level = +level
    cell.player = player
    cell.card = card
    cell.poisoned = poisoned
    cell.vitalized = vitalized
    cell.frozen = frozen
    cell.confused = confused
    cell.disabled = disabled

    setActiveCell(null)
    setCardSelectValue('')
    setSim(sim => ({ ...sim, board: newBoard }))
  }

  const onUnitSubmit = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })
    const card = cardsIndex[cardSelectValue]

    updateActiveCell({
      strength: +formData.strength,
      level: +(formData.level || 1),
      player: activePlayer,
      card: card,
      poisoned: !!formData.poisoned,
      vitalized: !!formData.vitalized,
      frozen: !!formData.frozen,
      confused: !!formData.confused,
      disabled: !!formData.disabled,
    })

    if (
      sim.players[activePlayer].faction === 'neutral' &&
      card.faction !== 'neutral'
    ) {
      setSim(sim => ({
        ...sim,
        players: {
          ...sim.players,
          [activePlayer]: {
            ...sim.players[activePlayer],
            faction: card.faction,
          },
        },
      }))
    }
  }

  const emptyActiveCell = () => updateActiveCell({ ...DEFAULT_CELL })

  const resetBoard = () => {
    setActiveCell(null)
    setActivePlayer(null)
    setCopiedCard(null)
    setSim({
      players: { RED: { ...DEFAULT_PLAYER }, BLUE: { ...DEFAULT_PLAYER } },
      board: [...DEFAULT_BOARD],
      cards: [],
      mana: DEFAULT_MANA,
      gridMarkers: false,
    })
  }

  const setCard =
    index =>
    ({ id, level }) => {
      setSim(sim => {
        const cards = [
          ...sim.cards.slice(0, index),
          {
            id: typeof id !== 'undefined' ? id : sim.cards[index].id,
            level:
              typeof level !== 'undefined' ? level : sim.cards[index].level,
          },
          ...sim.cards.slice(index + 1),
        ]

        return { ...sim, cards }
      })
    }

  const onCellClick = (x, y) => event => {
    const cell = sim.board[x][y]
    const isActiveCell =
      activeCell && x === activeCell[0] && y === activeCell[1]

    if (props.mode === 'DISPLAY') {
      if (cell.card.id) {
        setZoomed({
          id: cell.card.id,
          level: cell.card.token ? cell.strength : cell.level,
          player: cell.player,
        })
      }

      return
    }

    setActiveCell(isActiveCell ? null : [x, y])
    setActivePlayer(
      isActiveCell ? null : cell.card.id ? cell.player : activePlayer || 'BLUE'
    )
  }

  const updateRedPlayer = redPlayer =>
    setSim(sim => ({
      ...sim,
      players: { RED: redPlayer, BLUE: sim.players.BLUE },
    }))
  const updateBluePlayer = bluePlayer =>
    setSim(sim => ({
      ...sim,
      players: { BLUE: bluePlayer, RED: sim.players.RED },
    }))
  const setMana = mana => setSim(sim => ({ ...sim, mana }))
  const unzoom = () => setZoomed(null)

  const toggleGridMarkers = React.useCallback(
    () => setSim(sim => ({ ...sim, gridMarkers: !sim.gridMarkers })),
    []
  )

  return {
    ...sim,
    activeCell,
    activePlayer,
    cardSelectValue,
    zoomed,
    history,
    copiedCard,
    isDragging,
    dndSource,
    dndTarget,
    players: {
      RED: { ...sim.players.RED, update: updateRedPlayer },
      BLUE: { ...sim.players.BLUE, update: updateBluePlayer },
    },
    environment: props.environment,
    mode: props.mode,
    id: props.id,
    resetBoard: resetBoard,
    setActivePlayer: setActivePlayer,
    setActiveCell: setActiveCell,
    onCellClick: onCellClick,
    setMana: setMana,
    setCardSelectValue: setCardSelectValue,
    onUnitSubmit: onUnitSubmit,
    emptyActiveCell: emptyActiveCell,
    setIsDragging: setIsDragging,
    setDndSource: setDndSource,
    setDndTarget: setDndTarget,
    toggleGridMarkers: toggleGridMarkers,
    setCard: setCard,
    zoom: setZoomed,
    unzoom: unzoom,
  }
}

export default useBattleSim
