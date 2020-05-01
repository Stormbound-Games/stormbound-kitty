import React from 'react'
import Card from '../Card'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

export default React.memo(function CardZoom(props) {
  const { close } = props
  const handleESC = React.useCallback(event => event.which === 27 && close(), [
    close,
  ])

  React.useEffect(() => {
    document.addEventListener('keydown', handleESC)
    if (props.cardId) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = ''
    }

    return () => {
      document.removeEventListener('keydown', handleESC)
      document.documentElement.style.overflowY = ''
    }
  }, [handleESC, props.cardId])

  return props.cardId ? (
    <div className='CardZoom__overlay' onClick={props.close} data-testid='zoom'>
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
