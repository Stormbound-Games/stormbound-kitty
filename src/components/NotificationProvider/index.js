import React from 'react'
import ReactDOM from 'react-dom'
import Notification from '~/components/Notification'

export const NotificationContext = React.createContext({})

const reducer = (state, notification) => ({ notification, key: state.key + 1 })

const useNotificationVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeout = React.useRef()

  const showNotification = React.useCallback(() => {
    setIsVisible(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setIsVisible(false), 8000)
  }, [])

  React.useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  return { showNotification, isVisible }
}

const SelfHidingNotification = React.memo(function SelfHidingNotification(
  props
) {
  const { showNotification, isVisible } = useNotificationVisibility()

  React.useEffect(() => {
    showNotification()
  }, [showNotification])

  return ReactDOM.createPortal(
    <Notification {...props} isVisible={isVisible} />,
    document.querySelector('#notification-root')
  )
})

export default React.memo(function NotificationProvider(props) {
  const [{ notification, key }, notify] = React.useReducer(reducer, {
    notification: null,
    key: 0,
  })

  return (
    <>
      <NotificationContext.Provider value={{ notify }}>
        {props.children}
      </NotificationContext.Provider>
      {Boolean(notification) && (
        <SelfHidingNotification {...notification} key={String(key)} />
      )}
    </>
  )
})
