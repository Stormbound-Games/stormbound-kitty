import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import DeckStatsChart from '~/components/DeckStatsChart'
import FeaturedDeck from '~/components/FeaturedDeck'
import Info from '~/components/Info'
import Only from '~/components/Only'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Table from '~/components/Table'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import { Common, Rare } from '~/components/Resource'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import styles from './styles'

const DECK_ID = '5xn1n2f3n3f4n9n12n16n28f14n30n52'

const Graph = props => {
  const deck = serialization.deck.deserialize(props.id).map(getResolvedCardData)

  return (
    <DeckStatsChart
      deck={deck}
      modifier={props.modifier}
      syncId={props.syncId}
      withHowTo
    />
  )
}

export default React.memo(function GuideD1SFCommons(props) {
  const { css } = useFela()
  const [cardLevel, setCardLevel] = React.useState(5)
  const cards = {
    N12: getResolvedCardData({ id: 'N12', level: cardLevel }),
    N28: getResolvedCardData({ id: 'N28', level: cardLevel }),
    N30: getResolvedCardData({ id: 'N30', level: cardLevel }),
    N52: getResolvedCardData({ id: 'N52', level: cardLevel }),
  }
  const combine = (a, b) =>
    `${cards[a].mana + (b ? cards[b].mana : 0)} mana / ${
      cards[a].strength + (b ? cards[b].strength : 0)
    } damage`

  return (
    <>
      <p>
        Fair disclaimer: I am by no mean the most talented player. I have been
        playing on and off since late 2018 and reached Diamond 1 in May 2019,
        and did so every month since.
      </p>
      <p>
        As a free-to-play player, my collection is not very developed. I
        originally reached Diamond with a Winter rush deck, and kept playing
        Winter for a long while. Eventually I switched to Shadowfen for a change
        of pace, but did not have a lot of options. So thanks to kind help from{' '}
        <Link to='/members/the_mirc'>The_mirc</Link>, I came up with a deck made
        of <Common amount={11} /> and <Rare amount={1} />.
      </p>
      <p>
        I am still rocking that deck in Diamond 1 as of writing (June 2020),
        waiting for my collection to evolve so I can experiment with other
        things. It’s a strong deck that’s easy to make, and that’s what we are
        going to focus on today.
      </p>

      <Title id='the-deck'>The deck</Title>

      <p>
        Before we get into the gameplay and situations, let’s have a look at the
        deck itself. As I mentioned before, it is made of <Common amount={11} />
        , and <Rare amount={1} />. There might be a way to replace Green
        Prototypes with a common card for the sake of having a fully common
        deck, but that’s for another day.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id={DECK_ID}
              name='Meow'
              author='Kitty'
              tags={['HIGH_LEVELS']}
              faction='shadowfen'
            />
          </Row.Column>
          <Row.Column>
            <p>A few interesting points to note about that deck:</p>
            <ul>
              <li>
                <span className='Highlight'>It’s fast.</span> It has 0 structure
                and 9 units, including 4 runners. Its <em>cell-on-play</em> is
                1.08, which is particularly fast.
              </li>
              <li>
                <span className='Highlight'>It’s cheap.</span> The average mana
                cost is exactly 3, with 6 cards being playable as the first
                player (excluding Toxic Sacrifice), and 8 or 9 as the second.
              </li>
              <li>
                <span className='Highlight'>It’s simple.</span> With 4 runners
                of various costs, this deck has a single win condition: running
                through the baseline and knocking down the base health quickly
                and aggressively.
              </li>
            </ul>
          </Row.Column>
        </Row>
      </PageEmbed>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <p>
              Looking at the mana curve graph, we can see that the first few
              turns are pretty stable, which is a good quality of a deck. Turn
              mana 6 is the most risky one, with possibly (although not so
              likely) some 1 mana loss, 2 in the worst case scenario.
            </p>

            <p>
              Another interesting consideration is that by turn mana 5, it is
              already possible to play all 4 cards if we have to use Toxic
              Sacrifice. The likelihood of being able to play the full hand
              increases rapidly at every turn to pass the 50% threshold by turn
              mana 9 and 90% threshold at mana 12.
            </p>
          </Row.Column>
          <Row.Column>
            <Graph id={DECK_ID} />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='the-cards'>The cards</Title>

      <h3 id='cheap-drops'>Cheap Drops</h3>

      <p>
        This deck has 2 main facets: cheap drops and runners. The cheap drops
        are <CardLink id='N1' />, <CardLink id='N2' />, <CardLink id='N3' />,{' '}
        <CardLink id='F3' /> and to a lesser extent <CardLink id='N12' /> and{' '}
        <CardLink id='N16' />. That’s half the deck.
      </p>
      <p>
        Like in any deck, these cards serve two purposes: being able to defend
        by having cheap units with movement—and being able to push the frontline
        quickly and reliable in order to allow the runners to do their job.
        Which leads us to our next main point.
      </p>

      <h3 id='runners'>Runners</h3>

      <p>
        The reason this deck is so fast is because it has an unusually high
        amount of runners (4). Indeed, this is the bread and butter of this
        deck: we need to pass the runners through the baseline. That’s why it is
        good to have several of them, and of different costs.
      </p>

      <p>
        What is interesting about this configuration is that our runners all
        have a different mana cost (3, 4, 5 and 7), making it possible to use a
        runner at basically any mana turn in the game.
      </p>

      <p>
        Another quirk of the setup which we learn to turn into our advantage is
        the ability of First Mutineer not impacting other pirates. Fortunately,
        we run Westwind Sailors and Bluesail Raiders, both of which are immune
        to that discard penalty.
      </p>

      <Info icon='sword' title='Runner variations'>
        <p>
          If you happen to have <CardLink id='N67' /> at level 3 or more, it
          might be a good idea to replace Summon Militia with it. Not only does
          it grant another runner, but it also makes for a less random target
          for Toxic Sacrifice combos.
        </p>
        <p>
          On a similar note, <CardLink id='F25' /> is a better alternative to
          First Mutineer since it comes without any penalty, and varies races to
          avoid being subject to <CardLink id='N18' />
          ’s ability.
        </p>
      </Info>

      <h3 id='witches-of-the-wild'>Witches of the Wild</h3>

      <p>
        <CardLink id='F14' /> is such a versatile card that it has to take part
        in most Shadowfen decks, this one being no exception. At level 5, it can
        have up to 29 strength value for 4 mana in perfect conditions, and
        easily averages between 11 and 17 value. That’s too good to pass.
      </p>

      <h3 id='spells'>Spells</h3>

      <p>
        In this deck, spells are mainly here to tempo the game and counter
        aggressive push long enough to maintain the frontline or end the game.
        They are not really used offensively per se.
      </p>
      <p>
        <CardLink id='F4' /> is included because it provides excellent board
        control. Not only does it make it possible to counter early pushes, but
        it also can clear our own units if they are in the way of lethal.
      </p>
      <p>
        Originally, I ran a slight variation of this deck with{' '}
        <CardLink id='N5' /> instead of <CardLink id='N9' /> but it did not
        work. Northsea Dog ends up being cycled for most of the game and does
        not help defending whatsoever. Confinement is here to dramatically slow
        down a heavy push, and to counter Elders such as Hairy Chestnuts and
        Bucks of Wasteland.
      </p>

      <Title id='playstyle-and-strategies'>Playstyle and Strategies</Title>

      <h3 id='general-strategy'>General strategy</h3>

      <p>
        The main idea is to push fast early on and establish board dominance
        near the enemy’s baseline, or in the mid-field. From there, it’s a bit
        of an endurance game to keep control of the board for the next few turns
        while the mana increases.
      </p>
      <p>
        When the game reaches turn mana 10/11, we will start seeing a lot of
        opportunities for playing two runners in the same turn, or one runner +
        a move to keep board presence. Knowing the damage possibilities of
        combining 2 runners is therefore important{' '}
        <Only.Desktop>
          (the card level can be adjusted in the top left corner of the table)
        </Only.Desktop>
        :
      </p>

      <Only.Mobile>
        <ul>
          <li>First Mutineer + Warfront Runners: 7 mana for 11 damage</li>
          <li>First Mutineer + Bluesail Raiders: 8 mana for 12 damage</li>
          <li>Warfront Runners + Bluesail Raiders: 9 mana for 13 damage</li>
          <li>First Mutineer + Salty Outcasts: 10 mana for 15 damage</li>
          <li>Warfront Runners + Salty Outcasts: 11 mana for 16 damage</li>
          <li>Bluesail Raiders + Salty Outcasts: 12 mana for 17 damage</li>
        </ul>
      </Only.Mobile>

      <Only.Desktop>
        <PageEmbed>
          <Table>
            <thead>
              <tr>
                <th>
                  <Select
                    label='Level'
                    id='level'
                    className={css(styles.select)}
                    value={cardLevel}
                    onChange={event => setCardLevel(event.target.value)}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </Select>
                </th>
                <th className={css({ color: '#a28668' })}>First Mutineer</th>
                <th className={css({ color: '#66b8b0' })}>Warfront Runners</th>
                <th className={css({ color: '#cb2f29' })}>Bluesail Raiders</th>
                <th className={css({ color: '#98c941' })}>Salty Outcasts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={css({ color: '#a28668' })}>First Mutineer</th>
                <td>{combine('N12')}</td>
                <td>{combine('N12', 'N28')}</td>
                <td>{combine('N12', 'N30')}</td>
                <td>{combine('N12', 'N52')}</td>
              </tr>
              <tr>
                <th className={css({ color: '#66b8b0' })}>Warfront Runners</th>
                <td>{combine('N28', 'N12')}</td>
                <td>{combine('N28')}</td>
                <td>{combine('N28', 'N30')}</td>
                <td>{combine('N28', 'N52')}</td>
              </tr>
              <tr>
                <th className={css({ color: '#cb2f29' })}>Bluesail Raiders</th>
                <td>{combine('N30', 'N12')}</td>
                <td>{combine('N30', 'N28')}</td>
                <td>{combine('N30')}</td>
                <td>{combine('N30', 'N52')}</td>
              </tr>
              <tr>
                <th className={css({ color: '#98c941' })}>Salty Outcasts</th>
                <td>{combine('N52', 'N12')}</td>
                <td>{combine('N52', 'N28')}</td>
                <td>{combine('N52', 'N30')}</td>
                <td>{combine('N52')}</td>
              </tr>
            </tbody>
          </Table>
        </PageEmbed>
      </Only.Desktop>

      <p>
        Toxic Sacrifice should be used sporadically and with caution. Keeping
        the front line is usually more important than clearing the opponent’s
        baseline. Similarly, Confinement can be cycled a lot and used on Elders
        or to negate a heavy push (Operators, Potion of Growth…).
      </p>

      <h3 id='openings'>Openings</h3>

      <p>
        Thanks to the variety of cards costing 3 mana or less, there are
        actually quite a lot of different openings.
      </p>
      <p>
        The ideal opening is{' '}
        <span className='Highlight'>
          Green Prototypes into either Gifted Recruits or Dubious Hags
        </span>
        , giving 2 movements with 2 units for 3 mana. Another decent opening is
        Gifted Recruits or Dubious Hags into Summon Militia.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCwsLCwsLDZGM0I1LCw1TjFCNSwsLCwsLCw7UjIwUy1CMThGOzBNMDs1TjE1TjI1RjQ1RjM1TjM1Tjk1TjEyNU4xNjVOMjg1RjE0NU4zMDVONTI7TjksTjI4'
      />

      <p>
        With 4 units costing 4 or more mana and 2 spells targeting enemy units,
        it is important to note that, while unlikely, there is a possibility of
        having nothing to play on the first hand as a first player. In that
        case, I would recommend keeping Toxic Sacrifice (if in the hand) to be
        able to defend and retake board control a few turns later.
      </p>

      <p>
        In most scenarios, cycling Salty Outcasts, Bluesail Raiders, Confinement
        or Toxic Sacrifice (in that order of preference) is usually the way to
        go for the first hand. The idea is to optimize the chances to play 2 to
        3 cards a turn in the first few rounds of the game.
      </p>

      <p>
        When playing second and having the opportunity of playing Gifted
        recruits and Dubious Hags, I find preferable to play Dubious Hags the
        further away from our baseline as possible. What we don’t want is the
        hag from the on-death trigger to spawn on our baseline and reduce our
        opportunities.
      </p>

      <Info icon='stack' title='Drawing Guide'>
        <p>
          For more in-depth information about the drawing algorithms and cycling
          mechanics, be sure to read the{' '}
          <Link to='/guides/drawing'>guide on drawing</Link>.
        </p>
      </Info>

      <h3 id='against-winter'>Against Winter Pact</h3>

      <p>
        Most Winter decks tend to be quite heavy, and aim to take full control
        of the board by mid/late game, eventually pushing the frontline until
        they have lethal. The goal is to finish before they get to that point.
      </p>

      <p>
        It is critical to preserve high board presence at all cost. There is
        usually no coming back from a board clear past 8 mana against a Winter
        deck. We absolutely need to stay up front until turn mana 10/11 where we
        can start passing heavy runners in.
      </p>

      <p>
        When facing a Winter freeze deck, we might be facing difficulty moving
        our runners through their baseline because they keep freezing our cheap
        units there. This is one of the cases where using Toxic Sacrifice in an
        offensive way can pay off.
      </p>

      <p>
        Consider the following board where Gifted Recruits have been frozen by a
        Moment’s Peace onto the Frozen Core. By playing Toxic Sacrifice on the
        Gifted Recruits, we not only kill the Rockworkers, but also free the way
        for Salty Outcasts to run it.
      </p>

      <BattleSimEmbed
        environment='winter'
        id='NU4zQjVGLDE2VzlSNSwsLCwzVzEzUjUsLDhOMTNSNSwsLCwsLCwsLCwsLDtSMTBXLUIxOEY7OE0wOzVOMTVOMjVGNDVGMzVOMzVOOTVOMTI1TjE2NU4yODVGMTQ1TjMwNU41MjtGNCxONTIsTjI4LE4y'
      />

      <h3 id='against-swarm'>Against Swarm of the East</h3>

      <p>
        There are two archetypes of Swarm decks: early rush and control (which
        usually involves <CardLink id='S21' /> and/or <CardLink id='S28' />
        ). It is helpful to try to guess early which kind of deck we’re facing.
      </p>
      <p>
        When facing a rush deck, such as{' '}
        <Link to='/deck/3xn1n2s1n3s24s2n67s6n24n15s8s11/detail'>
          Reckless Rush
        </Link>
        , I would recommend defending. With 4 runners costing 3/4/5/7 mana, our
        deck is not a particularly early game rush and we have opportunities to
        come back during the mid-game. So defending to counter-attack around
        turn mana 10/11 has proven to be a decent approach.
      </p>

      <p>
        If the opponent starts the game with a <CardLink id='S8' /> and we
        happen to have a Toxic Sacrifice in our hand, it might be interesting
        not to cycle it to be able to clear the upcoming cheap drops (Green
        Prototypes, Gifted Recruits, Doppelbocks, Head Start…). Being able to
        reset the line of an early Swarm rush can make the difference between
        victory and defeat.
      </p>

      <p>
        When facing a control Queen of Herds deck however, things can get more
        tricky, especially when she is paired with a high-level Bucks of
        Wasteland. Against such decks, what’s important is maintaining the
        front-line at all cost. Confinement is kept especially for Bucks so that
        Toxic Sacrifice can be used without risking buffing the entire raid.
      </p>

      <h3 id='against-ironclad'>Against Ironclad Union</h3>

      <p>
        When facing an Ironclad deck, one has to be ready to be countered by{' '}
        <CardLink id='I20' />. The worst that can happen is our frontline being
        reset for only 4 mana because we set 2 units side-by-side on the
        opponent’s baseline. Therefore, it might be interesting to split the
        attack on both sides.
      </p>

      <p>
        This will not guarantee keeping the frontline, but this will increase
        the chances a little, especially if the opponent does not have a
        particularly cheap deck.
      </p>

      <BattleSimEmbed
        environment='ironclad'
        id='NU4zQjUsLCw2RjNCNSwsLCwsLCwsLCwsLCwsLCw7UjIwSS1CMThGOzVNMDs1TjE1TjI1RjQ1RjM1TjM1Tjk1TjEyNU4xNjVOMjg1RjE0NU4zMDVONTI7'
      />

      <p>
        When facing a structure deck, it’s important to go upfront and destroy
        or minimize the impact of towers. Seeing a <CardLink id='I2' /> or a
        cycled <CardLink id='I3' /> in the early turns is a good indicator that
        either a <CardLink id='I19' /> or an <CardLink id='I10' /> are coming,
        so it’s important to move fast to counter before the opponent starts
        steamrolling.
      </p>

      <h3 id='against-ironclad'>Against Tribes of the Shadowen</h3>

      <p>
        I personally find the Shadowfen mirror matches to be the most difficult.
        Shadowfen, as we know, has a lot of{' '}
        <abbr title='Area of Effect'>AoE</abbr> such as Toxic Sacrifice, Crimson
        Sentry or Witches of the Wild. As a result, it is relatively trivial to
        clear the line, making it sometimes difficult to come back.
      </p>

      <p>
        Be mindful of positioning. Toxic Sacrifice cannot really be avoided
        given it has a huge area of effect, but the risks of an overvalued
        Witches of the Wild can and should be controlled.
      </p>

      <p>
        In the following situation, Dubious Hags are better played on the
        opposite side rather than in the top left corner. Otherwise that would
        be a prime situation for Witches of the Wild, and could even be a full
        clear if the opponent has Toxic Sacrifice or Green Prototypes.
      </p>

      <p>
        Thanks to this placement, clearing both units become more difficult. It
        is still very possible of course, but with 5 mana, the options are
        limited. Even Toxic Sacrifice becomes more complex to exploit unless
        they have a static unit to put in the middle.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsNkYzQjUsLDVOM0I1LCwsLCwsLCwsLCwsLCw7UjIwRi1CMThGOzVNMDs1TjE1TjI1RjQ1RjM1TjM1Tjk1TjEyNU4xNjVOMjg1RjE0NU4zMDVONTI7'
      />

      <p>
        To wrap up, this deck is a solid rush deck which remains viable in
        mid-game. It has the particularity of being composed almost exclusively
        of common cards, making it the perfect deck to reach Diamond 1 as a
        free-to-play player. I hope you like it.{' '}
        <span role='img' aria-label='sparkly heart'>
          💖
        </span>
      </p>
    </>
  )
})
