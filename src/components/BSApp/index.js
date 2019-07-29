import React from 'react'
import puzzles from '../../data/puzzles'
import AppDesktop from '../BSAppDesktop'
import AppMobile from '../BSAppMobile'
import useViewportWidth from '../../helpers/useViewportWidth'

const BSApp = props => {
  const viewportWidth = useViewportWidth()

  const puzzle = puzzles.find(puzzle => puzzle.board === props.simId)
  const shouldRenderLeftPanel =
    props.mode === 'EDITOR' ||
    (props.mode === 'DISPLAY' && props.cards.filter(c => !!c.id).length > 0)
  const shouldRenderRightPanel =
    props.mode === 'EDITOR' || (props.mode === 'DISPLAY' && !!puzzle)

  return viewportWidth >= 700 ? (
    <AppDesktop
      {...props}
      puzzle={puzzle}
      shouldRenderLeftPanel={shouldRenderLeftPanel}
      shouldRenderRightPanel={shouldRenderRightPanel}
      isMobile={false}
      openSettingsPanel={() => void 0}
      closeSettingsPanel={() => void 0}
      openCellPanel={() => void 0}
      closeCellPanel={() => void 0}
    />
  ) : (
    <AppMobile
      {...props}
      puzzle={puzzle}
      shouldRenderLeftPanel={shouldRenderLeftPanel}
      shouldRenderRightPanel={shouldRenderRightPanel}
      isMobile={true}
      isDragging={false}
      setIsDragging={() => void 0}
      setDndSource={() => void 0}
      setDndTarget={() => void 0}
    />
  )
}

export default BSApp
