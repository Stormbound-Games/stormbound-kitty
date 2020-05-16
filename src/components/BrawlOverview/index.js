import React from 'react'
import BrawlProvider from '../BrawlProvider'
import BrawlOverviewRow from '../BrawlOverviewRow'
import HeaderBanner from '../HeaderBanner'
import PageMeta from '../PageMeta'
import { BRAWLS } from '../../constants/brawl'

const sortBrawlsByDate = (a, b) => {
  try {
    const dataA = JSON.parse(localStorage.getItem('sk.brawl.' + a.id))
    const dataB = JSON.parse(localStorage.getItem('sk.brawl.' + b.id))
    const brawlA = (dataA || []).pop()
    const brawlB = (dataB || []).pop()

    if (Number(brawlA.createdAt) > Number(brawlB.createdAt)) return +1
    if (Number(brawlA.createdAt) < Number(brawlB.createdAt)) return -1
    return 0
  } catch (error) {
    return 0
  }
}

export default React.memo(function BrawlOverview(props) {
  return (
    <>
      <HeaderBanner title='Your Brawls' />

      {BRAWLS.sort(sortBrawlsByDate).map(brawl => (
        <BrawlProvider id={brawl.id} key={brawl.id}>
          <BrawlOverviewRow {...brawl} />
        </BrawlProvider>
      ))}

      <PageMeta
        title='Your Brawls'
        description='Compare your performance across the different Brawls you participated in'
      />
    </>
  )
})
