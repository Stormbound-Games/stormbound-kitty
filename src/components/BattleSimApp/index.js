import React from 'react'
import AppDesktop from '~/components/BattleSimAppDesktop'
import AppMobile from '~/components/BattleSimAppMobile'
import Only from '~/components/Only'

export default React.memo(function BattleSimApp(props) {
  const shouldRenderLeftPanel = props.mode === 'EDITOR'
  const shouldRenderRightPanel =
    (props.mode === 'EDITOR' && !!props.activePlayer && !!props.activeCell) ||
    (props.mode === 'DISPLAY' && !!props.puzzle)

  return (
    <>
      <Only.Desktop>
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
      </Only.Desktop>
      <Only.Mobile>
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
      </Only.Mobile>
    </>
  )
})
