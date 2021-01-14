import React from 'react'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Notice from '../Notice'
import ReleaseNotes from '../ReleaseNotes'
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
        <Notice>
          <span className='Highlight'>Meow</span> and happy fighting, fellow
          Stormbounders!
        </Notice>
      </Article.Narrow>
    </ReleaseNotes>
  )
})
