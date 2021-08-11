import React from 'react'
import Page from '../Page'
import Row from '../Row'
import Teaser from '../Teaser'

export default React.memo(function FanKit(props) {
  return (
    <Page
      title='Fan-Kit'
      description='Find all the assets from Stormbound used on Stormbound-Kitty, courtesy of Sheepyard'
    >
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Teaser
            meta='Official content'
            cardId='N23'
            title='Cards assets'
            to='/fan-kit/cards'
            excerpt='Find all the card assets from the game, which can be downloaded in high definition.'
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Teaser
            meta='Official content'
            cardId='N73'
            title='Books assets'
            to='/fan-kit/books'
            excerpt='Find all the book assets from the game, including the most recent additions!'
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Teaser
            meta='Official content'
            cardId='N22'
            title='Avatars assets'
            to='/fan-kit/avatars'
            excerpt='Find all the avatars from Stormbound that can be used as player profile within the game.'
          />
        </Row.Column>
      </Row>
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Teaser
            meta='Official content'
            cardId='N21'
            title='Wallpapers'
            to='/fan-kit/wallpapers'
            excerpt='Find all high definition wallpapers that can be used as background for both desktop and mobile devices.'
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Teaser
            meta='Official content'
            cardId='N84'
            title='Game backgrounds'
            to='/fan-kit/backgrounds'
            excerpt='Find all the desktop in-game backgrounds which can be used for tools like the battle sim.'
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Teaser
            meta='Community-made'
            cardId='N83'
            title='Fan arts'
            to='/fan-art'
            excerpt='Discover artworks made by the community about the Stormbound game and all its characters!'
          />
        </Row.Column>
      </Row>
    </Page>
  )
})
