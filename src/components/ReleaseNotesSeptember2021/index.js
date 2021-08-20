import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Info from '~/components/Info'
import TableOfContents from '~/components/TableOfContents'
import CardLink from '~/components/CardLink'
import Title from '~/components/Title'

export default React.memo(function ReleaseNotesSeptember2021(props) {
  return (
    <>
      <Page.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          September, bringing balance changes, a new card, and a lot of generous
          offers to celebrate Stormbound’s 4th nniversary!
        </p>

        <p>
          Before we begin, let’s take a short moment to remember that the
          development team was quite fragmented due to well-deserved holidays in
          August and September, hence the releases being a little superficial.
          It will pick up some steam in September to deliver new exciting
          content soon!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#anniversary-gifts'>Anniversary gifts</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#exclusive-offers'>Exclusive offers</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated. You can still carry the
            disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>
        <Title id='new-card'>New card</Title>
        <Title id='anniversary-gifts'>Anniversary gifts</Title>
        <Title id='cheapened-brawl'>Cheapened Brawl</Title>
        <Title id='exclusive-offers'>Exclusive offers</Title>
        <Title id='faq'>FAQ</Title>
      </Page.Narrow>
    </>
  )
})
