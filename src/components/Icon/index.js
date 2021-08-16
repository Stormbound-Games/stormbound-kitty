import React from 'react'
import dynamic from 'next/dynamic'
import { useFela } from 'react-fela'
import styles from './styles'

const MAP = {
  'arrow-down': dynamic(() => import('~/components/Icons/ArrowDown')),
  'arrow-left': dynamic(() => import('~/components/Icons/ArrowLeft')),
  'arrow-right': dynamic(() => import('~/components/Icons/ArrowRight')),
  'arrow-top-right': dynamic(() => import('~/components/Icons/ArrowTopRight')),
  'arrow-up': dynamic(() => import('~/components/Icons/ArrowUp')),
  bin: dynamic(() => import('~/components/Icons/Bin')),
  books: dynamic(() => import('~/components/Icons/Books')),
  bubbles: dynamic(() => import('~/components/Icons/Bubbles')),
  bullhorn: dynamic(() => import('~/components/Icons/Bullhorn')),
  cat: dynamic(() => import('~/components/Icons/Cat')),
  compass: dynamic(() => import('~/components/Icons/Compass')),
  cross: dynamic(() => import('~/components/Icons/Cross')),
  crown: dynamic(() => import('~/components/Icons/Crown')),
  download: dynamic(() => import('~/components/Icons/Download')),
  drop: dynamic(() => import('~/components/Icons/Drop')),
  equalizer: dynamic(() => import('~/components/Icons/Equalizer')),
  eye: dynamic(() => import('~/components/Icons/Eye')),
  fire: dynamic(() => import('~/components/Icons/Fire')),
  'folder-open': dynamic(() => import('~/components/Icons/FolderOpen')),
  gift: dynamic(() => import('~/components/Icons/Gift')),
  hammer: dynamic(() => import('~/components/Icons/Hammer')),
  heart: dynamic(() => import('~/components/Icons/Heart')),
  home: dynamic(() => import('~/components/Icons/Home')),
  image: dynamic(() => import('~/components/Icons/Image')),
  info: dynamic(() => import('~/components/Icons/Info')),
  library: dynamic(() => import('~/components/Icons/Library')),
  'page-plus': dynamic(() => import('~/components/Icons/PagePlus')),
  pencil: dynamic(() => import('~/components/Icons/Pencil')),
  power: dynamic(() => import('~/components/Icons/Power')),
  quill: dynamic(() => import('~/components/Icons/Quill')),
  search: dynamic(() => import('~/components/Icons/Search')),
  shield: dynamic(() => import('~/components/Icons/Shield')),
  shuffle: dynamic(() => import('~/components/Icons/Shuffle')),
  stack: dynamic(() => import('~/components/Icons/Stack')),
  star: dynamic(() => import('~/components/Icons/Star')),
  'super-star': dynamic(() => import('~/components/Icons/SuperStar')),
  sword: dynamic(() => import('~/components/Icons/Sword')),
  target: dynamic(() => import('~/components/Icons/Target')),
  template: dynamic(() => import('~/components/Icons/Template')),
  trophy: dynamic(() => import('~/components/Icons/Trophy')),
  user: dynamic(() => import('~/components/Icons/User')),
  users: dynamic(() => import('~/components/Icons/Users')),
  wand: dynamic(() => import('~/components/Icons/Wand')),
  warning: dynamic(() => import('~/components/Icons/Warning')),
  youtube: dynamic(() => import('~/components/Icons/YouTube')),
}

export default React.memo(function Icon(props) {
  const { css } = useFela({ type: props.icon })
  const Component = MAP[props.icon]

  return (
    <Component
      className={css(styles.icon, props.extend)}
      aria-hidden
      focusable='false'
    />
  )
})
