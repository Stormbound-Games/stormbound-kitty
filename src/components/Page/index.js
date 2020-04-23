import React from 'react'
import { Route } from 'react-router-dom'
import Layout from '../Layout'

const Page = ({ active = [], ...props }) => (
  <Route {...props}>
    <Layout active={active}>{props.children}</Layout>
  </Route>
)

export default Page
