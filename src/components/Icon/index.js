import React from 'react'
import { useFela } from 'react-fela'
import ArrowDown from '~/components/Icons/ArrowDown'
import ArrowLeft from '~/components/Icons/ArrowLeft'
import ArrowRight from '~/components/Icons/ArrowRight'
import ArrowTopRight from '~/components/Icons/ArrowTopRight'
import ArrowUp from '~/components/Icons/ArrowUp'
import Bin from '~/components/Icons/Bin'
import Books from '~/components/Icons/Books'
import Bubbles from '~/components/Icons/Bubbles'
import Bullhorn from '~/components/Icons/Bullhorn'
import Cat from '~/components/Icons/Cat'
import Checkmark from '~/components/Icons/Checkmark'
import Copy from '~/components/Icons/Copy'
import Compass from '~/components/Icons/Compass'
import Cross from '~/components/Icons/Cross'
import Crown from '~/components/Icons/Crown'
import Download from '~/components/Icons/Download'
import Equalizer from '~/components/Icons/Equalizer'
import Eye from '~/components/Icons/Eye'
import Fire from '~/components/Icons/Fire'
import FolderOpen from '~/components/Icons/FolderOpen'
import Gift from '~/components/Icons/Gift'
import Hamburger from '~/components/Icons/Hamburger'
import Hammer from '~/components/Icons/Hammer'
import Heart from '~/components/Icons/Heart'
import Home from '~/components/Icons/Home'
import Image from '~/components/Icons/Image'
import Info from '~/components/Icons/Info'
import Library from '~/components/Icons/Library'
import List from '~/components/Icons/List'
import PagePlus from '~/components/Icons/PagePlus'
import Pencil from '~/components/Icons/Pencil'
import Power from '~/components/Icons/Power'
import Quill from '~/components/Icons/Quill'
import Search from '~/components/Icons/Search'
import Shield from '~/components/Icons/Shield'
import Shuffle from '~/components/Icons/Shuffle'
import Stack from '~/components/Icons/Stack'
import Star from '~/components/Icons/Star'
import SuperStar from '~/components/Icons/SuperStar'
import Sword from '~/components/Icons/Sword'
import Table from '~/components/Icons/Table'
import Target from '~/components/Icons/Target'
import Template from '~/components/Icons/Template'
import Trophy from '~/components/Icons/Trophy'
import User from '~/components/Icons/User'
import Users from '~/components/Icons/Users'
import Wand from '~/components/Icons/Wand'
import Warning from '~/components/Icons/Warning'
import YouTube from '~/components/Icons/YouTube'
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
  checkmark: Checkmark,
  copy: Copy,
  compass: Compass,
  cross: Cross,
  crown: Crown,
  download: Download,
  equalizer: Equalizer,
  eye: Eye,
  fire: Fire,
  'folder-open': FolderOpen,
  gift: Gift,
  hamburger: Hamburger,
  hammer: Hammer,
  heart: Heart,
  home: Home,
  image: Image,
  info: Info,
  library: Library,
  list: List,
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
  table: Table,
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
