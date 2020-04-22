import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Layout = props => (
  <div className='Layout'>
    <Header active={props.active} />
    <main className='Layout__body'>{props.children}</main>
    <Footer />
  </div>
)

export default Layout
