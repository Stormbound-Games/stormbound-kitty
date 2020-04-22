import React from 'react'
import pMinDelay from 'p-min-delay'
import loadable from '@loadable/component'
import Loader from '../components/Loader'

const options = { fallback: <Loader /> }
const load = name =>
  loadable(() => pMinDelay(import('../components/' + name), 300), options)

export default load
