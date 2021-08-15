import React from 'react'
import About from '../../components/About'
import Layout from '../../components/Layout'

export default () => (
  <Layout active={['HOME', 'ABOUT']}>
    <About />
  </Layout>
)
