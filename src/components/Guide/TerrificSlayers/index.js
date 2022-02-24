import React from 'react'
import Link from '~/components/Link'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import PageEmbed from '~/components/PageEmbed'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function GuideTerrificSlayers(props) {
  return (
    <>
      <p>
        <CardLink id='N27' /> is a rather underused card outside of the{' '}
        <Link to='/brawl/knight-mana'>Heavy Metal</Link> Brawl focusing on
        knights. Still, it is not a bad card and can have very strong value in
        some situations. In this guide, I will outline some tips to best play
        them.
      </p>

      <TableOfContents>
        <li>
          <Link href='#what-the-deck'>What the deck?</Link>
        </li>
        <li>
          <Link href='#countering-the-counters'>Countering the counters</Link>
        </li>
        <li>
          <Link href='#limited-aoe'>Limited AoE</Link>
        </li>
        <li>
          <Link href='#take-risks-and-bait'>Take risks and bait</Link>
        </li>
        <li>
          <Link href='#bank-on-surprise'>Bank on surprise</Link>
        </li>
      </TableOfContents>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('N27')} />
      </PageEmbed>

      <Title id='what-the-deck'>What the deck?</Title>
      <p>
        First things first, Terrific Slayers are not going to be the core of
        your deck. They are an interesting utility card. That means you have to
        make sure you aren’t losing out on an otherwise not well covered (and
        important) niche for your strategy by using Terrific Slayers.
      </p>

      <p>
        For example, I generally wouldn’t recommend this as a defensive card or
        as your only win-condition since it’s a little but it blends in well in
        say, a Winter runners strategy.
      </p>

      <p>
        Don’t put Terrific Slayers if your strategy relies on heavily
        constrained card cycling as you might want to be able to save it for the
        right opportunity, especially when there’s reason to anticipate a dragon
        being played (or converted).
      </p>

      <p>
        Also fits decently in a knight strategy with Hunter’s Vengeance and/or
        Kindred’s Grace.
      </p>

      <Title id='countering-the-counters'>Countering the counters</Title>
      <p>
        Ironically enough, Terrific Slayers are pretty interesting in dragon
        decks because it’s a good recipe against card conversion (such as{' '}
        <CardLink id='F22' />, <CardLink id='F20' /> and <CardLink id='F24' />
        )—especially in a heavily Shadowfen meta—as well as{' '}
        <CardLink id='N38' /> to some extent.
      </p>

      <Title id='limited-aoe'>Limited AoE</Title>
      <p>
        <abbr title='Area of Effeft'>AoE</abbr> and randomized damage (such as{' '}
        <CardLink id='N23' />) are not recommended as these can weaken your
        target(s) when unwanted. You want to keep nice and juicy dragons for
        maximum value—
        <CardLink id='N18' /> and <CardLink id='W15' /> being clear exceptions.
      </p>

      <Title id='take-risks-and-bait'>Take risks and bait</Title>
      <p>
        Especially if you know your opponent has dragons, don’t be as afraid of
        starting situations where your opponent can use them effectively, and
        encourage it in ways that are advantageous to you (this is especially
        relevant after your first usage of the card).
      </p>

      <Title id='bank-on-surprise'>Bank on surprise</Title>
      <p>
        For your first usage of Terrific Slayers, it can be smart to wait until
        you have a stronger dragon to kill, especially if your opponent plays a
        dragon combo card, as you know more chances will likely come.
      </p>

      <p>
        After you use this card, your opponent is able to try playing around it,
        so the first usage always has the most value, if you can, make sure this
        first usage reflects that (use <CardLink id='N1' /> to buff the enemy
        dragon when you can’t go without buffing a unit for a pro gamer move).
      </p>
    </>
  )
})
