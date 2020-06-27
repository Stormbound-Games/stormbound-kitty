import React from 'react'
import puzzles from '../../data/puzzles'
import AppDesktop from '../BattleSimAppDesktop'
import AppMobile from '../BattleSimAppMobile'
import PageMeta from '../PageMeta'
import State from '../BattleSimState'
import useViewportWidth from '../../hooks/useViewportWidth'

const App = React.memo(function App(props) {
  const viewportWidth = useViewportWidth()
  const puzzle = puzzles.find(puzzle => puzzle.board === props.simId)
  const shouldRenderLeftPanel =
    props.mode === 'EDITOR' ||
    (props.mode === 'DISPLAY' && props.cards.filter(c => !!c.id).length > 0)
  const shouldRenderRightPanel =
    props.mode === 'EDITOR' || (props.mode === 'DISPLAY' && !!puzzle)

  return (
    <>
      <h1 className='VisuallyHidden'>Battle Simulator</h1>
      {viewportWidth >= 700 ? (
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
      )}

      {props.withMeta && (
        <PageMeta
          title='Battle Simulator'
          description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
        />
      )}
    </>
  )
})

export default props => (
  <State mode={props.mode} simId={props.simId}>
    {state => <App {...state} environment={props.environment} />}
  </State>
)
