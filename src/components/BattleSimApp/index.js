import React from 'react'
import AppDesktop from '../BattleSimAppDesktop'
import AppMobile from '../BattleSimAppMobile'
import Only from '../Only'
import State from '../BattleSimState'

const BattleSimPage = function BattleSimPage(props) {
  const shouldRenderLeftPanel =
    props.mode === 'EDITOR' ||
    (props.mode === 'DISPLAY' && props.cards.filter(c => !!c.id).length > 0)
  const shouldRenderRightPanel =
    props.mode === 'EDITOR' || (props.mode === 'DISPLAY' && !!props.puzzle)

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
}

export default function BattleSimApp(props) {
  return (
    <State {...props}>
      {state => (
        <BattleSimPage
          {...state}
          puzzle={props.puzzle}
          environment={props.environment}
        />
      )}
    </State>
  )
}
