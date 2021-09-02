import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardLink from '~/components/CardLink'
import Info from '~/components/Info'
import Link from '~/components/Link'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

export default React.memo(function GuideStructures(props) {
  return (
    <>
      <p>
        Welcome to the Fundamentals of Using and Countering Structures. In this
        guide, we will see how to use structures, how to counter them as well as
        some advanced tactics to be prepared on the battlefield.
      </p>

      <TableOfContents>
        <li>
          <Link to='#using-structures'>Using structures</Link>
        </li>
        <li>
          <Link to='#miscellaneous-tips'>Miscellaneous tips</Link>
        </li>
        <li>
          <Link to='#countering-structures'>Countering structures</Link>
        </li>
        <li>
          <Link to='#advanced-tactics'>Advanced tactics</Link>
        </li>
      </TableOfContents>

      <Info icon='compass' title='Temples'>
        <p>
          Note that we will not cover temples in this guide as I have not played
          with these relatively new cards enough to give solid advice.
        </p>
      </Info>

      <Title id='using-structures'>Using structures</Title>
      <p>
        Most structures rely on staying alive to generate value, and so using
        structures to win requires playing defense. There are three main ways to
        defend structures:
      </p>
      <ol>
        <li>keeping your structures away from the opponent,</li>
        <li>keeping your opponent away from your structures,</li>
        <li>blocking direct access to structures.</li>
      </ol>

      <h3>Keep your structures away from the opponent</h3>
      <p>
        Just play them as far from your opponent as possible: in the corners of
        your back line. This forces your opponent to spend mana to come to you
        instead of generating value.
      </p>

      <h3>Keep your opponent away from your structures</h3>
      <p>
        The most obvious way to do this is to destroy your opponent’s units and
        structures. But you won’t always have the mana or cards to do this every
        turn. Here are several ways to deny board presence without needing to
        wipe your opponent entirely off the board.
      </p>

      <p>
        Note that each of these examples are illustrations of the end of your
        turn, and the opponent’s units will advance at the beginning of their
        turn.
      </p>

      <BattleSimEmbed id='LCwsLDVOMVI1LCw1VDNSMSwsLDVONjdCNSwsNU4zQjUsLCwsLCwsLDtSMjBXLUIyMEk7NE0xOzs='>
        <strong>Basic Front Line Blocking:</strong> When the opponent advances,
        your units will block their front line. They’ll be forced to waste
        resources fighting your units instead of advancing their front line.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='LDNOMVI1LDRUN1IxLDZTMTZSNSw1VDNSMSwsLDRUN1IxLCw2TjI4QjUsNk40QjUsLCwsLCwsLCw7UjIwUy1CMjBJOzZNMTs7'
        environment='winter'
      >
        <strong>Protected Front Line Blocking:</strong> Your units will block
        their front line, and they’ll be shielded from harm by your opponent’s
        own units. They’ll have to use up their special abilities to advance or
        waste a turn.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='LCwsM1MxUjUsLCwsM1Q3UjEsLDVOMVI1LCwsNU4zQjUsLCw1VDNCMSwsLCw1TjFCNTtSMjBTLUIyMFc7NE0xOzs='
        environment='winter'
      >
        <strong>Exploiting Attack Direction Priority:</strong> Despite not
        blocking all the opponent’s front line tiles, friendly units flanking
        the open tile will redirect units that might normally advance towards
        the base to attack sideways instead.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='LCwsM1MxUjUsLCwsM1Q3UjEsNU4xUjUsLCwsLDVOM0I1LCw1VDNCMSwsLCw2VzNCNTtSMjBTLUIyMFc7NE0xOzs='
        environment='winter'
      >
        <strong>AOE Vulnerability:</strong> While this formation does defend the
        structure, watch out that it is vulnerable to AOE effects.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='Nk40UjUsLCwsLCw2TjE2UjUsLCw1TjY3QjUsLCwsLCwsLCwsNlczQjU7UjIwVy1CMjBXOzVNMTs7'
        environment='winter'
      >
        <strong>Punishing the Path of Least Resistance:</strong> If your
        opponent decides to advance with a speed 1 unit on tile D3, they will
        end up protecting your structure for you.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='LCwsLCwsLCwsLCw1TjY3UjUsNU4xUjVGLDVXMkI1LDVUM0IxLDVOMUI1LCwsLDtSMjBTLUIyMFc7NE0xOzs='
        environment='winter'
      >
        <strong>Freeze FL blocking:</strong> Freezing, even without a damaging
        combo follow-up, can help stall the enemy front line.
      </BattleSimEmbed>

      <h3>Block direct access</h3>

      <p>
        Should denying board presence fail and the opponent is able to advance
        their front line all the way to your structures, direct access to your
        structures must be blocked in order to keep them alive.
      </p>

      <BattleSimEmbed id='LCwsLCwsLCwsLDVOMUI1LCwxNU42OFI1Riw1VzJCNSwsM044QjUsOFc5QjUsLCw2VzNCNTtSMjBJLUIyMFc7Nk0xOzs='>
        <strong>Structure Blocking Basics:</strong> On the right side, your own
        unit is protecting your structure. On the left side, the opponent’s unit
        is protecting the structure. Note that your opponent will often not be
        able to destroy their own units to gain access to your structures. Also,
        using weak friendly units to protect your structures might not always be
        enough to protect them from a 2 speed unit.
      </BattleSimEmbed>

      <BattleSimEmbed id='LCwsLCwsLCw2TjE2QjUsNVQzQjEsLDFGNVI1LDhOMzRCNSw1VzJCNSwsLCwsLDtSMjBGLUIyMFc7Nk0xOzs='>
        <strong>Second Row Defense:</strong> If your units are already placed in
        such a way to shield your structure on the second row, it can make sense
        to place your structure there to gain more board presence.
      </BattleSimEmbed>

      <BattleSimEmbed id='LCwsLCwsLCw2TjE2QjUsLDFGMTBSNSwsOE4zNEI1LCwsN0Y3UjVQLCw0TjNCNSwsO1IyMEYtQjIwVzs2TTE7Ow=='>
        <strong>Exploiting Attack Direction Priority on the Second Row:</strong>{' '}
        Despite there being an open tile on the side, any enemy unit placed
        there will attack the Gifted Recruits first, not the structure.
      </BattleSimEmbed>

      <BattleSimEmbed id='LCwsLCwsLCw2TjI4UjUsLCw2TjE2QjUsLDVOM0I1LDVOM1I1LDhOMzRCNSwsLCw7UjIwSS1CMjBXOzZNMTs7'>
        <strong>
          More Exploiting Attack Direction Priority on the Second Row :
        </strong>{' '}
        Attack Direction priority can again be used to direct opponents away
        from attacking your structure placed in columns A or D and towards a
        sacrificial unit in columns C or B.
      </BattleSimEmbed>

      <BattleSimEmbed id='LCwsLCwsLCwzUzFSNSwsLDVONjdSNSwzVDdSMSwsLCw4TjM0QjUsLCw7UjIwUy1CMjBXOzVNMTs7'>
        <strong>Sacrificing Structure Health:</strong> Sometimes, letting your
        structure take a little bit of damage in exchange for a safer plant is
        the best play.
      </BattleSimEmbed>

      <BattleSimEmbed id='LCwsLCwsMTBJMVIxLCwsN0k4UjEsLCwsLCwsLDhOMzRCNSwsO1IyMEktQjIwVzs1TTE7Ow=='>
        <strong>Trueshot Post and Aggression:</strong> <CardLink id='N34' /> can
        be played a little more riskily;any enemy unit that is played to move to
        A1 has a good chance of being destroyed by your Trueshot Post.
      </BattleSimEmbed>

      <Title id='miscellaneous-tips'>Miscellaneous tips</Title>

      <ul>
        <li>
          Play structures as early as possible. The earlier a structure is
          played, the more value it can generate. If your structure can’t be
          played on your first few turns, use them to deny your opponent board
          presence for when you can play your structures so that they are safe.
        </li>
        <li>
          The only real way around hard counters like <CardLink id='N21' /> and
          <CardLink id='S10' /> is counter-cycling. You will either need to
          out-cycle your opponent to cycle back to your structure before they
          can cycle back to their counter (<CardLink id='N14' /> and{' '}
          <CardLink id='N33' /> work really well for this), or you can bait out
          their counter with a threat they can’t afford to ignore (like a large
          unit against their base).
        </li>
        <li>
          Sometimes structures will need to be sacrificed to stay alive long
          enough to slow down the game to build up a structure later. If your
          opponent is playing a rush deck, don’t be afraid to stall the match
          with a structure played like a <CardLink id='N13' /> if your base
          depends on it. This becomes applicable especially if your structure is
          relatively cheap, like the Hearth
        </li>
        <li>
          You don’t always need to plant structures as far back as possible.
          Sometimes, playing it further up can be a cheeky way to keep your
          front line advanced when protected properly, or as a bait before a
          finishing blow, or as a combo for <CardLink id='N39' />.
        </li>
        <li>
          Your entire deck should not be just structures, units with 0 speed and
          spells. If you do this, you will almost certainly lose. A successful
          structure deck is a deck with some (usually 2 or less) structures, not
          a deck made entirely with structures.
        </li>
        <li>
          Try not to trap your own units behind structures (with the possible
          exception of <CardLink id='I5' />, which will decay on its own, or{' '}
          <CardLink id='I10' />, which will generate a hilariously strong
          construct that will discourage your opponent from destroying said
          Upgrade Point).
        </li>
      </ul>

      <Title id='countering-structures'>Countering structures</Title>

      <p>
        There are 4 main ways to counter structures. Which strategy is best will
        depend on your deck and your opponent’s faction and structures.
      </p>

      <ol>
        <li>
          Apply pressure before they’ve played their structure. Force your
          opponent into a situation such that playing a structure would be as
          bad a play as possible. This can include: forcing them to play their
          structure on a middle column in front of their base, making the only
          available tile to play a structure vulnerable to attack the very next
          turn, forcing them to play their structure in a way that wastes value,
          and lining up units on row 4 so that if they play a structure on their
          back line, they will have blocked their own backline, leaving them
          without space to play cards on their next turn.
        </li>
        <li>
          Destroy it immediately. It can’t generate value if it’s been
          destroyed. This is best accomplished with targeted/AOE spells and
          effects (think Execution or <CardLink id='N57' />) or 2+ speed units
          (like <CardLink id='N28' />) to rush through a defense.
        </li>
        <li>
          Rush their base. It won’t matter that a structure can generate value
          if you defeat your opponent before their structure can begin to pay
          for itself. Ignore their structure and go for the throat.
        </li>
        <li>
          Compete for value. This is probably a last resort since most structure
          decks are geared for late game anyways, but if your deck can generate
          more value (strength in units or damage to enemy units and structures)
          than your opponent’s structures, you’ll be able to eventually
          overwhelm them even if they can defend their structures (for the time
          being).
        </li>
      </ol>

      <Title id='advanced-tactics'>Advanced tactics</Title>

      <p>
        Here I will post miscellaneous tactics advanced players can use to get
        more out of their structure decks or to counter structure more
        effectively.
      </p>

      <h3>Using structures</h3>

      <ul>
        <li>
          You can bait out a defensive start from your opponent if you play like
          a rush deck your first few turns. This might trick them into playing
          defense themself, which can put them in a disadvantageous spot when
          you plant a structure in the back.
        </li>
        <li>
          Certain structures can be played extremely aggressively, like Trueshot
          Post and <CardLink id='N45' />, which your opponent will need to
          address very quickly or they will be more likely to get wiped the next
          turn. Use this to put on the pressure to force your opponent to make
          non-optimal plays and mistakes.
        </li>
        <li>
          Watch out if your opponent has <CardLink id='N63' />,{' '}
          <CardLink id='S6' />, <CardLink id='S20' />, <CardLink id='N25' /> or
          other cards that can make certain defensive positions listed above
          ineffective.
        </li>
        <li>
          Make sure you always leave some sort of defense for your base and not
          just your structure. A structure left on the back line with nothing
          else can easily lead to a 3 unit base-lock and a near-instant defeat.
        </li>
      </ul>

      <h3>Countering structures</h3>

      <ul>
        <li>
          If you suspect your opponent is using structures, try to place your
          units such a way that none of them are in row 4 when your opponent has
          5 mana. Otherwise, you’re giving your opponent free cover for a turn 3
          Frozen Core and that is not fun to play against. Also, don’t play in
          columns A and D until you’ve reached your opponent’s back line so they
          have no chance of getting cover for a corner-planted structure on any
          early turn.
        </li>
        <li>
          If your opponent is using a structure that deals damage to a single
          target or has some sort of AOE buffing capabilities, try to stuff the
          board with as many cheap units as possible. A single token frog or
          <CardLink id='N1' /> can block an 8-damage shot from Trueshot Post or
          deny your opponent a tile surrounding an Upgrade Point to get a buff
          from.
        </li>
        <li>
          You can use your opponent’s buildings as shields if they place them
          poorly. This works really well against structures like Mech Workshop
          and Upgrade Point.
        </li>
        <li>
          If you have a structure counter, like Execution, and you suspect or
          know your opponent has a structure, save it to actually counter their
          structure and cycle as fast as possible to get it back again every
          time you use it. You don’t want your opponent building a value
          advantage against you. Also, don’t fall for baits, that’s exactly what
          they need to win.
        </li>
        <li>
          If you have an elder and your opponent is playing with Trueshot Post,
          <CardLink id='I19' />, <CardLink id='I14' /> or the like, go ahead and
          plop it down in the back and watch as your elder gets triggered every
          turn.
        </li>
        <li>
          Structure players need board presence to win, too. If you can’t do
          anything else, occupy every tile available to them and try to see if
          you can prevent them from having the space to play any cards at all.
        </li>
        <li>
          <CardLink id='F12' /> and <CardLink id='F22' /> are hilariously
          effective at getting past a defensive hold and attacking vulnerable
          structures.
        </li>
        <li>
          Don’t forget that the opponent loses if their base is defeated. If
          you’re in a long game, don’t forget that your end goal is the
          opponent’s base and not their structures. Always keep an eye out for
          ways to slip past and deal damage to their base and not just their
          structures.
        </li>
      </ul>
    </>
  )
})
