import React from 'react'
import Page from '~/components/Page'
import BrawlProvider from '~/components/BrawlProvider'
import BrawlTracker from '~/components/BrawlTracker'

const BACKGROUNDS = {
  I: 'https://cdn.sanity.io/images/5hlpazgd/production/7405fd6a6d522ca4a89b6d9ad87b8bf6f30a125c-1024x576.png',
  F: 'https://cdn.sanity.io/images/5hlpazgd/production/67614c154b0115f94ef8448e7fbb8bb72fe6d519-1024x576.png',
  W: 'https://cdn.sanity.io/images/5hlpazgd/production/d1841b7f9be19eb4ada821227f4572c9b3510fc5-1024x576.png',
  S: 'https://cdn.sanity.io/images/5hlpazgd/production/7a7c79d7f13854bc62510c876deb631f2ca5029b-1024x576.png',
  N: 'https://cdn.sanity.io/images/5hlpazgd/production/4ddcaa576ea827d6d7f3896fda60541bda15c569-1024x576.png',
}

export default React.memo(function BrawlPage(props) {
  const [difficulty, setDifficulty] = React.useState('CASUAL')
  const { brawl } = props
  const background = BACKGROUNDS[brawl.cardId.slice(0, 1)]

  return (
    <Page
      title='Brawl Tracker'
      description='Manage your Brawl, track your progress as well as your expenses and rewards'
      meta={brawl.name}
      action={{ to: '/brawl', children: 'Back to index' }}
      background={background}
      withAvif
    >
      <BrawlProvider brawl={brawl} difficulty={difficulty}>
        <BrawlTracker
          {...props}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </BrawlProvider>
    </Page>
  )
})
