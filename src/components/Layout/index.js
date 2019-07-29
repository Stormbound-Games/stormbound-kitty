import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Layout = props => (
  <div className="Layout">
    <Header {...props} />

    <main className="Layout__body">{props.children}</main>

    <Footer />
  </div>
)

export default Layout
