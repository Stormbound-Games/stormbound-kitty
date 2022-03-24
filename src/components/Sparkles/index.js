import React from 'react'
import { useFela } from 'react-fela'
import random from '~/helpers/random'
import useRandomInterval from '~/hooks/useRandomInterval'
import styles from './styles'

const generateSparkle = color => ({
  id: String(random(10000, 99999)),
  createdAt: Date.now(),
  color,
  size: random(10, 20),
  style: { top: random(0, 100) + '%', left: random(0, 100) + '%' },
})

const Sparkles = props => {
  const { css } = useFela()
  const color = props.color || '#FFC700'
  const count = props.count || 3
  const interval = props.interval || [40, 450]
  const [sparkles, setSparkles] = React.useState([])

  React.useEffect(() => {
    setSparkles(Array.from({ length: count }, () => generateSparkle(color)))
  }, [color, count])

  useRandomInterval(() => {
    const now = Date.now()
    setSparkles([
      ...sparkles.filter(sp => now - sp.createdAt < 750),
      generateSparkle(color),
    ])
  }, ...interval)

  return (
    <span className={css(styles.sparkles)}>
      {sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
      {/*
       * This <span> is not necessary per se but prevents a page crash when
       * running Google Translate. See:
       * https://github.com/facebook/react/issues/11538#issuecomment-390386520
       */}
      <span>{props.children}</span>
    </span>
  )
}

const Sparkle = React.memo(function Sparkle(props) {
  const { css } = useFela()

  return (
    <span className={css(styles.sparkle, props.extend)} style={props.style}>
      <svg
        className={css(styles.svg)}
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
})

export default Sparkles
