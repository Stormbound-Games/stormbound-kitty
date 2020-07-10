import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UpdateContext } from '../UpdateProvider'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Only from '../Only'
import './index.css'

export default React.memo(function Layout(props) {
  const isUpdatedEnabled = React.useContext(UpdateContext)

  return (
    <div className='Layout'>
      {isUpdatedEnabled && (
        <Only.Desktop>
          <EyeCatcher id='update-07-2020'>
            The new Sheepyard update is there, be sure to read{' '}
            <Link to='/changelog/07-2020'>
              everything there is to know about it
            </Link>
            !
          </EyeCatcher>
        </Only.Desktop>
      )}

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
  )
})
