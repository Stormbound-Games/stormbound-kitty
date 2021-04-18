import React from 'react'
import AppDesktop from '../BattleSimAppDesktop'
import AppMobile from '../BattleSimAppMobile'
import State from '../BattleSimState'
import useViewportSize from '../../hooks/useViewportSize'

const BattleSimPage = React.memo(function BattleSimPage(props) {
  const { viewportWidth } = useViewportSize()
  const shouldRenderLeftPanel =
    props.mode === 'EDITOR' ||
    (props.mode === 'DISPLAY' && props.cards.filter(c => !!c.id).length > 0)
  const shouldRenderRightPanel =
    props.mode === 'EDITOR' || (props.mode === 'DISPLAY' && !!props.puzzle)

  return viewportWidth >= 700 ? (
    <AppDesktop
      {...props}
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
      shouldRenderLeftPanel={shouldRenderLeftPanel}
      shouldRenderRightPanel={shouldRenderRightPanel}
      isMobile={true}
      isDragging={false}
      setIsDragging={() => void 0}
      setDndSource={() => void 0}
      setDndTarget={() => void 0}
    />
  )
})

export default props => (
  <State mode={props.mode} simId={props.simId}>
    {state => (
      <BattleSimPage
        {...state}
        puzzle={props.puzzle}
        environment={props.environment}
      />
    )}
  </State>
)
