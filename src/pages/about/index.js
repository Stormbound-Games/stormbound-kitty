import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'

const AboutPage = () => (
  <Layout active={['HOME', 'ABOUT']}>
    <About />
  </Layout>
)

export default AboutPage
