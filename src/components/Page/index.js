import React from 'react'
import { Route } from 'react-router-dom'
import Layout from '../Layout'

const Page = ({ children, active, ...props }) => (
  <Route {...props}>
    <Layout active={active}>{children}</Layout>
  </Route>
)

export default Page
