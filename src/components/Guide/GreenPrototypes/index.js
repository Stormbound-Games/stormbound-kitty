import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import CardLink from '~/components/CardLink'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function GuideGreenPrototypes(props) {
  return (
    <>
      <p>
        <CardLink id='N1' /> is a card that confuses almost all new players.
        Myself as well, back in the days. How can a card be good if it gives
        strength to the enemy? That just doesn’t make sense.
      </p>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('N1')} />
      </PageEmbed>

      <p>
        When I started out, I wasn’t on the Discord or on Reddit or the forums.
        I had never even heard of Stormbound-Kitty.
      </p>

      <p>The dark ages.</p>

      <p>
        That was quite a long time ago however, even before the introduction of
        the ranks. There was a ladder—each month everyone would be reset to
        zero. As such, I quickly found myself matched up against very advanced
        players. Players with the best cards, the greatest strategies.
      </p>

      <p>
        Imagine my surprise when I saw those strongest enemies use this card I
        considered useless! That’s over two years ago—in the meantime I learned
        a lot about this game. One thing I learned is that Green Prototypes is
        one of the best cards in the game, if not{' '}
        <span className='Highlight'>the</span> best.
      </p>

      <p className='Highlight'>At all levels.</p>

      <p>
        While not very impressive on its own, at 1 mana it’s extremely cheap.
        It’s basically the <span className='Highlight'>ultimate</span> support
        unit… the list of benefits is long.
      </p>

      <Title>Benefits</Title>

      <p>
        Here’s my take on (some of) the reasons why Green Prototypes is so good:
      </p>

      <h3>Advance your frontline</h3>

      <p>
        For 1 mana, you can place your super strong unit closer to their base,
        winning an entire turn. If you’re at the mid-line with 8 mana and have{' '}
        <CardLink id='N52' /> in hand, Green Prototypes can make Salty Outcasts
        reach the enemy base.
      </p>

      <h3>Protect a structure</h3>

      <p>
        If the enemy is near your base and you wanted to put, say,{' '}
        <CardLink id='N34' />, <CardLink id='W9' />, <CardLink id='S18' /> or
        other important structure, it would most likely get focused and
        destroyed by some unit. By first playing Green Prototypes, the enemy
        would have to have a unit with 2 or more speed to even reach the
        structure.
      </p>

      <BattleSimEmbed
        environment='swarm'
        id='LCwsLCwsLCwsLCwsLCwsNU4xQjUsLCwsOE4zNEI1O1IxME4tQjEwTjs2TTA7NU4xNU4zNDs='
      />

      <h3>Trueshot Post sacrifice</h3>

      <p>
        Let’s say the enemy has a <CardLink id='N34' /> up and running. Instead
        of losing something expensive, you play Green Prototypes as the most
        advanced unit, so they shoot at a 0-value unit. Works even better if you
        use Green Prototypes to kill a weaker enemy, so their Trueshot kill
        gives them negative value.
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwsOE4zNFI1LCwsLCwsNU4xQjUsLCwsMTFXN0I1LCwsLCwsNlczQjU7UjEwTi1CMTBXOzhNMDs1TjE1VzM1Vzc7'
      />

      <h3>Defend your base</h3>

      <p>
        If you have a structure in one of the corners, play Green Prototypes on
        the middle one of the 3 unobstructed tiles bordering your base. They
        will now have to take out Green Prototypes before they can send a runner
        in your base, which could cost them just enough to run out of mana for
        the runner.
      </p>

      <BattleSimEmbed
        environment='swarm'
        id='LCwsLCwsLCwsLCwsLDVOMUI1LCwsLCwsOE4zNEI1O1IxME4tQjEwTjs2TTA7NU4xNU4zNDs='
      />

      <h3>Protection from chip</h3>

      <p>
        Better to have a 1 mana unit killed by <CardLink id='N44' />,{' '}
        <CardLink id='N35' />, <CardLink id='I19' />, or <CardLink id='I28' />{' '}
        than to have that damage be dealt to your base!
      </p>

      <BattleSimEmbed
        environment='swarm'
        id='LCwsNkkxOVI1LCwsLCwsLCwsLCwsNU4xQjUsLCwsO1IxMEktQjEwTjs2TTA7NU4xOw=='
      />

      <h3>Kill an equally strong unit</h3>

      <p>
        When there are no units alive nearby as Green Prototypes dies, it
        doesn’t give strength to anyone. Which means you killed a more expensive
        card for just 1 mana.
      </p>

      <h3>Attack isolated structures</h3>

      <p>
        Green Prototypes will not give strength to the structure. So, if they
        don’t have units nearby and you’re in range of a structure, attacking it
        with Green Prototypes is most cost-effective.
      </p>

      <h3>Help in a baselock</h3>

      <p>
        Playing up to 4 units in a turn can get expensive… Luckily Green
        Prototypes only cost 1 mana, yet still take up a spot the enemy can’t
        play on.
      </p>

      <h3>Bait the opponent</h3>

      <p>
        They will want to attack prototypes, just to get the strength bonus.
        This means that you can essentially decide where the enemy will move.
        Used to prevent them from advancing to your base, to make sure you can
        attack elsewhere or to bait them into creating a pocket for a structure.
      </p>

      <p>
        For instance, when Green Prototypes are played on the enemy baseline,
        the opponent might want value from it, so they’ll attack it with a
        slightly stronger unit… Which you can send straight into their base with{' '}
        <CardLink id='N63' />.
      </p>

      <h3>Combine with constructs</h3>

      <p>
        Green Prototypes are constructs, so they will buff and get buffed by{' '}
        <CardLink id='I8' />. Even if we count Green Prototypes as having 0
        value, with Linked Golems, they becomes 5{' '}
        <span className='Highlight'>and</span> you get 2 movement! Which other
        combo does that at level 1?
      </p>

      <p>
        Same concept as with Linked Golems. Instead of <CardLink id='I16' />{' '}
        only giving strength bonus to themselves, if you played Green Prototypes
        nearby it’s a cheap way to double Debug Loggers’ buff.
      </p>

      <p>
        Additionally, <CardLink id='I10' /> will buff all constructs, including
        Green Prototypes.
      </p>

      <h3>Combine with Fortification Tonic or Boosting Elixir</h3>

      <p>
        Play a 1 mana card to have an extra unit to buff with{' '}
        <CardLink id='I3' /> or <CardLink id='I11' />.
      </p>

      <h3>Play Blessed With Brawn on them</h3>

      <p>
        Let’s say your Green Prototypes make it to the enemy base (it’s not a
        high prio target anyway) now play <CardLink id='W14' /> on it. Unless
        they happen to have <CardLink id='N9' /> on hand, they’ll have to invest
        plenty of resources to kill the blessed Green Prototypes… or lose the
        game.
      </p>

      <h3>Extra meat for Prime Oracle Bragda to buff</h3>

      <p>
        The more units you have, the more value you get out of{' '}
        <CardLink id='N76' />, even if those units are “just” Green Prototypes.
      </p>

      <h3>Boost Ubass the Hunter</h3>

      <p>
        If there wasn’t a construct surrounding the space you were going to play
        <CardLink id='N35' /> on, there is now—letting Ubass deal 1–3 extra
        damage.
      </p>

      <h3>More units for Xuri, Lord of Life</h3>

      <p>
        I mean, even if the initial value is essentially 0, once{' '}
        <CardLink id='S19' /> flies over them, it’s 3–7 (depending on level)
        extra strength for 1 mana.
      </p>

      <BattleSimEmbed id='LCwsLCwsLCwsN1MxOUI1LCwsLDEyTjFCNSwsLCwsLDtSMTBOLUIxMFM7Nk0wOzVOMTVTMTk7' />

      <h3>Combine with Dark Harvest</h3>

      <p>
        For one mana, <CardLink id='S15' /> gets extra targets to deal damage
        to.
      </p>

      <h3>Have a target for Call For Aid</h3>

      <p>
        If you have 8 mana but nothing on the board, there’s no other way to get
        4 spawns from <CardLink id='N50' /> (<CardLink id='N2' /> providing only
        3 spawns).
      </p>

      <h3>Trigger for Mystwives</h3>

      <p>
        When Green Prototypes are level 4 or 5, they trigger{' '}
        <CardLink id='W7' />’ ability, which can be a huge lifesaver.
      </p>

      <h3>Target for the Hearth</h3>

      <p>
        If the enemy starts, you open with 4 mana. enough to play Green
        Prototypes and <CardLink id='W3' />. Doing so gives the Hearth a target
        for your next turn, instead of wasting its ability.
      </p>

      <Notice>
        I’m pretty sure there are even more benefits, but for a 1 mana card, I’d
        say that’s already pretty impressive!
      </Notice>
    </>
  )
})
