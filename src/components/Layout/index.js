import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Only from '../Only'
import './index.css'

const Layout = React.memo(props => (
  <div className='Layout'>
    <Only.Desktop>
      <EyeCatcher id='guides_authors'>
        Fellow travelers, Stormbound-Kitty is looking for{' '}
        <Link to='/faq#adding-a-guide'>guides authors</Link>!
      </EyeCatcher>
    </Only.Desktop>

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
