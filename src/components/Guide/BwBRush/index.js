import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import DeckStatsChart from '~/components/DeckStatsChart'
import FeaturedDeck from '~/components/FeaturedDeck'
import Info from '~/components/Info'
import Link from '~/components/Link'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import serialization from '~/helpers/serialization'
import CardLink from '~/components/CardLink'
import getInitialCardData from '~/helpers/getInitialCardData'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function GuideBwBRush(props) {
  return (
    <>
      <p>
        Welcome to Stormbound! A place where every player can be a winner or a
        loser. A place where there are countless decks and playstyles, and this
        one is no exception. Today, I will teach you how to play with and
        against Blessed with Brawn Rush (BwB Rush).
      </p>

      <TableOfContents>
        <li>
          <Link href='#basics-and-features'>
            Basics and Features of the Deck
          </Link>
        </li>
        <li>
          <Link href='#deck-template'>Deck Template Analysis</Link>
        </li>
        <li>
          <Link href='#cards-in-hand'>Cards in Hand</Link>
        </li>
        <li>
          <Link href='#unit-placements'>Unit Placements on the Board</Link>
        </li>
        <li>
          <Link href='#against-every-faction'>Against Every Faction</Link>
        </li>
        <li>
          <Link href='#closing-remarks'>Closing Remarks</Link>
        </li>
      </TableOfContents>

      <Title id='basics-and-features'>Basics and Features of the Deck</Title>

      <p>
        One of the features of the BwB Rush is that it takes the enemy by
        surprise, as the last thing you expect is the BwB used on the unit in
        front of your base. The enemy will need more than 6 mana to somehow
        destroy the buffed unit if he does not have <CardLink id='N9' /> or{' '}
        <CardLink id='N58' />. Also, one of the features of this deck is its low
        average cost, which makes it easy to play 2-3 cards each turn and
        quickly cycle to the one you need. While it’s cheap, it’s not lacking in
        power like other similar-style decks.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <p>
              This deck can have a lot of variations, but there is a template
              for it. These 8 cards are the foundation for any BwB Rush deck and
              depending on your leveling of cards and the goals that you want to
              achieve from this deck, you finish the deck the way you want. I
              personally recommend 2 variations of this deck: Zhevana variant
              and Felflares variant.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1w1n2w2n3n4w7w14'
              name='BwB Rush Template'
              author='Pepegak'
              tags={['HIGH_LEVELS', 'RUSH']}
              staticLevels
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Info icon='info' title='Disclaimer'>
        Due to some cards in the deck, it is desirable to have the level of all
        cards 3 or higher, but no one forbids you to play with the deck and
        modify it the way you want.
      </Info>

      <PageEmbed>
        <h3 id='zhevana-variant' align='center'>
          Zhevana Variant
        </h3>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='5xn1w1n2w2n3n4n12n16w7w8n27w14'
              name='Brawn Zhevana Variant'
              author='Pepegak'
              tags={['HIGH_LEVELS', 'RUSH']}
              staticLevels
            />
          </Row.Column>
          <Row.Column>
            <DeckStatsChart
              deck={serialization.deck
                .deserialize('5xn1w1n2w2n3n4n12n16w7w8n27w14')
                .map(getResolvedCardData)}
              modifier='NONE'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>
        Classic and main deck variation for me, suitable for those with{' '}
        <CardLink id='W8' />. Best played in Platinum, Diamond, and Hero
        leagues. This variation is distinguished by the presence of Zhevana and{' '}
        <CardLink id='N16' />. Aggressive, fast, and powerful deck capable of
        reaching the enemy base quickly. In this deck, the main combinations are{' '}
        <CardLink id='W1' /> / <CardLink id='W2' /> + <CardLink id='W8' /> +{' '}
        <CardLink id='W7' /> (when you have 5-6 mana, which is very good).
        Zhevana is very suitable for destroying weak units almost for free and
        at the same time being an excellent unit for triggering Mystwives
        ability in case you have insufficiently strong units or they are not at
        all for some reason.
      </p>

      <PageEmbed>
        <h3 align='center'>Felflares Variant</h3>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='5xn1w1n2w2n3n4n11n12n21w7n27w14'
              name='Brawn Felflares Variant'
              author='Pepegak'
              tags={['HIGH_LEVELS', 'RUSH']}
              staticLevels
            />
          </Row.Column>
          <Row.Column>
            <DeckStatsChart
              deck={serialization.deck
                .deserialize('5xn1w1n2w2n3n4n11n12n21w7n27w14')
                .map(getResolvedCardData)}
              modifier='NONE'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>
        Even less, but still the same aggressive deck, suitable for players
        without legendary cards. Best played in Platinum and Diamond 5-4
        Leagues. This variation is not as aggressive as the first, but rather
        relies on the destruction of units and the subsequent combination of{' '}
        <CardLink id='N1' /> + <CardLink id='W14' />. Here, more emphasis is
        placed on clearing the board from enemy units and buildings, because
        there are <CardLink id='N21' /> and <CardLink id='N11' /> cards that do
        this task quite well. In other cases, this is still the same deck,
        capable of quickly reaching the enemy’s base and dealing with it if the
        enemy does not have suitable cards.
      </p>

      <Title id='deck-template'>Deck Template Analysis</Title>

      <p>
        This, like every other deck, should have the main cards that you will
        rely on when playing. I’ll tell you everything about them now:
      </p>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('W14')} />
      </PageEmbed>

      <h3>
        <CardLink id='W14' />
      </h3>
      <p>
        It’s worth starting with this one, because this card is one of the main
        cards for winning this deck. The name of this card is even in the name
        of the playstyle. A 6 mana spell that grants incredible amounts of
        strength to weak units like <CardLink id='N1' /> or <CardLink id='N4' />
        . This card helps the opponent’s attack to choke, because they will need
        to defend themselves 100% from the unit, which can almost completely
        destroy the base. It is also a versatile card that suits any situation
        and card. You can use it for defense, then use it in a counter-attack
        and force the opponent to surrender. However, it must be used wisely,
        because the opponent can use this card against you. The most dangerous
        cards against this are <CardLink id='N9' />, <CardLink id='N58' />, and
        any other unit with similar strength. Simply put, in the right hands, it
        can work wonders.
      </p>

      <h3>
        <CardLink id='N1' />
      </h3>
      <p>
        It is the only 1 mana unit with movement that exists in the game. This
        card is great for moving frontline so you can deploy more units closer
        to the enemy base. It is also one of the main cards for the{' '}
        <CardLink id='W14' /> combo. Also, at higher levels, it is able to
        activate the <CardLink id='W7' /> ability, which can cause difficulties
        for the opponent.
      </p>

      <h3>
        <CardLink id='N2' />
      </h3>
      <p>
        One of two spell cards costing 1 mana. It is not a very important card,
        but like <CardLink id='N1' />, it is capable of activating{' '}
        <CardLink id='W7' /> and if the knights spawn is successful, be a target
        for <CardLink id='W14' />. However, if you have the opportunity to play
        this or some other card, then it is better to play another card, because
        this card will not be the best choice due to the RNG (very random card
        since knights may spawn right in front of your base or on the farthest
        tile). However, if you have no choice, then you can play this spell.
      </p>

      <h3>
        <CardLink id='W1' />
      </h3>
      <p>
        A second spell that costs 1 mana. This card is a real treasure, because
        it can be used almost anytime possible: in combination with{' '}
        <CardLink id='W8' />, in combination with <CardLink id='W2' />, to stop
        the opponent’s attack, in combination with <CardLink id='W14' />{' '}
        (situations where you can use such a combination are rare, but they can
        happen anyway). This card costs very little, has absurd damage and can
        be used in attack, counter-attack, and in defense too. The perfect piece
        to complement the deck perfectly.
      </p>

      <h3>
        <CardLink id='W2' />
      </h3>
      <p>
        Another treasure of the Winter Pact. Excellent assistants in attack and
        defense. Due to its low cost, it can be played very often. Such
        combinations include other units and spells like <CardLink id='W8' />,{' '}
        <CardLink id='W1' />, <CardLink id='W7' />, and <CardLink id='W14' />{' '}
        (the last one can be used on it, but not desirable).{' '}
        <CardLink id='W2' /> can block enemy units from attacking stronger units
        in the vicinity and even use enemy units against the opponent.
      </p>

      <h3>
        <CardLink id='N3' />
      </h3>
      <p>
        A card that can be seen practically in any deck, not excluding this one.
        It is the basis of all attacks and the main attacking card. It’s cheap
        and can be used to defend as a last resort .
      </p>

      <h3>
        <CardLink id='N4' /> / <CardLink id='W31' />
      </h3>
      <p>
        Linking units for other cards and combinations. These cards have a large
        amount of strength (6 and 7, respectively), but both have one drawback:
        lack of movement, which means that they will go on the attack only after
        1-2 turns. However, this minus can be turned into a plus, putting them
        up as a shield for attacking cards, which will force the opponent to
        spend a lot more than 2 mana to deal with them. I also added{' '}
        <CardLink id='W31' /> to this point, because it is very similar (almost
        the same strength, used for the same purposes), however Iceflakes have
        their disadvantage, which is that it cannot move for 2 turns. On the
        other hand, unlike <CardLink id='N4' />, it can be “fed” to{' '}
        <CardLink id='W8' />, and in combination with <CardLink id='W1' /> you
        can get 1 additional mana, which is not always useful. Also, this card
        is suitable to mock the opponent a little (Iceflakes + Icicle Burst on
        them). But in ranked matches, it is better not to do this. Spend this
        mana on smarter targets and use them for reaching better goals.
      </p>

      <h3>
        <CardLink id='W7' />
      </h3>
      <p>
        The second card is used to defeat the opponent in the game. This is not
        a card worth playing alone. This card simply requires to be played with
        strong units on bordering tiles, because all its strength is in its
        ability. Everything must be done to trigger this ability as often as
        possible. It is one of the main attacking units for a small cost, which
        forces the opponent to spend precious spells and units on them, which
        will have a deadly impact on them in the future.
      </p>

      <h3>
        <CardLink id='N11' />
      </h3>
      <p>
        One of the additional cards for the deck, needed for defense and
        counter-attacks. Unfortunately, this card is lacking in strength and is
        not capable of causing significant damage to the enemy base. The sole
        purpose of these frostlings is to damage enemy units and clear the tile
        of enemy structures and then occupy these tiles with your other units.
        Not the best, but not the worst choice for BwB Rush either.
      </p>

      <h3>
        <CardLink id='N12' />
      </h3>
      <p>
        A pirate with 2 speed is also one of the additional cards that is
        desirable to add to the deck, because it can be one of the win
        conditions. However, the drawback is its ability to discard a random
        non-pirate card from your hand, which can often play a trick on you.
        This card must be used very carefully, because from a winning situation,
        you can instantly go into a draw or even a losing situation. However,
        you can use the card for even faster iterations of the deck cycle and
        draw the main cards more often. I can say that it was a card which saved
        me in many situations. Like <CardLink id='W14' />, it can work wonders
        in the right moments.
      </p>

      <h3>
        <CardLink id='N27' /> / <CardLink id='N28' />
      </h3>
      <p>
        An additional card with 2 speeds, and is the another win condition.
        They, like <CardLink id='N12' />, have saved me so many times, but they
        are not at all necessary here. Due to their small amount of strength,
        they are unable to challenge most enemies, and even more so against
        large units like <CardLink id='N32' />. But they are not needed for such
        purposes, because their only task is to damage the enemy base. I
        combined these 2 cards into one subgroup, since they have exactly the
        same strength, but <CardLink id='N27' /> can do huge damage to enemy
        dragons, which can sometimes help you.
      </p>

      <h3>
        <CardLink id='N16' />
      </h3>
      <p>
        Another not quite necessary pirate in the deck. Due to the low strength
        to cost ratio, it can be replaced with <CardLink id='W5' />, but only if
        you are not afraid of losing a unit of any strength, even if it has more
        than 20 strength. But if you’ve added it to your deck, then it’s best to
        use it in the same way as <CardLink id='N3' />, the very case when you
        need an additional unit to move and save your frontline.
      </p>

      <h3>
        <CardLink id='N24' /> / <CardLink id='N15' />
      </h3>
      <p>
        Pure support for the units in the deck. If you have a low level of
        cards, or you do not have enough of the strength that you already have,
        then you can add them to your deck to strengthen all your units. They
        will be in your deck only so that your cards live on the board even
        longer. Examples of using these cards include: <CardLink id='N1' /> /{' '}
        <CardLink id='N2' /> + <CardLink id='N24' /> / <CardLink id='N15' /> or{' '}
        <CardLink id='N3' /> / <CardLink id='W12' /> + <CardLink id='N24' /> /{' '}
        <CardLink id='N15' />. Unlike Personal Servers, Potion of Growth can
        also cancel poisoning from a unit and prevent the opponent from using{' '}
        <CardLink id='F15' /> / <CardLink id='F11' />, if he has them, of
        course.
      </p>

      <h3>
        <CardLink id='W5' />
      </h3>
      <p>
        A 3 mana card similar to <CardLink id='N16' /> can be a nice addition to
        your deck. Having 4 strength at the first level, it can be used together
        with <CardLink id='W7' /> as a very dangerous bundle, especially near
        the base. But it is worth remembering that Weavers pay for such big
        strength with its ability - it destroys a random non-dragon friendly
        unit, which can play into the hands of the opponent. After all, if they
        can make Weavers destroy your combination of <CardLink id='N1' /> +{' '}
        <CardLink id='W14' />, then you will have big problems. Use this card
        only at your own risk.
      </p>

      <h3>
        <CardLink id='W12' />
      </h3>
      <p>
        A good card that can complement this deck with another medium strength
        card. Its practical cost is 2 mana, which creates a good strength to
        cost ratio, but this card has one drawback: it costs 5 mana, which means
        that unlike <CardLink id='N16' />, it cannot be played in the first 1/2
        turns. However, if you are willing to wait 2 turns, then you can safely
        add them to your deck instead of Westwind Sailors. Another small
        drawback is that you must be aware of your card order during your turn
        to ensure that you have enough mana to play this card.
      </p>

      <Title id='cards-in-hand'>Cards in Hand</Title>

      <p>
        I will explain this section based on the main variant:{' '}
        <Link to='#zhevana-variant'>Zhevana Variant</Link>.
      </p>

      <p>
        Due to the large number of cheap cards in the deck, 1-3 cards can be
        played each turn, which must be kept in mind. There are several opening
        combinations in a match on your first or opponent’s first move. Let’s
        take a look at the best ones:
      </p>

      <ol>
        <li>
          <CardLink id='N1' /> + <CardLink id='N3' />
        </li>
        <li>
          <CardLink id='N1' /> / <CardLink id='N3' /> + <CardLink id='N2' />
        </li>
        <li>
          <CardLink id='N16' />
        </li>
        <li>
          <CardLink id='N12' />
        </li>
        <li>
          <CardLink id='N3' />
        </li>
      </ol>

      <p>
        Here are some opening combinations if the opponent got the first move:
      </p>

      <ol>
        <li>
          <CardLink id='N16' /> + <CardLink id='N2' />
        </li>
        <li>
          <CardLink id='N3' /> + <CardLink id='N4' /> / <CardLink id='W2' />
        </li>
        <li>
          <CardLink id='N12' /> + <CardLink id='N2' />
        </li>
      </ol>

      <p>
        If you have any 4+ mana runners in your hand at the start of the game
        (depending on the cards you put in the deck), <CardLink id='W8' />{' '}
        without freeze cards, or <CardLink id='W14' />, then you should discard
        them from your hand. However, if you have 2 extra cards in your hand at
        once, then first of all, you need to throw out a spell or a more
        expensive runner, and only then, the rest of the cards.{' '}
        <CardLink id='W14' /> &gt; 4+ mana cost runner &gt; <CardLink id='W8' />{' '}
        without freeze cards - those cards should be discarded in that priority,
        from left to right. This is due to the fact that as the game progresses,
        you will receive those cards that you initially discarded from your hand
        earlier, and that is why it is advisable to discard Blessed with Brawn
        first, so that it can be used right away.
      </p>

      <p>
        Also, for faster card iterations, you can use <CardLink id='N12' />.
        After all, the faster you play a card, the sooner you get it and the
        faster you can play it again. When you have 6 or more mana, it is best
        to use the following discard sequence: <CardLink id='N4' /> /{' '}
        <CardLink id='W31' /> (without <CardLink id='W7' />) &gt; runner &gt;{' '}
        <CardLink id='W7' /> &gt; <CardLink id='W14' />. Blessed with Brawn can
        be discarded from your hand if you have 7 or more mana only if you are
        absolutely sure that you can win without this card such as successfully
        drawing a runner card and using it to destroy the base. However, the
        main thing is that with 10 mana in hand, you have either BwB or 2
        runners as win conditions.
      </p>

      <Title id='unit-placements'>Unit Placements on the Board</Title>

      <p>
        It’s one thing to have the right cards, and it’s another to place them
        correctly. To win, you need to place the cards in the correct order from
        start to finish. Placement is key to victory. Now I will show several
        examples of playing opening combinations:
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwsLCwsLCwsNU4zQjUsLCwsLCw1TjFCNSwsLCw7UjEwTi1CMTBXOzNNMDs1TjE1VzE1TjIxVzI1TjM1TjQ1TjEyNU4xNjVXNzVXODVOMjc1VzE0Ow'
      >
        Example 1: Green Prototypes + Gifted Recruits. Be sure to play Green
        Prototypes first.
      </BattleSimEmbed>

      <BattleSimEmbed
        environment='winter'
        id='LCwsLCwsNU4xUjUsLCwsLCwsNk40QjUsLDVOM0I1LCwsLDtSMTBOLUIxMFc7NE0wOzV4TjFXMU4yVzJOM040TjEyTjE2VzdXOE4yN1cxNDs'
      >
        Example 2: Gifted Recruits + Lawless Herd. Be sure not to put them next
        to each other.
      </BattleSimEmbed>

      <p>
        In these positions, the main thing is not to place units next to each
        other, so that there is more space for <CardLink id='W7' /> to play:
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwsLCwsLCwsLDZONEI1LDVOMUI1LCwsLCwsLCw7UjEwTi1CMTBXOzRNMTs1eE4xVzFOMlcyTjNONE4xMk4xNlc3VzhOMjdXMTQ7Vzc'
      >
        Example 3: The only convenient tile for Mystwives is the tile on the
        left, adjacent to Lawless Herd (B3).
      </BattleSimEmbed>

      <BattleSimEmbed
        environment='winter'
        id='LCwsLCwsLCwsNk40QjUsLDVOMUI1LCwsLCwsLCw7UjEwTi1CMTBXOzRNMTs1eE4xVzFOMlcyTjNONE4xMk4xNlc3VzhOMjdXMTQ7Vzc'
      >
        Example 4: There are 2 tiles where you can play Mystwives (A3 and C3),
        which makes your position more flexible to attack than the first
        position.
      </BattleSimEmbed>

      <p>
        When you have already placed your units on the board after the opponent
        and you have <CardLink id='W7' /> in hand, then you can use Mystwives
        for 2 types of attacks: the first, more aggressive, aimed at the enemy
        base; the second, more positional, aimed at getting more units and for{' '}
        <CardLink id='W14' /> combinations:
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwsLCw1TjNCNSwsNkkxUjUsLCwsNU4xQjUsLCwsLCwsLDtSMTBJLUIxMFc7NE0xOzV4TjFXMU4yVzJOM040TjEyTjE2VzdXOE4yN1cxNDtXNw'
      >
        Example 5: There are 2 potential Mystwives plays that have different
        impacts explained below.
      </BattleSimEmbed>

      <p>
        If you want a more aggressive attack, then play <CardLink id='W7' /> to
        the left of <CardLink id='N3' />, on tile A4. Even if there is a
        structure on A5, it is alright to play Mystwives since they will have
        enough strength to destroy that structure.
      </p>

      <p>
        If you want a more positional attack, then play <CardLink id='W7' /> to
        the right of <CardLink id='N3' /> to destroy the unit in front of{' '}
        <CardLink id='N1' />, on tile C4. This position is a little more
        difficult than the first but in the next turns, you can get a more
        stable position for <CardLink id='W14' />.
      </p>

      <p>
        The aggressive attack has its plus: if the opponent uses{' '}
        <CardLink id='N9' /> on <CardLink id='W7' />, then you can freely use{' '}
        <CardLink id='W14' /> without fear of the opponent using Confinement
        again and vice versa. And the more positional variation also has its own
        plus: you get a flexible position and good control over the board.
      </p>

      <p>
        It is also possible in such a position where the Gifted Recruits, or any
        other unit, does not defend the Mystwives from the attacks. This is a
        bait for spells and units from the opponent. The opponent will most
        likely spend units or even spells to destroy Mystwives, while not
        destroying Gifted Recruits:
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwxMVc3QjUsLCw1TjNCNSwsLCwsLCwsLCwsLCwsO1IxME4tQjEwVzs3TTE7NXhOMVcxTjJXMk4zTjROMTJOMTZXN1c4TjI3VzE0O04xLFcxNA'
      >
        Example 6: Unlike the aggressive variation, Mystwives are played on C4,
        not A4, which is a trap for the opponent.
      </BattleSimEmbed>

      <p>
        It is also possible and necessary to play several cards on the 4th row
        and 1-2 units on the 5th row, as another trap for the opponent. It is
        also very important to have <CardLink id='W14' /> in hand during these
        plays:
      </p>

      <BattleSimEmbed
        environment='winter'
        id='Nk4xNkI1LCwsLCw1VzJCNSwsLCwsLDhXOEI1LCwsLCwsLCw7UjEwTi1CMTBXOzhNMTs1eE4xVzFOMlcyTjNONE4xMk4xNlc3VzhOMjdXMTQ7VzE0LE40'
      >
        Example 7: Here, you need to play Lawless Herd on C4 or D4. Once the
        enemy spends his main units and spells on Westwind Sailors and
        Frosthexers, you play Blessed with Brawn on the previously placed
        Lawless Herd next turn.
      </BattleSimEmbed>

      <p>
        <CardLink id='W1' /> and <CardLink id='W2' /> are useful freeze cards in
        this deck that can be used in many situations. Here is one example of
        its use for a very aggressive attack (yes, this situation is very
        possible, I personally experience them):
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwzUzFSNSw1TjFCNSw4VzhCNSwsM1Q3UjEsLCwsLCwsLCwsLCwsO1IxMFMtQjEwVzs4TTE7NXhOMVcxTjJXMk4zTjROMTJOMTZXN1c4TjI3VzE0O1cxLFcyLFcxNA'
      >
        Example 8: You can use Frosthexers or Icicle Burst to freeze Token Satyr
        on C4 followed by Blessed with Brawn on Green Prototypes. This attack
        can only be neutralized with Confinement, which makes the attack
        incredibly dangerous.
      </BattleSimEmbed>

      <Title id='against-every-faction'>Against Every Faction</Title>

      <p>
        Each faction has its own features and advantages in playing against BwB
        Rush. I will now explain how to defeat the player of each faction.
      </p>

      <h3>Swarm of the East</h3>
      <p>
        The first faction, Swarm of the East, isn’t a big deal for BwB Rush. The
        only things that can somehow interfere with the game are Swarm Rush /{' '}
        <Link to='/guides/reckless-rush'>Reckless Rush</Link> and{' '}
        <CardLink id='S15' />. Rush decks are dangerous in that opponents can
        defeat you simply by rushing you faster. The solution to this is
        performing faster attacks or using some cards to defend and then
        counter-attack. Dark Harvest can also be dangerous, especially in the
        early stages of the game, because it can quickly interrupt your attack
        and there will be no units left for <CardLink id='W14' /> and{' '}
        <CardLink id='W7' />. The solution is to eliminate enemy units that are
        close to your main attacking units.
      </p>

      <BattleSimEmbed
        environment='swarm'
        id='LDRUN1IxLDZTMTZSNSw0VDdSMSwsLCw1TjFCNSwsLCwsLCwsLCwsLDtSMTBTLUIxMFc7OE0xOzV4TjFXMU4yVzJOM040TjEyTjE2VzdXOE4yN1cxNDtXMSxXOCxXNyxONA'
      >
        Swarm of the East Matchup: Destroy Dreadfauns before your opponent plays
        Dark Harvest
      </BattleSimEmbed>

      <h3>Ironclad Union</h3>
      <p>
        Ironclad Union poses a big threat to BwB Rush due to some of the cards
        and mechanics of this faction, namely push/pull (<CardLink id='I20' />,{' '}
        <CardLink id='I18' />, <CardLink id='I17' />
        ), <CardLink id='I2' /> + <CardLink id='N34' />, and IC Rush. Push/pull
        is very unpleasant for this deck, as it can push your troops far back,
        such as Flaming Stream can pushing a buffed unit back to your base. But
        alas, there are no reliable preventative measures against these cards
        and mechanics. The only thing that can be done against Eloth the Ignited
        and Windmakers is not to allow them to push off strong units, and
        against Flaming Stream, have spare cards for your attack. Doctor Mia can
        also be a thorn in BwB Rush due to the fact that she is usually used in
        combination with Trueshot Post, which can do a lot of damage to your
        troops. The solutions to this problem are to have <CardLink id='N25' />{' '}
        and / or <CardLink id='N21' /> in your deck and put other units in one
        row with attacking cards to somehow distract Trueshot Post. Ironclad
        Rush creates all the same problems as Swarm Rush /{' '}
        <Link to='/guides/reckless-rush'>Reckless Rush</Link>. I have already
        described how to deal with this above.
      </p>

      <BattleSimEmbed
        environment='ironclad'
        id='LCwxMVc3QjUsOE4zNFI1LCwsLDVOM0I1LCwsLCwsLCwsLCwsO1IxMEktQjEwVzs4TTE7NXhOMVcxTjJXMk4zTjROMTJOMTZXN1c4TjI3VzE0O04x'
      >
        Ironclad Union Matchup: Play Green Prototypes on A4 tile to try to
        distract Trueshot Post from Mystwives.
      </BattleSimEmbed>

      <h3>Tribes of Shadowfen</h3>
      <p>
        Shadowfen poses the greatest threat to BwB Rush due to the large number
        of control cards (<CardLink id='F4' />, <CardLink id='F5' />,{' '}
        <CardLink id='F14' />, <CardLink id='F12' />
        ). The opponent will likely have one or more of these cards, which
        definitely makes the game harder against Shadowfen. The solution to this
        is to encircle the main attacking cards with your troops and actively
        use runners to destroy the enemy base as quickly as possible.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LDVOM0I1UCwxMVc3QjUsOEYxM1I1LCwsNk40QjVQLDVOMUI1LDhGNlI1LCwsNVQzQjFQLCwsLCwsLCw7UjEwRi1CMTBXOzhNMTs1eE4xVzFOMlcyTjNONE4xMk4xNlc3VzhOMjdXMTQ7'
      >
        Tribes of Shadowfen Matchup: Do not let the opponent destroy your
        Mystwives by blocking.
      </BattleSimEmbed>

      <h3>Winter Pact</h3>
      <p>
        The last faction you can face. This faction can be a big problem for BwB
        Rush due to the likely presence of <CardLink id='W23' />,{' '}
        <CardLink id='W7' />, <CardLink id='W2' /> / <CardLink id='W1' />, and{' '}
        <CardLink id='W8' /> in winter decks. While Olf is healing the base, the
        freeze mechanic will stop your attack for a while or even completely
        destroy it. There are no solutions to this problem, only if you can try
        to destroy the enemy base as soon as possible, before his Olf heals all
        the damage done to the base.
      </p>

      <BattleSimEmbed
        environment='winter'
        id='LCwsMjNOMUI1LCwsNk4xNkI1LCwsLCwsLCwsLCwsLDtSMTBXLUIxMFc7OE0xOzV4TjFXMU4yVzJOM040TjEyTjE2VzdXOE4yN1cxNDtOMTIsTjI3'
      >
        Winter Pact Matchup: Destroy the enemy base while the opponent has less
        than 8 mana, otherwise difficulties and problems may arise.
      </BattleSimEmbed>

      <Title id='closing-remarks'>Closing Remarks</Title>

      <p>
        Now that you already know what BwB Rush is and its weaknesses, I wish
        you luck in games with and against BwB Rush! Also, this guide will be
        rewritten a few more times as I learn something new about positions and
        will add more accurate advice and better tactics.
      </p>
    </>
  )
})
