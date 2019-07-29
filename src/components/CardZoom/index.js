import React from 'react'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import Card from '../Card'
import './index.css'

const CardZoom = props => {
  const handleESC = event => event.which === 27 && props.close()
  React.useEffect(() => {
    document.addEventListener('keydown', handleESC)
    if (props.cardId) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = ''
    }

    return () => document.removeEventListener('keydown', handleESC)
  }, [props.cardId])

  return props.cardId ? (
    <div className="CardZoom__overlay" onClick={props.close} data-testid="zoom">
      <div className="CardZoom__wrapper">
        <Card
          {...resolveCardForLevel({ id: props.cardId, level: props.level || 1 })}
          player={props.player}
        />
      </div>
    </div>
  ) : null
}

export default CardZoom
