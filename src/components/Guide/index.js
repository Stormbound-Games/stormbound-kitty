import React from 'react'
import HeaderBanner from '../HeaderBanner'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Title from '../Title'
import getExcerpt from '../../helpers/getExcerpt'
import './index.css'

export default React.memo(function Guide(props) {
  return (
    <>
      <Only.Desktop>
        <HeaderBanner title={props.name} background={props.background} />
      </Only.Desktop>
      <div className={['Guide', props.className].filter(Boolean).join(' ')}>
        <Only.Mobile>
          <Title>{props.name}</Title>
        </Only.Mobile>
        <p className='Guide__author'>
          This guide has been authored by {props.author} and is published here
          with their consent. All credits to the original author.
        </p>

        {props.children}

        <PageMeta
          author={props.author}
          title={props.name}
          image={props.background}
          description={getExcerpt(props.excerpt, 160)}
        />
      </div>
    </>
  )
})
