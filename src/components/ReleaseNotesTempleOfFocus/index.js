import React from 'react'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Image from '../Image'
import Notice from '../Notice'
import ReleaseNotes from '../ReleaseNotes'
import { Coins, Stones } from '../Resource'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesTempleOfFocus(props) {
  return (
    <ReleaseNotes id='temple_of_focus'>
      <Article.Narrow>
        <p>
          On January 17th, a new card will make its entrance! It’s a structure
          from Swarm of the East, it’s epic, and it’s a bit of a new mechanic
          while still making sense in the context of the overall faction! Oh and
          just like <CardLink id='N80' />, it is an ancient card. It currently
          does not have impact in the game, but it will.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('S29')} />
      </Article.Embed>

      <Article.Narrow>
        <p>
          Additionally, there will be a promotion pack to put your hands on this
          sweet new card. It costs $9.99, grants 3 copies of{' '}
          <CardLink id='S29' />, <Stones amount={5} /> and{' '}
          <Coins amount={750} />. It will only be available during January 17th
          and January 24th, so be sure to consider it!
        </p>
        <Image
          src='/assets/images/releases/promotion_temple_of_focus.png'
          alt='3 copies of Temple of Focus + 5 Fusion Stones + 750 coins for $9.99'
        />
        <Notice>
          <span className='Highlight'>Meow</span> and happy fighting, fellow
          Stormbounders!
        </Notice>
      </Article.Narrow>
    </ReleaseNotes>
  )
})
