import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import Link from '~/components/Link'
import PageEmbed from '~/components/PageEmbed'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function GuideChillbeards(props) {
  return (
    <>
      <p>
        <CardLink id='W22' /> is a rather underused card, especially in higher
        leagues, mostly due to its high mana cost and non-trivial success
        condition. In this guide, I will give a few tips to maximize the value
        of Chillbeards.
      </p>

      <TableOfContents>
        <li>
          <Link href='#be-mindful-of-mana'>Be mindful of mana</Link>
        </li>
        <li>
          <Link href='#aim-for-the-baseline'>Aim for the baseline</Link>
        </li>
        <li>
          <Link href='#control-cards'>Control cards</Link>
        </li>
        <li>
          <Link href='#tokens-are-friends'>Tokens are friends</Link>
        </li>
        <li>
          <Link href='#its-all-about-that-bait'>It’s all about that bait</Link>
        </li>
        <li>
          <Link href='#cycling'>Cycling</Link>
        </li>
        <li>
          <Link href='#chip-chip'>Chip Chip</Link>
        </li>
        <li>
          <Link href='#freeze-confusion'>Freeze & confusion</Link>
        </li>
      </TableOfContents>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('W22')} />
      </PageEmbed>

      <Title id='be-mindful-of-mana'>1. Be mindful of mana</Title>
      <p>
        At 9 mana, <CardLink id='W22' /> is one of the most expensive cards in
        the game. Consider its chonky mana cost and keep your strategy either a
        little more lean, and/or give it more mana gain.
      </p>
      <p>
        That means either have a rather cheap deck where you can play multiple
        cards a turn early on (with many 1-/2- and 3-drops) to make Chillbeards
        your hopeful finisher, or have a mana-ramp deck with{' '}
        <CardLink id='W9' /> and <CardLink id='W19' />.
      </p>

      <Title id='aim-for-the-baseline'>2. Aim for the baseline</Title>
      <p>
        Due to its ability, the most valuable usage of Chillbeards is targeting
        enemies at your opponent’s baseline. Therefore it is important to either
        keep frontline at all time, for instance with <CardLink id='W13' />; or
        to have a cheap way to get frontline back with cards like{' '}
        <CardLink id='N67' />.
      </p>

      <Title id='control-cards'>3. Control cards</Title>
      <p>
        Use cheap cards with movement or cheap control cards, as they can be
        used to defend against units or damage units at the enemy baseline, and
        be combo-ed effectively with Chillbeards. Movement is particularly
        important because of ground-gaining and quick offensive capabilities.
      </p>

      <p>
        <CardLink id='N23' /> and <CardLink id='N9' /> are often recommended
        control cards for good defense and better offense.
      </p>

      <Title id='tokens-are-friends'>4. Tokens are friends</Title>
      <p>
        <CardLink id='N8' /> is pretty much perfect for these purposes, they
        produce solid moving units that cost 0 mana, and is relatively cheap
        too. Last but not least, the cycling lines up well with the mana cost.
        Maybe consider <CardLink id='N38' /> too.
      </p>

      <Title id='its-all-about-that-bait'>5. It’s all about that bait</Title>
      <p>
        Bait your opponent! Use (once again) cheap units (or expensive ones too)
        to bait defense at your opponent’s baseline, then use it as a perfect
        finisher opportunity.
      </p>
      <p>
        In the following example, we play <CardLink id='W13' /> (with a lucky
        front spawn) then <CardLink id='N8' /> on the baseline to hope for a
        cheap opponent unit clearing the Mirz. Next turn, we can hopefully slam
        Chillbeards in.
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LDJOOEIzLCwsLCw4TjEzQjUsLCwsOFcxM0I1LCwsLCwsLCwsO1IxME4tQjEwVzs4TTA7Ow=='
      />

      <Title id='cycling'>6. Cycling</Title>
      <p>
        Keeping it in your hand to wait for the right moment to strike is
        limiting, consider <CardLink id='N14' /> or mana filling cards like{' '}
        <CardLink id='W6' /> or similar expensive stuff. Also be sure to cycle
        it around mana turn 4-5 if you want to get it at 9 mana (and you cycle
        your cards almost every turn).
      </p>

      <Title id='chip-chip'>7. Chip Chip</Title>
      <p>
        Use chip damage (cards like <CardLink id='W21' /> or{' '}
        <CardLink id='N44' /> that deal base damage) to get more use out of
        Chillbeards finishers, since you’ll usually have to weaken your opponent
        or finish them off to complete the deal, and you might have to sacrifice
        ground to successfully pull it off.
      </p>

      <Title id='freeze-confusion'>8. Freeze & confusion</Title>
      <p>
        Use freeze and confusion cards to keep enemies at the baseline,
        Frosthexers and Sweetcap Kittens are the best options.
      </p>

      <p>
        Below is a pretty perfect turn mana 8, with a lot of base pressure to
        force the enemy to defend, and <CardLink id='W2' /> locking an enemy
        unit on the baseline for a Chillbeards next turn.
      </p>

      <BattleSimEmbed
        environment='winter'
        id='NU4zQjUsLDhGNlI1Riw5VzdCMywsLDVXMkI1LCwsLCwsLCwsLCwsLDtSMjBGLUIyMFc7OE0wOzs='
      />
    </>
  )
})
