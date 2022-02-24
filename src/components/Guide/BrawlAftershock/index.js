import React from 'react'
import { useFela } from 'react-fela'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import Link from '~/components/Link'
import FeaturedDeck from '~/components/FeaturedDeck'
import BrawlGuideDisclaimer from '~/components/BrawlGuideDisclaimer'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'

export default React.memo(function GuideAftershock(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to <Link to='/members/bryan'>Bryan</Link>’s{' '}
        <span className='Highlight'>Brawl Gazette</span>, “Aftershock” edition!
        If you are completely new to the Brawl, be sure to read{' '}
        <Link to='/guides/brawl'>the Brawl guide</Link> before moving on with
        this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all structures cost 2 mana regardless of their initial mana
        cost.
      </BrawlGuideDisclaimer>

      <Title>General strategy</Title>

      <p>
        This is a brawl that depends on RNG mainly because of{' '}
        <CardLink id='I2' />, but not only that, decision making is tremendously
        important to win. So let’s go with some basic points:
      </p>

      <h3>Structure Placement</h3>

      <p>
        Your structures will trigger at the start of your turn from top to
        bottom, and from left to right. Knowing this, there are 2 things to bear
        in mind when deciding where to place your structures:
      </p>

      <ul>
        <li>
          You should always place your <CardLink id='N34' /> in the left side of
          the board, and <CardLink id='I19' /> / <CardLink id='I14' /> in the
          right side. If there’s a unit in front of them, Trueshot Post will
          trigger first and may destroy that unit, so Siege Assembly can deal
          base damage, or Mech Workshop can spawn a construct.
        </li>
        <li>
          Place your structures somewhere <CardLink id='N25' /> can’t destroy
          them all. It’s important to look at the board and the current mana,
          ask yourself if the opponent could destroy your structures with
          Siegebreakers in the next couple of turns, that will let you know if
          you can place, for example, Mech Workshop and Siege Assembly besides
          each other, or if you should leave more space between your structures.
        </li>
      </ul>

      <BattleSimEmbed
        id='LCwsLCwsLCwsLCwsLCwsM04zUjMsNk4zNEIzLCwsNEkxNEIzO1IxME4tQjEwSTszTTA7Ow=='
        environment='ironclad'
      >
        Because your structures trigger from left to right, Trueshot Post will
        trigger first and destroy the unit blocking your Mech Workshop, which
        will now be able to spawn a construct.
      </BattleSimEmbed>

      <h3>Unit placement</h3>

      <p>
        The basic thing to bear in mind when placing your units is to put them
        in front of your structures so they can take the shots and keep the
        structure alive. The perfect mana 3 turn is usually <CardLink id='N1' />{' '}
        + Trueshot Post behind, this means that if the opponent used Doctor Mia
        + Trueshot Post they will kill Green Prototypes, and your Trueshot will
        survive. When you are on the attack, place your units with a space
        between them in the opponents baseline to prevent them from using Doctor
        Mia + a structure, since Mia can only trigger surrounding structures at
        level 3.
      </p>

      <BattleSimEmbed
        id='LCwsLCwsLCwsLCwsM04xQjMsLCwsNk4zNEIzLCwsO1IxMEktQjEwSTs0TTA7Ow=='
        environment='ironclad'
      >
        Because Green Prototypes are in front of Trueshot Post, the enemy can’t
        destroy it directly with another structure.
      </BattleSimEmbed>

      <BattleSimEmbed
        id='LDNONjdCMywsNEkxQjMsLCwsLCwsLCwsLCwsLCwsO1IxMEktQjEwSTs0TTA7Ow=='
        environment='ironclad'
      >
        In this position, your units are preventing the opponent’s Mia because
        she can only trigger surrounding structures at level 3.
      </BattleSimEmbed>

      <h3>Cycling</h3>
      <p>
        What you should try to do in this brawl is cycling as fast as possible
        to get Mia and your important structures quick, so the order in which
        you play/discard your cards matters a lot. Normally, make sure you
        play/discard what you want to get faster.
      </p>

      <h3>Structure prioritization</h3>
      <p>
        Not all structures are of equal importance in this brawl. This is the
        way you should normally prioritize them: <CardLink id='N34' /> →{' '}
        <CardLink id='I14' /> → <CardLink id='I19' /> → <CardLink id='N45' /> →{' '}
        <CardLink id='I10' />. When and where you place them will depend on the
        situation, but that’s normally the importance you should give to each
        one. Some insight into each one:
      </p>
      <ul>
        <li>
          <CardLink id='N34' />: it will continuously control the board for you,
          destroying enemy units and structures, limiting what they can do. It’s
          usually the key structure in the game, so make sure it’s well
          protected.
        </li>
        <li>
          <CardLink id='I14' />: May as well be as important as Trueshot Post,
          because this structure gives you a 4 str unit every turn, which will
          serve to tank shots and expand your frontline for a potential
          siegebreakers in the next turns. It basically helps you defend and
          attack at the same time.
        </li>
        <li>
          <CardLink id='I19' />: it’s the main win condition for this brawl, but
          it’s not as important as controlling the board with the aforementioned
          structures. Normally prioritize controlling the board before focusing
          on dealing damage.
        </li>
        <li>
          <CardLink id='N45' />: This structure is mostly useful to clear the
          opponent’s board presence, since at level 3 it will kill some cheap
          cards that are also 3 str. It’s also useful to destroy some weakened
          structures, but most times Powder Tower won’t be enough to destroy the
          opponent’s structures, and Mia/destructobots also survive their
          damage. The damage it deals to the base is important and can help
          finish the match, but it’s not the biggest priority.
        </li>
        <li>
          <CardLink id='I10' />: this structure is optional, I decided to use it
          mainly to tank Siege Assembly shots and defend. The main purpose of UP
          in this brawl isn’t to buff but to act as a shield and also to make
          pressure. For example, if you place an UP in the middle of the board
          with some constructs surrounding it, the opponent will most likely
          need to do something about it, which distracts them from other
          important structures you may have in your baseline, such as Trueshot
          or Siege. So basically, use UP as a defense, and buff with it if
          there’s a chance, but don’t prioritize it as your goal in the match.
        </li>
      </ul>

      <h3>When to use Mia</h3>
      <p>
        When to use Mia: You shouldn’t simply use Mia with the first structure
        you get. Most times it will be good to wait at least one turn so you can
        use it with a structure that will help you control the board better.
        Don’t wait too much to use her, but don’t rush her either. Try to think
        if the inmediate value she provides can be more useful in a turn or two,
        and also consider if you really need to use her right now.
      </p>

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CSTRUCTURE_MANA'>
            featured decks
          </Link>{' '}
          for this brawl. You might find a deck that suits you, or that you can
          base your own creation on.
        </p>
      </Info>

      <Title>Possible Decks</Title>

      <PageEmbed>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Bryan’s Warrior Spin
            </h3>

            <p>
              Here’s the deck I used for Warrior brawl, I believe nothing should
              be changed in this deck besides Upgrade Point. Some other card
              might fit there, and I’ve seen others using something else instead
              of Gifted, but I find Gifted Recruits’ movement to be useful, so
              eh.
            </p>
            <p>
              I also tried SF, with frog spam trying to tank hits, but it got
              outvalued in the end, so in the end it’s always Doctor Mia with
              the usual structures and trying to cycle fast.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='3xn1n2i1i2n3n67i10i14n25i19n34n45'
              name='Warrior Spin'
              author='Bryan'
              tags={['BRAWL', 'STRUCTURE_MANA']}
              faction='ironclad'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title>Extra tips</Title>

      <p>
        Never play your Trueshot Post alone in the board in mana 3, and
        generally, whenever you are unsure if it will survive or not. It’s your
        most important structure, if you place it without protection your
        opponent could destroy it with Mia and the match will be too hard or
        even irrecoverable at that point.
      </p>
      <p>
        Don’t try to preserve all your structures through the whole match. Bear
        in mind which structures are most important, and use the least important
        ones to protect the important ones. For example, you can place a Mech
        Workshop in front of the enemy baseline, to distract him from destroying
        your Trueshot Post by your own baseline. Or use an UP besides some
        constructs near their base so they need to do something about it, and
        leave your Siege Assembly alone.
      </p>
      <p>
        Bait Execution. Most Silver-Platinum, and even some Diamond players, may
        be running Execution. So sometimes it might be better to start the game
        on mana 4 with Siege Assembly or another structure, then they’ll kill it
        with execution and you can place your Trueshot safely, winning the game
        from that point.
      </p>
      <p>
        If you get an early hand with only units, try to rush as quick as
        possible with them. Use Wild Saberpaws for that. If you can’t place your
        structures right away, gaining frontline may allow you to use
        Siegebreakers.
      </p>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/construct-movement'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </>
  )
})
