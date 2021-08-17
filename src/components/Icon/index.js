import React from 'react'
import { useFela } from 'react-fela'
import ArrowDown from '../Icons/ArrowDown'
import ArrowLeft from '../Icons/ArrowLeft'
import ArrowRight from '../Icons/ArrowRight'
import ArrowTopRight from '../Icons/ArrowTopRight'
import ArrowUp from '../Icons/ArrowUp'
import Bin from '../Icons/Bin'
import Books from '../Icons/Books'
import Bubbles from '../Icons/Bubbles'
import Bullhorn from '../Icons/Bullhorn'
import Cat from '../Icons/Cat'
import Compass from '../Icons/Compass'
import Cross from '../Icons/Cross'
import Crown from '../Icons/Crown'
import Download from '../Icons/Download'
import Equalizer from '../Icons/Equalizer'
import Eye from '../Icons/Eye'
import Fire from '../Icons/Fire'
import FolderOpen from '../Icons/FolderOpen'
import Gift from '../Icons/Gift'
import Hammer from '../Icons/Hammer'
import Heart from '../Icons/Heart'
import Home from '../Icons/Home'
import Image from '../Icons/Image'
import Info from '../Icons/Info'
import Library from '../Icons/Library'
import PagePlus from '../Icons/PagePlus'
import Pencil from '../Icons/Pencil'
import Power from '../Icons/Power'
import Quill from '../Icons/Quill'
import Search from '../Icons/Search'
import Shield from '../Icons/Shield'
import Shuffle from '../Icons/Shuffle'
import Stack from '../Icons/Stack'
import Star from '../Icons/Star'
import SuperStar from '../Icons/SuperStar'
import Sword from '../Icons/Sword'
import Target from '../Icons/Target'
import Template from '../Icons/Template'
import Trophy from '../Icons/Trophy'
import User from '../Icons/User'
import Users from '../Icons/Users'
import Wand from '../Icons/Wand'
import Warning from '../Icons/Warning'
import YouTube from '../Icons/YouTube'
import styles from './styles'

const MAP = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'arrow-up': ArrowUp,
  bin: Bin,
  books: Books,
  bubbles: Bubbles,
  bullhorn: Bullhorn,
  cat: Cat,
  compass: Compass,
  cross: Cross,
  crown: Crown,
  download: Download,
  equalizer: Equalizer,
  eye: Eye,
  fire: Fire,
  'folder-open': FolderOpen,
  gift: Gift,
  hammer: Hammer,
  heart: Heart,
  home: Home,
  image: Image,
  info: Info,
  library: Library,
  'page-plus': PagePlus,
  pencil: Pencil,
  power: Power,
  quill: Quill,
  search: Search,
  shield: Shield,
  shuffle: Shuffle,
  stack: Stack,
  star: Star,
  'super-star': SuperStar,
  sword: Sword,
  target: Target,
  template: Template,
  trophy: Trophy,
  user: User,
  users: Users,
  wand: Wand,
  warning: Warning,
  youtube: YouTube,
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
