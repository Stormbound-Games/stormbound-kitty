import React from 'react'
import Article from '../Article'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Title from '../Title'
import WikiLink from '../WikiLink'

export default React.memo(function ChangelogOctober2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update 10-2020'
      backLink={{
        to: '/changelog/releases',
        children: 'Back to release notes',
      }}
      meta='2 minutes'
      className='ChangelogOctober2020'
      background='/assets/images/banners/factions.png'
      ratio='50%'
    >
      Hi
    </Article>
  )
})
