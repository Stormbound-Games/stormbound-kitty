import React from 'react'
import Card from '../Card'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

export default React.memo(function CardZoom(props) {
  const { close } = props
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const scrollBack = React.useCallback(
    () => window.scrollTo(0, scrollPosition),
    [scrollPosition]
  )
  const handleESC = React.useCallback(event => event.which === 27 && close(), [
    close,
  ])

  React.useEffect(() => {
    setScrollPosition(window.scrollY)
    document.addEventListener('keydown', handleESC)
    window.addEventListener('scroll', scrollBack)

    return () => {
      document.removeEventListener('keydown', handleESC)
      window.removeEventListener('scroll', scrollBack)
    }
  }, [handleESC, scrollBack])

  return props.cardId ? (
    <div className='CardZoom__overlay' onClick={close} data-testid='zoom'>
      <div className='CardZoom__wrapper'>
        <Card
          {...resolveCardForLevel({
            id: props.cardId,
            level: props.level || 1,
          })}
          mana={props.mana}
          costReduced={props.costReduced}
          player={props.player}
        />
      </div>
    </div>
  ) : null
})
