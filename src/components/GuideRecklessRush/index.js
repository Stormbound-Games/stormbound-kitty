import React from 'react'
import { Link } from 'react-router-dom'
import guides from '../../data/guides'
import CardLink from '../CardLink'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Info from '../Info'
import Guide from '../Guide'
import { Stones } from '../Resource'
import Row from '../Row'
import Title from '../Title'

const guide = guides.find(g => g.id === 'RECKLESS_RUSH_GUIDE')

export default React.memo(function GuideRecklessRush(props) {
  return (
    <Guide {...guide}>
      <p>
        So you want to learn the hidden arts of Reckless Rush? Well who better
        to teach you then Reckless Rush himself. In this guide you will learn
        how to play a super aggressive playstyle which can be applied to all
        rush deck archetypes as well as how to play RR at a very effective
        level. For those not familiar with the RR deck, it is a hyper-aggressive
        Swarm rush deck that focuses on closing out games as fast as possible to
        prevent card level differences between you and your opponent from
        influencing the game heavily. In other words, if you’re looking for a
        deck that can get you to insanely high ranks with relatively low levels,
        this is the perfect deck for you.
      </p>

      <ol style={{ columns: '16em' }}>
        <li>
          <a href='#the-decks'>The decks</a>
        </li>
        <li>RR Decks/ Why should I play RR?</li>
        <li>Deck Overview</li>
        <li>Prioritization</li>
        <li>Cycling</li>
        <li>Order</li>
        <li>Positioning</li>
      </ol>

      <Guide.FullWidth padding='120px'>
        <Title id='the-decks'>The Decks</Title>

        <Row desktopOnly wideGutter>
          <Column>
            <FeaturedDeck
              id='2n13n23s14n32s243s23n632n671s64n151s84s11'
              name='Reckless Rush'
              author='RecklessRush'
              category='REGULAR'
              staticLevels
            />
          </Column>
          <Column>
            <p>This is the Reckless Rush deck in all its glory.</p>
            <p>
              These were my exact card levels when I reached Diamond 5. Note
              that <CardLink id='N63' /> costed 2 mana at that time instead of
              3. That being said, even at 3 mana, it is still very viable.
            </p>
          </Column>
        </Row>

        <Row desktopOnly wideGutter>
          <Column>
            <p>
              If you play in Gold or in lower leagues, I would recommend a small
              variation of the deck with <CardLink id='N26' /> instead of{' '}
              <CardLink id='S24' />
              —which are pretty fantastic at lower levels. These were my exact
              card levels when I reached Platinum at 12 base health.
            </p>
            <p>
              Another swap that can be considered would be <CardLink id='N2' />{' '}
              for <CardLink id='N66' />, especially since they now cost 2 mana
              only. It’s a 1-mana trade-off for more control and movement, and
              most importantly less random.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='2n11n663s12n32s21n672s62n151s82n632s112n26'
              name='Reckless Rush (Snowmasons)'
              author='RecklessRush'
              category='REGULAR'
              staticLevels
            />
          </Column>
        </Row>
      </Guide.FullWidth>

      <p>
        As you might have noticed by now, Reckless Rush decks consist of an
        extremely low mana curve, with the most expensive card peaking at a cost
        of 4 mana. Now some of you are probably wondering, “why should I even
        play this?” Apart from it being one of the highest win rate decks to
        ever exist, RR is great for players who are looking for quick games
        (possibly to grind gold or finish quests) or looking to climb high ranks
        with relatively low level cards. In fact these were my levels upon
        reaching plat 5 with base health 12.
      </p>

      <p>
        Additionally, I’d like to quickly point out that this deck is amazing
        for grinding quick gold on ladder since games are short and it also
        makes for a very well rounded deck in most brawls allowing you to
        achieve the <Stones amount={10} /> milestone. Now that you’re all caught
        up on the introduction, let’s dive into the specifics of this guide.
      </p>

      <Title id='how-to-play'>How to play</Title>

      <p>
        Before jumping into this concept I like to call “prioritization”, the
        very first thing I’d like you to do is take a good look at the deck.
        Take some time to understand it, analyze it (find which cards mix
        together well) and most importantly{' '}
        <span className='Highlight'>MEMORIZE</span> it!
      </p>
      <p>
        I cannot stress this part enough because if you are going into a match
        without knowing all the cards in your deck, you’re essentially trying to
        cook a recipe without knowing its ingredients. To play any Stormbound
        deck at a competitive level, the first step is to analyze the deck. So
        let’s get right into a brief overview of all its cards.
      </p>

      <h3>Green Prototypes</h3>
      <p>
        <CardLink id='N1' /> are amazing, especially for 1 mana. It is the only
        1 mana unit card with movement that currently exists in the game. It is
        great for setting up combos (since it’s so cheap), moving frontline up
        so you can deploy more units closer to the enemy base, great for trading
        into enemy units in last resort defenses, and overall it is just an
        extra unit on the board the enemy has to deal with.
      </p>

      <p>
        This card is mostly used for baiting the enemy to attack it, defend a
        stronger unit that is tucked in the corner, or just to move frontline
        up/keep frontline. It is perfect for Trinity Openers which will be
        discussed later on in the guide.
      </p>

      <Info icon='compass' title='Green Prototypes guide'>
        For more reasons to love Green Prototypes as a card, refer to the{' '}
        <Link to='/guides/green-prototypes'>
          Green Prototypes guide by Stratadox
        </Link>
        .
      </Info>

      <h3>Summon Militia</h3>
      <p>
        <CardLink id='N2' /> is not the greatest card in the deck so you should
        not be actively looking to play it. In fact, it is typically cycled
        quite often as its main purpose is to use up any excess 1 mana you have
        and speed up your deck cycle. Remember, the more cards you play, the
        faster you will draw back cards you played previously.
      </p>

      <p>
        Look to only use play it on turns where you will have 1 mana in excess.
        In regards to the actual value of the card, it’s only expected to be
        used to hold your frontline, otherwise it’s not a really great.
      </p>

      <h3>Doppelbocks</h3>
      <p>
        <CardLink id='S1' /> is an amazing 2 mana card—so unique and can serve
        so many purposes. Since the token unit spawns forward, it behaves
        similarly to a movement card since it can be used to push the frontline
        forward. Additionally, since it provides 2 units, it is amazing for
        keeping frontline because your opponent will likely have to spend extra
        mana to deal with two units rather than one. Finally, this card can push
        the frontline forward in cases no other movement cards can. It is
        perfect for protecting your stronger units.
      </p>

      <h3>Gifted Recruits</h3>
      <p>
        <CardLink id='N3' /> is a staple 2 mana unit card in almost every deck
        and a Swarm rush essential. This card does it all, it pushes frontline
        forward; it’s a relatively strong unit as well (and only gets better as
        it levels up); it’s cheap and as a last resort can be used to defend.
      </p>

      <p>
        The card is typically used as a high strength unit for dishing out
        damage on the opponent, you will likely want to play it in corners and
        defend it using other weaker cards like <CardLink id='S1' />
        . On turn mana 5 and if you have a strong board, you can typically
        afford to play
        <CardLink id='N3' /> + <CardLink id='N15' /> to πut pressure on your
        opponent and force out cards.
      </p>

      <h3>Headstart</h3>
      <p>
        The main reason to include <CardLink id='S24' /> is because the typical
        Swarm rush deck gets countered by many control cards, specifically cards
        that deal AoE (Area of Effect). This is because many rush decks follow
        the idea of cheap, weak units and therefore get easily countered by some
        control cards like <CardLink id='N36' /> or <CardLink id='N29' />.
        Headstart is a very strong card in regards to the{' '}
        <Link to='/calculators/value?cards=S24'>mana to strength ratio</Link>,
        as it is +1 strength above <CardLink id='N4' /> at every level.
      </p>
      <p>
        That being said it has a slight drawback of not offering full control of
        where to place it, therefore it can never be used defensively. Since you
        decide when to play this card, look to control where the token is going
        to land by playing out your other cards first.
      </p>
      <p>
        It is important to note that if your Lawless Herd is ever +1 level
        higher than your Headstart, then you should use Lawless Herd over
        Headstart since it is virtually the same card except you get the added
        benefit of controlling where to play it.
      </p>
      <p>
        This card is meant to be played at times where you want to keep
        frontline since it is one of the highest strength units in this deck and
        very cheap in mana for what it’s worth. It is great to play when you aim
        to do massive pushes in future turns, however since it will take two
        turns before going into the enemy base, this might not always be the
        best card when the game is in its final turns (unless you aim to use
        Forgotten Souls to push it into the base next turn).
      </p>

      <h3>Restless Goats</h3>
      <p>
        Despite all the negative opinions about <CardLink id='S2' />, they are
        actually great at all levels and get much better as they level up. On
        paper, it seems very low in value and even has negative value attached
        to it (since you deal 1 damage in exchange for 2 base health at level
        1), but specifically in this deck, it absolutely shines.
      </p>
      <p>
        When playing Swarm rush, your focus is to close out the game as soon as
        possible and that being said, you should be willing to trade any base
        health you can to get a lead over your opponent. Since you are expected
        to win the game before the enemy can even deal high amounts of damage to
        your base, the self base damage attached to Restless Goats is
        negligible.
      </p>
      <p>
        This card serves two main purposes in this deck: a) for Trinity Openers
        (discussed later) and b) to finish off the enemy since it is one of the
        few 2-movement units in the deck.
      </p>
      <p>
        It is not expected to be played in the mid-game because there are other
        cards that can substitute for the same niche, specifically Gifted
        Recruits can generally do the same job as Restless Goats outside of the
        two main purposes listed above. In the mid-game if you have the
        opportunity to send this card into the enemy base, it’s generally better
        to keep it on board and make it behave like a Gifted Recruits where it
        can be used in the corners or to defend a stronger unit.
      </p>

      <h3>Unhealthy Hysteria</h3>
      <p>
        <CardLink id='N63' /> has been put into question quite a few times (even
        from me). Since its change to make it 3 mana instead of 2, it actually
        started seeing less playrate in the RR decks. This was mainly due to the
        fact that 3 mana in this deck is fairly expensive and you were usually
        better off playing other cards instead of this one.
      </p>
      <p>
        That being said, it is still a very powerful card. The main reasons to
        play it is to stall the enemy out by making two units attack one
        another, deal early chip damage if they play a strong unit bordering
        their base, or in the late game where you can pressure the enemy into
        defending their base, and use hysteria to make that unit attack it.
        Since this card is a spell, it does not rely on the frontline to be
        played, and it can be used to come up with some very sneaky lethals.
      </p>

      <h3>Wild Saberpaws</h3>
      <p>
        <CardLink id='N67' /> should be played for similar reasons as Restless
        Goats. They can substitute for one another in many cases. One notable
        difference is that you can manipulate its movement which can prove to be
        very useful at times. In cases the enemy is doing a good job at
        defending and it’s impossible to play any movement card since they would
        just attack into the enemy units, this card can be played as a 0
        movement unit and fill the same niche as Head Start.
      </p>
      <p>
        To reiterate, this card is great in the early and late game: for Trinity
        Openers in the early game and as a finisher in the late game. In cases
        where it can be used to fill the same function as Restless Goats, it’s
        preferable to use this card instead since there is no self base damage
        drawback.
      </p>

      <h3>Forgotten Souls</h3>
      <p>
        <CardLink id='S6' /> serve only one purpose in the entire deck and
        should never see any play for any other reason. In regards to its{' '}
        <Link to='/calculators/value?cards=S6'>mana-to-strength ratio</Link>, it
        is the weakest in the entire deck. Since the focus of this deck is to
        get lots of damage fast this card should really only be played once in
        the entire match and it should be the last card played. The only reason
        to ever play it is to win the match, whether that means to use it to
        push a weak unit into the base, perhaps combo’d with Potion of Growth or
        most remarkably with Devastators. At 7 mana, the Devastators + Forgotten
        Souls combo is a deadly one.
      </p>

      <p>
        The RR prioritization refers to being able to distinguish which cards
        you should aim at playing over others in any given situation. This idea
        can extend to which enemy units/structures you should focus on killing
        as well. Which and how you prioritize cards will vary depending on each
        and every unique turn given a new board state. However, while
        prioritization differs largely, there are some rules you can apply to
        your gameplay to produce the most value/best results for each given
        turn. We can start by exploring Trinity Openers.
      </p>

      <p>
        Within the RR decks, there exists a total of three 2-movement units:
        <CardLink id='S2' />, <CardLink id='N67' /> (although not always
        2-movement) and <CardLink id='S8' />. Each of these cost three mana or
        less and are necessary for preforming any Trinity Opener. Simply put, a
        Trinity Opener is pushing your frontline to three tiles forward on your
        very first turn. In doing so you open up the entire board and give
        yourself the ability to play a unit on any tile. By maintaining this
        frontline you give yourself a huge advantage over your opponent.
      </p>

      <p>Here are all the possible Trinity Openers at 3 mana:</p>
      <ul>
        <li>
          <CardLink id='S2' /> + <CardLink id='N1' />
        </li>
        <li>
          <CardLink id='N67' /> + <CardLink id='N1' />
        </li>
      </ul>

      <p>And at 4 mana:</p>
      <ul>
        <li>
          <CardLink id='S2' /> + <CardLink id='N1' />
        </li>
        <li>
          <CardLink id='S2' /> + <CardLink id='N3' />
        </li>
        <li>
          <CardLink id='S2' /> + <CardLink id='S1' />
        </li>
        <li>
          <CardLink id='N67' /> + <CardLink id='N1' />
        </li>
        <li>
          <CardLink id='N67' /> + <CardLink id='N3' />
        </li>
        <li>
          <CardLink id='N67' /> + <CardLink id='S1' />
        </li>
        <li>
          <CardLink id='S2' /> + <CardLink id='N67' /> (either way)
        </li>
        <li>
          <CardLink id='S8' /> + <CardLink id='N1' />
        </li>
      </ul>

      <p>
        Note: When given multiple options, you should prioritize the Trinity
        Openers that grants you the most value based off your card levels.
      </p>
      <p>
        Trinity Openers are the best turn 1 openers for RR because it is very
        hard for the opponent to match this opener. Generally speaking you
        should still be able to maintain this frontline for the duration of the
        match.
      </p>
      <p>
        It’s important to note that semi-Trinity Openers exist where you push
        your frontline only two tiles forward, however (instead of one) you have
        two units controlling the same row, preferably centre-left and
        centre-right. Since they move up at the start of your next turn, you
        still have good frontline over the board. However, there are far too
        many semi-Trinity Openers for me to list in this guide, just know that
        each requires at least one of the Trinity cards (Restless Goats, Wild
        Saberpaws or Shady Ghoul).
      </p>

      <p>
        Two reasons as to why Trinity Openers are so important. 1. You get
        immediate frontline which you can take advantage of in your following
        turns. 2. You give yourself the opportunity to get extremely early and
        well defended Devastators.
      </p>
      <p>
        Devastators is one of the most impactful cards in RR. It is considered a
        high risk high reward card because for 4 mana you can get away with
        dealing up to 12 damage to the enemy base (lv5, at lv1 up to 6 damage)
        but at the same time for 4 mana you’re only playing a 6 strength unit,
        and in this case you’re better off playing other alternatives like
        Gifted Recruits and Wild Saberpaws. Playing Devastators without
        Forgotten Souls is like a gamble, if the enemy doesn’t have the cards to
        counter it, you can win the game simply from this play, but you can also
        lose the game if the enemy is able to defend against it and delay your
        rush. Devastators is also great for removing structures, and when
        enemies play buildings in the corners, you can leave them up until late
        game for an easy Devastators + Forgotten Souls combo straight into the
        enemy base.{' '}
      </p>
      <p>
        Note: In this case Devastators would usually attack towards the centre,
        but because the structure is in front, Devastators will attack forward
        instead. (Refer to the Beginner’s Guide to better your understanding of
        how units attack when there are multiple enemies bordering the tile).
      </p>
      <p>
        Additionally, since a large portion of the extra damage comes from its
        effect, and thus you can abuse this concept by keeping Devastators alive
        even with just a sliver of health. Although a full strength Devastators
        at the enemy baseline is quite threatening, even a one strength
        Devastators can be the enemies highest priority target on the board.
        Sometimes your enemies may even be forced to play an execution on a one
        strength Devastators to prevent the damage. In lower leagues since
        enemies don’t typically play decks with good removal, aim to play
        Devastators as much as possible because you are generally rewarded in
        most of these exchanges.{' '}
      </p>
      <p>
        Although Devastators is a high-risk high-reward card, there are ways to
        minimize the risks when playing this card. By expanding on what we have
        already learned, Trinity Openers are amazing for setting up an early
        Devastators. It is important to note that the earlier into the match you
        set down Devastators, the harder it is for your enemy to deal with it
        because of mana constraints. After a turn 1 Trinity opener, assuming the
        enemy was unsuccessful in clearing both units, you can get an early
        Devastators tucked into either the top left or top right corner. These
        are Devastators’ two favourite tiles on the board.
      </p>
      <p>
        In this image, the enemy needs to find a way to clear the Devastators.
        This can only be done in a limited number of ways due to mana
        constraints. A fair trade in mana for the enemy would be using Execution
        in exchange to kill the Devastators. However, it is important to realize
        that if the enemy does not have a way to use up the excess mana, the
        Execution is effectively costing more than 4 mana and you automatically
        win in this exchange. In the case that the enemy is able to use up the
        excess mana, if your defending unit is still alive, you will be able to
        use it to defend another high priority unit. During your next turn, it
        will move forward allowing you to pull off yet another top corner tuck
        play, generally this is best accomplished with a unit + Potion of
        Growth, once again setting down a high priority target for the enemy to
        deal with.
      </p>
      <p>
        By applying pressure every turn you snowball your early game lead in
        hopes to close out the game fast. This deck doesn’t fair** well into the
        late game so you really want to squeeze in any advantages you can.
      </p>
    </Guide>
  )
})
