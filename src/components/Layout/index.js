import React from 'react'
import { motion } from 'framer-motion'
import Footer from '../Footer'
import Header from '../Header'
import load from '../../helpers/load'
import './index.css'

const SearchDialog = load('SearchDialog')

export default React.memo(function Layout(props) {
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  return (
    <div className='Layout'>
      <Header
        active={props.active}
        isSearchReady={isSearchReady}
        openSearch={() => searchDialog.current.show()}
      />

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

      <SearchDialog
        dialogRef={searchDialog}
        setIsSearchReady={setIsSearchReady}
      />
    </div>
  )
})
