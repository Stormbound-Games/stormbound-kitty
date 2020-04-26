import React from 'react'
import { motion } from 'framer-motion'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Layout = React.memo(props => (
  <div className='Layout'>
    <Header active={props.active} />
    <main className='Layout__body'>
      <motion.div
        key='layout'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.8 }}
      >
        {props.children}
      </motion.div>
    </main>
    <Footer />
  </div>
))

export default Layout
