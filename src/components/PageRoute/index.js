import React from 'react'
import { Route } from 'react-router-dom'
import Layout from '../Layout'

export default function PageRoute({ active = [], ...props }) {
  return (
    <Route {...props}>
      <Layout active={active}>{props.children}</Layout>
    </Route>
  )
}
