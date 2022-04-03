import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import useDidUpdateEffect from '~/hooks/useDidUpdateEffect'

const Tab = React.memo(function Tab(props) {
  return (
    <BlankButton
      role='tab'
      aria-selected={props.isActive}
      aria-controls={`${props.id}-tab`}
      id={props.id}
      tabIndex={props.isActive ? undefined : -1}
      onKeyDown={props.handleKeydown}
      onClick={() => props.setActive(props.id)}
      extend={props.extend?.({ isActive: props.isActive })}
    >
      {props.children}
    </BlankButton>
  )
})

const Panel = React.memo(function Panel(props) {
  return (
    <div
      tabIndex={0}
      role='tabpanel'
      id={`${props.id}-tab`}
      aria-labelledby={props.id}
      hidden={!props.isActive}
    >
      {props.children}
    </div>
  )
})

const Tabs = React.memo(function Tabs(props) {
  const { css } = useFela()
  const extend = props.extend || {}
  const [active, setActive] = React.useState(props.tabs[0].id)

  const handleKeydown = React.useCallback(
    event => {
      const tabs = props.tabs
      const count = tabs.length
      const index = tabs.findIndex(tab => tab.id === active)

      if (event.keyCode === 37)
        setActive(tabs[index === 0 ? count - 1 : index - 1].id)

      if (event.keyCode === 39)
        setActive(tabs[index === count - 1 ? 0 : index + 1].id)

      if (event.keyCode === 36) setActive(tabs[0].id)
      if (event.keyCode === 35) setActive(tabs[count - 1].id)
    },
    [active, props.tabs]
  )

  // Custom hook instead of regular `useEffect` to avoid the function from
  // running on initial render as this causes the page to be scrolled to the
  // active tab, which is not desired.
  useDidUpdateEffect(() => {
    const index = props.tabs.findIndex(tab => tab.id === active)
    document.querySelector('#' + props.tabs[index].id).focus()
  }, [active, props.tabs])

  return (
    <>
      <div
        className={css(extend.tabList)}
        role='tablist'
        aria-label={props.label}
      >
        {props.tabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            setActive={setActive}
            isActive={tab.id === active}
            handleKeydown={handleKeydown}
            extend={extend.tab}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      {props.tabs.map(tab => (
        <Panel key={tab.id} id={tab.id} isActive={tab.id === active}>
          {tab.content}
        </Panel>
      ))}
    </>
  )
})

export default Tabs
