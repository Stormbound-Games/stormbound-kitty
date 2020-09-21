import React from 'react'
import random from '../../helpers/random'
import useRandomInterval from '../../hooks/useRandomInterval'
import './index.css'

const generateSparkle = color => ({
  id: String(random(10000, 99999)),
  createdAt: Date.now(),
  color,
  size: random(10, 20),
  style: { top: random(0, 100) + '%', left: random(0, 100) + '%' },
})

const Sparkles = props => {
  const color = props.color || '#FFC700'
  const count = props.count || 3
  const interval = props.interval || [40, 450]

  const [sparkles, setSparkles] = React.useState(() =>
    Array.from({ length: count }, () => generateSparkle(color))
  )

  useRandomInterval(() => {
    const now = Date.now()
    setSparkles([
      ...sparkles.filter(sp => now - sp.createdAt < 750),
      generateSparkle(color),
    ])
  }, ...interval)

  return (
    <div className='Sparkles'>
      {sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
      {props.children}
    </div>
  )
}

const Sparkle = props => (
  <span className='Sparkle' style={props.style}>
    <svg
      className='Sparkle__svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 68 68'
      fill='none'
    >
      <path
        d='M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z'
        fill={props.color}
      />
    </svg>
  </span>
)

export default Sparkles
