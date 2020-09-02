import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'

export default React.memo(function ReleaseNotes(props) {
  return (
    <>
      <HeaderBanner title='Release Notes' />
      <Row desktopOnly>
        <Column width='1/3'>
          <Teaser
            cardId='N8'
            title='3rd Anniversary'
            meta='September 18th, 2020'
            excerpt='A minor promotional update to celebrate Stormbound’s 3rd anniversary with offers (for paying and non-paying players) and gifts.'
            to='/changelog/3rd-anniversary'
          />
        </Column>
        <Column width='1/3'>
          <Teaser
            cardId='N57'
            title='Small buff patch'
            meta='September 1st, 2020'
            excerpt='A minor balance patch buffing 12 under-appreciated cards: 9 neutral cards, 2 Ironclad cards and 1 Winter card. Nothing for Shadowfen and Swarm.'
            to='/changelog/09-2020'
          />
        </Column>
        <Column width='1/3'>
          <Teaser
            cardId='N21'
            title='First Sheepyard update'
            meta='July 15th, 2020'
            excerpt='The first update from Sheepyard featuring a new card, some balance tweaks, matchmaking improvements, economy updates, and more.'
            to='/changelog/07-2020'
          />
        </Column>
      </Row>

      <Notice icon='compass'>
        If you are looking for all the changes that were ever applied to
        specific cards, refer to{' '}
        <Link to='/changelog/cards'>the card changes</Link>.
      </Notice>

      <PageMeta
        title='Release Notes'
        description='Find all the information about every release on Stormbound-Kitty, the official place for release notes'
      />
    </>
  )
})
