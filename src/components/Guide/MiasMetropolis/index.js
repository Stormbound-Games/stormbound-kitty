import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardLink from '~/components/CardLink'
import FeaturedDeck from '~/components/FeaturedDeck'
import Link from '~/components/Link'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

export default React.memo(function GuideMiasMetropolis(props) {
  return (
    <>
      <p>
        Mia’s Metropolis’ main playstyle is one that pursues maximum value at
        all times, the main goal to build up an overwhelming backline of
        incredibly powerful buildings that buildup so much value over time that
        your momentum snowballs to the point of no return for the opponent.
      </p>

      <TableOfContents>
        <li>
          <Link href='#overview'>Overview</Link>
        </li>
        <li>
          <Link href='#deck-and-variations'>Deck and Variations</Link>
        </li>
        <li>
          <Link href='#core-cards'>Core Cards</Link>
        </li>
        <li>
          <Link href='#conclusion'>Conclusion</Link>
        </li>
      </TableOfContents>

      <Title id='overview'>Overview</Title>

      <p>
        So, how do you pursue maximum value? The deck’s usage of a variety of
        cheap cards allows you to make positive mana trades, maximize mana use
        per turn, and offer a huge amount of power and presence early in the
        game to build up that all important momentum. So:
      </p>

      <ul>
        <li>
          Try your best to spend as much mana as possible in each turn. This
          also uses as many cards as possible in a turn, which makes your cycle
          much faster, meaning you can get back to your powerful cards faster.
        </li>
        <li>
          Make sure to spend less mana than your opponent on troops/spells when
          using them to destroy an opponent’s troop or building.
        </li>
      </ul>

      <p>
        By always keeping those 2 points in mind, success with this deck will
        naturally follow.
      </p>

      <Title id='deck-and-variations'>Deck and Variations</Title>

      <p>
        Below I will cover the 2 main variations of the deck and their primary
        differences.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2i1i2n3i4n67i8n15n63i19n34'
              name='Hysteria Variation'
              author='IMM0RT4L'
              tags={['HIGH_LEVELS']}
            />
          </Row.Column>
          <Row.Column>
            <h3>Hysteria Variation</h3>
            <p>
              This variation stands out for its namesake combo:{' '}
              <CardLink id='I4' /> + <CardLink id='N63' />. It’s a very basic
              combo, use Ozone Purifiers to push an enemy unit right in front of
              their base, then drop Unhealthy Hysteria to use the enemy’s own
              unit to do direct damage to them. In addition, Ozone Purifiers and
              Unhealthy Hysteria are both very powerful standalone cards, though
              they are weaker overall than their Rush Counterparts.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <PageEmbed>
        <Row>
          <Row.Column>
            <h3>Rush Variation</h3>

            <p>
              This variation stands out for its more aggressive playstyle,
              opting for greater strength on the board with <CardLink id='N4' />{' '}
              and more movement/opportunities for direct damage with{' '}
              <CardLink id='I7' />. In my personal experience, this variation is
              stronger overall mainly due to the fact that Ozone Purifiers and
              Unhealthy Hysteria are less versatile than Lawless Herd and
              Greengale Serpents, being less useful in certain matchups versus
              universal power.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2i1i2n3n67i7i8n15i15i19n34'
              name='Rush Variation'
              author='IMM0RT4L'
              tags={['HIGH_LEVELS', 'RUSH']}
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='core-cards'>Core Cards</Title>

      <h3>
        <CardLink id='I2' />
      </h3>

      <p>
        <strong>Minimum level: 2 / Recommended level: 4/5</strong>
      </p>

      <p>
        The one and only legendary card in this deck, and arguably the most
        powerful legendary in the game. Not only does she provide incredible
        value when played with good timing, her base stats are also great with a
        cheap mana cost of 2 and decent strength, with only a lack of movement
        being the only noticeable weakness.
      </p>

      <p>
        The fact that she is playable at level 2 greatly reduces her
        <abbr titme='Free To Play'>F2P</abbr>” unfriendliness by as much as
        possible. The most important thing to note with Doctor Mia is to
        consider her as a unit with an ability rather than an ability in the
        form of a unit. Don’t be afraid to play her even with no friendly
        buildings, but you should obviously prioritize other similar cost units
        over her when in that particular situation.
      </p>

      <h3>
        <CardLink id='N34' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 5</strong>
      </p>

      <p>
        Trueshot Post is definitely the most expensive card in this deck, mainly
        due to how its interaction with enemy Trueshot Posts work. Because of
        the fact that the damage it does is equal to its strength as a
        structure, a lower level Trueshot Post will be unable to destroy a
        higher level Trueshot Post in one hit while this is not the case for the
        higher level Trueshot Post. This fundamental issue doesn’t make much of
        a difference at all in lower leagues, and level 4 is definitely enough
        to reach high Diamond and Heroes Leagues. But once you pass that
        threshold it will become harder to win against enemy Trueshot Posts that
        are maxed out.
      </p>

      <p>
        When playing Trueshot Post, the most common position is in the corners
        of the backmost line. However, in certain situations, the best position
        for the structure can change. Most notably, you should play Trueshot
        Post in a position where an enemy unit’s position prevents your opponent
        from using units to take out your Trueshot Post.
      </p>

      <BattleSimEmbed
        id='LCwsLCwsLCw1TjNSNSwsLCwsLCwsN04zNEI0LCwsO1IxOE4tQjE4STs2TTA7Ow=='
        environment='ironclad'
      >
        Trueshot Post is being played in this corner so that the opponent’s
        Gifted Recruits will move right in front of it at the beginning of their
        turn, thus blocking the ability for the opponent to clear the structure
        with a unit.
      </BattleSimEmbed>

      <h3>
        <CardLink id='I19' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 4/5</strong>
      </p>

      <p>
        Siege Assembly is the other structure in this deck and is one of the
        biggest threats of Mia’s Metropolis. If left alone, your opponent will
        take critical damage very quickly which makes Siege Assembly incredibly
        difficult to keep alive.
      </p>

      <p>
        Because of this, Siege Assembly’s playstyle is different depending on
        the situation. In matches where you have already built up a strong
        momentum, you can play Siege Assembly similarly to Trueshot Post because
        you should have quite a bit of board presence and preferably other
        structures on the board, which makes it very low risk to play Siege
        Assembly.
      </p>

      <p>
        In a situation where it’s a closer game that is back and forth, Siege
        Assembly should exclusively be played in tandem with Doctor Mia to do
        direct damage or regain board presence, with the understanding that the
        structure will likely be dead in the next few turns.
      </p>

      <p>
        It’s also important to note that Trueshot Post should always be
        prioritized over Siege Assembly due to the fact that Trueshot Post
        provides far more “snowball value”.
      </p>

      <h3>
        <CardLink id='N1' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 5</strong>
      </p>

      <p>
        <Link to='/guides/green-prototypes'>
          Green Prototypes is one of the most powerful cards in the entire game
        </Link>
        and can be found in any strong deck because of its neutral status. It’s
        one of the few 1-mana cards, and if that’s not strong enough, it has the
        best mana to strength ratio as well as being the only 1 cost card with
        movement.
      </p>

      <p>
        It also has the benefit of being a construct, giving it synergy with
        Linked Golems. Its only downside is its on-death effect that buffs a
        surrounding enemy equal to its initial strength. Green Prototype’s mana
        cost means it can fit into practically any turn to maximize mana and
        card draw value. Its movement + mana cost makes it an incredibly strong
        and easy way to create board presence and extend your front line as
        early as possible.
      </p>

      <p>
        In addition, its mana to strength ratio gives it the potential to gain
        great amounts of positive mana trade value when used to destroy enemy
        units.
      </p>

      <p>
        When using Green Prototypes to extend your frontline in the early game,
        be sure to play it on the left or right most lane if possible to reduce
        your opponent’s chances of taking advantage of its bad on-death effect.
      </p>

      <h3>
        <CardLink id='N2' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 5</strong>
      </p>

      <p>
        Summon Militia is another one of the few 1-mana cards in the game, and
        because of that, has the same mana to strength ratio as Green
        Prototypes. Its only downside is the luck required to get the token unit
        to the right place, so it is mainly used as a filler card to create
        extra board presence in turns where some mana is left over.
      </p>

      <h3>
        <CardLink id='I1' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 4/5</strong>
      </p>

      <p>
        Destructobots is the Ironclad version of Gifted Recruits. It is overall
        a very solid and versatile card, just like its neutral counterpart,
        having 1 extra base strength but dealing 1 damage to a friendly unit or
        structure to balance it out.
      </p>

      <p>
        A niche use of that 1 damage would be to take out a 1 strength friendly
        Green Prototypes to prevent your opponent from taking advantage of its
        on-death effect, though a good deal of luck is required for such a
        situation to crop up.
      </p>

      <h3>
        <CardLink id='N3' />
      </h3>

      <p>
        <strong>Minimum level: 4 / Recommended level: 5</strong>
      </p>

      <p>
        Gifted Recruits is the ultimate all-rounder in the deck, just a cheap
        unit with a combination of cheap cost, decent strength, and movement.
        This gives Gifted Recruits the power to make good trades, extend the
        frontline, and create board presence just like Green Prototypes, but
        costing 1 extra mana at the benefit of having no downside.
      </p>

      <h3>
        <CardLink id='N67' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 4/5</strong>
      </p>

      <p>
        Wild Saberpaws is mainly used as a finisher/presence generator in this
        deck. It can rapidly extend the frontline while having decent strength
        in the early game to create presence and acts as a strong finisher in
        the late game able to rush into the enemy base. It usually acts as a mix
        between Gifted Recruits and Lawless Herd when used to confront enemy
        units.
      </p>

      <h3>
        <CardLink id='I8' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 4/5</strong>
      </p>

      <p>
        Linked Golems is an incredibly high value card in the deck, able to buff
        itself with friendly constructs while having 1 movement, which gives it
        the power to make high value plays. However, it has some serious
        drawbacks, needing to be played bordering a friendly construct unit,
        which greatly limits its versatility and overall usefulness. Its
        inclusion in the deck is for its ability to make high value plays, and
        to be thrown back into the deck when the conditions aren’t right to try
        and roll a stronger card.
      </p>

      <h3>
        <CardLink id='N15' />
      </h3>

      <p>
        <strong>Minimum level: 2 / Recommended level: 2+</strong>
      </p>

      <p>
        With the introduction of the vitalize mechanic, Potion of Growth is even
        more powerful than it was before and thus reduces its minimum level
        requirement. The card is mainly used to make small-mid size units,
        basically all of the units that are run in this deck, more formidable on
        the board. For just 3 mana, Potion of Growth has the power of creating
        another threat for the opponent.
      </p>

      <h3>
        <CardLink id='I15' />
      </h3>

      <p>
        <strong>Minimum level: 3 / Recommended level: 5</strong>
      </p>

      <p>
        Overchargers’ ability as a more versatile and powerful version of
        Swarm’s Mischiefs is what makes it such a powerful card, and part of the
        core of this deck. Its ability can be used to do direct damage to the
        enemy base, usually what you should be aiming for, while also being able
        to be used to finish off enemy units or structures.
      </p>

      <p>
        When playing Overchargers, you should usually play it in a position
        where it can do direct damage to the enemy base and use its strength +
        movement to take out an enemy. But when choosing between taking out an
        enemy unit/structure with its ability and another enemy unit/structure
        with its stats, you should definitely choose to take out 2 enemy
        units/structures instead of doing more direct damage. This is because
        board presence should be prioritized over direct damage in this deck
        that aims to create maximum value and snowball momentum.
      </p>

      <Title id='faction-matchups'>Faction matchups</Title>

      <h3>Ironclad Union</h3>
      <p>
        This deck has a good matchup against its own faction. Against other
        archetypes, Mia’s Metropolis has enough resources to create a sizeable
        early game advantage on the board which in turn gives the player more
        than enough breathing room to play structures and start snowballing. In
        a mirror matchup, the winner is the one that has the better luck to draw
        higher value cards at an earlier time.
      </p>

      <h3>Winter Pact</h3>
      <p>
        Ironically, this deck has a very strong matchup against Winter Pact,
        given that Winter Pact is well known for late game value. The reason for
        this is simple: Mia’s Metropolis has enough strong early game cards to
        create a ton of value and pressure on the board much faster than Winter
        Pact decks are able to, and by the time Winter Pact’s late game value
        starts to show, it is often too late.
      </p>

      <h3>Tribes of the Shadowfen</h3>
      <p>
        Shadowfen is this deck’s worst matchup in terms of faction. Shadowfen
        has plenty of resources such as Curse of Strings or Blood Ministers to
        take advantage of this deck’s early game presence, and the poison
        mechanic is especially damaging to the focus on building up strong units
        on the board at the start.
      </p>

      <h3>Swarm of the East</h3>
      <p>
        This deck’s matchup against Swarm of the East is good because both sides
        have an emphasis on board presence and pressure, with this deck
        generally having stronger resources to accomplish that. If the enemy is
        unable to deal with it, an early Trueshot Post will almost always result
        in a victory. The only thing to watch out for is even more aggressive
        decks that aim to quickly end the game with direct damage. In these
        matchups, focus more on reducing the enemy’s frontline and keeping their
        unit’s strength in check.
      </p>

      <Title id='conclusion'>Conclusion</Title>

      <p>
        Mia’s Metropolis is a powerful deck that relies on board control to take
        over the tempo of games. Despite this focus on value, the deck has a
        plethora of resources to directly finish off opponents for a quick
        finish. Play this deck for a consistent climb to Diamond League and
        above.
      </p>
    </>
  )
})
