import React from 'react'
import { useFela } from 'react-fela'
import load from '../../helpers/load'
import styles from './styles'

const MAP = {
  'arrow-down': load('Icons/ArrowDown'),
  'arrow-left': load('Icons/ArrowLeft'),
  'arrow-right': load('Icons/ArrowRight'),
  'arrow-top-right': load('Icons/ArrowTopRight'),
  'arrow-up': load('Icons/ArrowUp'),
  bin: load('Icons/Bin'),
  books: load('Icons/Books'),
  bubbles: load('Icons/Bubbles'),
  bullhorn: load('Icons/Bullhorn'),
  cat: load('Icons/Cat'),
  compass: load('Icons/Compass'),
  cross: load('Icons/Cross'),
  crown: load('Icons/Crown'),
  download: load('Icons/Download'),
  equalizer: load('Icons/Equalizer'),
  eye: load('Icons/Eye'),
  fire: load('Icons/Fire'),
  'folder-open': load('Icons/FolderOpen'),
  gift: load('Icons/Gift'),
  hammer: load('Icons/Hammer'),
  heart: load('Icons/Heart'),
  home: load('Icons/Home'),
  image: load('Icons/Image'),
  info: load('Icons/Info'),
  library: load('Icons/Library'),
  'page-plus': load('Icons/PagePlus'),
  pencil: load('Icons/Pencil'),
  power: load('Icons/Power'),
  quill: load('Icons/Quill'),
  search: load('Icons/Search'),
  shield: load('Icons/Shield'),
  shuffle: load('Icons/Shuffle'),
  stack: load('Icons/Stack'),
  star: load('Icons/Star'),
  'super-star': load('Icons/SuperStar'),
  sword: load('Icons/Sword'),
  target: load('Icons/Target'),
  template: load('Icons/Template'),
  trophy: load('Icons/Trophy'),
  user: load('Icons/User'),
  users: load('Icons/Users'),
  wand: load('Icons/Wand'),
  warning: load('Icons/Warning'),
  youtube: load('Icons/YouTube'),
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
