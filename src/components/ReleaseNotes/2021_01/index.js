import React from 'react'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import Image from '~/components/Image'
import { Coins, Stones } from '~/components/Resource'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesTempleOfFocus(props) {
  return (
    <>
      <>
        <p>
          On January 17th, a new card will make its entrance! It’s a structure
          from Swarm of the East, it’s epic, and it’s a bit of a new mechanic
          while still making sense in the context of the overall faction!
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('S29')} />
      </Page.Embed>

      <>
        <p>
          Additionally, there will be a promotion pack to put your hands on this
          sweet new card. It costs $9.99, grants 3 copies of{' '}
          <CardLink id='S29' />, <Stones amount={5} /> and{' '}
          <Coins amount={750} />. It will only be available between January 17th
          and January 24th, so be sure to consider it!
        </p>

        <Image
          src='/assets/images/releases/promotion_temple_of_focus.png'
          alt='3 copies of Temple of Focus + 5 Fusion Stones + 750 coins for $9.99'
          width={500}
          height={280}
          lazy
        />
      </>
    </>
  )
})
