import React from 'react'
import BattleSimApp from '../BattleSimApp'
import Card from '../Card'
import Column from '../Column'
import Guide from '../Guide'
import CardLink from '../CardLink'
import Row from '../Row'
import Title from '../Title'
import guides from '../../data/guides'
import getResolvedCardData from '../../helpers/getResolvedCardData'

const guide = guides.find(g => g.id === 'CHILLBEARDS_GUIDE')

export default React.memo(function GuideChillbeards(props) {
  return (
    <Guide {...guide}>
      <p>
        <CardLink id='W22' /> is a rather underused card, especially in higher
        leagues, mostly due to its high mana cost and non-trivial success
        condition. In this guide, I will give a few tips to maximise the value
        of Chillbeards.
      </p>

      <Row desktopOnly wideGutter>
        <Column width='2/3'>
          <Title style={{ marginTop: '2em' }}>Table of contents</Title>
          <ol style={{ columns: '8em' }}>
            <li>
              <a href='#be-mindful-of-mana'>Be mindful of mana</a>
            </li>
            <li>
              <a href='#aim-for-the-baseline'>Aim for the baseline</a>
            </li>
            <li>
              <a href='#control-cards'>Control cards</a>
            </li>
            <li>
              <a href='#tokens-are-friends'>Tokens are friends</a>
            </li>
            <li>
              <a href='#its-all-about-that-bait'>It’s all about that bait</a>
            </li>
            <li>
              <a href='#cycling'>Cycling</a>
            </li>
            <li>
              <a href='#chip-chip'>Chip Chip</a>
            </li>
            <li>
              <a href='#freeze-confusion'>Freeze & confusion</a>
            </li>
          </ol>
        </Column>
        <Column width='1/3'>
          <Card {...getResolvedCardData({ id: 'W22', level: 5 })} />
        </Column>
      </Row>

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

      <Guide.FullWidth>
        <BattleSimApp
          environment='winter'
          mode='DISPLAY'
          simId='LDJOOEIzLCwsLCw4TjEzQjUsLCwsOFcxM0I1LCwsLCwsLCwsO1IxME4tQjEwVzs4TTA7Ow=='
        />
      </Guide.FullWidth>

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

      <Guide.FullWidth>
        <BattleSimApp
          environment='winter'
          mode='DISPLAY'
          simId='NU4zQjUsLDhGNlI1Riw5VzdCMywsLDVXMkI1LCwsLCwsLCwsLCwsLDtSMjBGLUIyMFc7OE0wOzs='
        />
      </Guide.FullWidth>
    </Guide>
  )
})
