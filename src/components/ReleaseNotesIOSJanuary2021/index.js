import React from 'react'
import Article from '../Article'
import Info from '../Info'
import ReleaseNotes from '../ReleaseNotes'

export default React.memo(function ReleaseNotesIOSJanuary2021(props) {
  return (
    <ReleaseNotes id='ios_01_2021'>
      <Article.Narrow>
        <p>
          Important notice for{' '}
          <strong className='Highlight'>iOS guest players!</strong> If you do
          not play on iOS or if you play on iOS with your own registered
          account, this announcement does not impact you. You’re good to go,
          enjoy your day!
        </p>
        <p>
          An important maintenance procedure will be happening January 21st. As
          a result, all iOS guest accounts may be jeopardized and all progress
          might be lost.
        </p>
        <p>
          To prevent progress loss, please make sure you are logged in with
          Kongregate or the game has been started with Apple’s Game Center
          turned on. Sheepyard will not be able to recover your game progress
          otherwise.
        </p>

        <p>
          One more time for the people at the back: if you play with a guest
          account on iOS, make sure to log in with Kongregate or with Apple’s
          Game Center enabled before January 21st otherwise you will be losing
          all your game progress.
        </p>

        <Info icon='heart' title='Stay healthy' style={{ marginTop: '3em' }}>
          <p>
            While I have your attention, please wear a mask and avoid
            unnecessary travels—especially if you live in an area with rampant
            COVID-19 cases. It takes everyone’s effort to slow down this
            pandemic. Do the right thing. 🙏
          </p>
        </Info>
      </Article.Narrow>
    </ReleaseNotes>
  )
})
