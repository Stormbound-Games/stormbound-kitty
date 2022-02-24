import React from 'react'
import { TIER_COLORS } from '~/constants/list'
import getInitialListData from '~/helpers/getInitialListData'
import Info from '~/components/Info'
import BrawlGuideDisclaimer from '~/components/BrawlGuideDisclaimer'
import Link from '~/components/Link'
import ListBuilderTier from '~/components/ListBuilderTier'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'

const TIER_LIST =
  'S - Always Usable,N8N59N69N46S19F21;A - Usable in Most%2FSome Decks,N58I2I17I22W8W23F12;B - Usable in Very Few Decks,N35N48S21W10F23;C - Never Use,N77N76S3I29/display'

export default React.memo(function GuideLegendaries(props) {
  const tiers = getInitialListData(TIER_LIST)

  return (
    <>
      <p>
        Legendaries are shiny, very rare, and may often look good at first
        sight. Most new players tend to automatically include their new
        legendary cards in their deck. Sadly, some of them have better, similar,
        or less rare substitutes at low levels. But some will definitely strike
        fear in the battlefield.
      </p>

      <p>This guide aims to give a definite answer to the question:</p>

      <BrawlGuideDisclaimer>
        Should I use this level 1 legendary?
      </BrawlGuideDisclaimer>

      <Info icon='info' title='About Equals Meta'>
        <p>
          This guide focuses on the scope of low level Ranked. This guide is{' '}
          <span className='Highlight'>not</span> an accurate representation of
          the Equals meta. For more information, please visit the{' '}
          <Link to='/guides/equals-intro'>Intro to Equals</Link> guide as well
          as the <Link to='/list/equals'>Equals Tier List</Link>.
        </p>
      </Info>

      <Title>Tier List</Title>
      {tiers.map((tier, index) => (
        <ListBuilderTier
          {...tier}
          color={TIER_COLORS[index]}
          key={tier.name || index}
          prefix={`tier-${index}-`}
          isEditable={false}
        />
      ))}

      <Title>S-Tier</Title>

      <h3>
        <CardLink id='N8' />: S
      </h3>
      <p>
        One of the most value-generating cards in the game, especially at level
        1 in comparison to other cards. 5 strength tokens are quite substantial
        and can definitely help battle higher level opponents. The tokens having
        movement as well adds to their many flexibilities such as attacking and
        defending. You may find cases where Mirz clogs your deck with too many
        tokens so just be sure not to use him too many times but this is not
        necessarily a big problem in the lower levels. Mirz also receives a
        massive power spike at level 2 so he is worth investing in. Mirz is
        probably the best turn 1 card when starting at 3 mana. Usable on all
        levels and ranks.
      </p>

      <h3>
        <CardLink id='N59' />: S
      </h3>
      <p>
        Edrik is powerful during both early and late game. He can sometimes
        single-handedly defend against a rush deck while maintaining precious
        frontline. With only 1 token, he already generates the same amount of
        value as <CardLink id='F12' />, yet getting at least 2 tokens is
        relatively easy, especially when baiting enemy placement using your own
        positioning. Playing this card against any deck that’s trying to win as
        fast as possible is going to drastically increase your chances of
        winning.
      </p>

      <h3>
        <CardLink id='N69' />: S
      </h3>
      <p>
        Laurus is one of the most efficient control cards in the game,
        especially for its cost. No low-medium strength enemy bordering units
        are safe. Baiting enemy units will also increase your chances of good
        trades considerably. There are almost no better cards to defend your
        baseline and he deals with <CardLink id='S19' /> decks effectively. He
        is one of the most versatile cards in the game, considering the fact
        that he can be used offensively as well. A 5 strength unit on the
        opponent’s baseline provides decent pressure. Laurus fits in every deck
        without fail.
      </p>

      <h3>
        <CardLink id='N46' />: S
      </h3>
      <p>
        Finishers are essential in every deck. Tegor is a powerful heavy
        finisher while carrying high value effects. Despite his abilities being
        random, their raw value makes him very much worth the mana cost. You can
        push this further when you play him after clearing all enemy units. This
        guarantees that you get either the spawn or buff effect. The buff effect
        is incredibly powerful and should be exploited whenever possible.
        Tegor’s dragon type also synergizes with dragon decks, especially from
        his own spawns. Tegor is the perfect option for decks that need
        finishers.
      </p>

      <h3>
        <CardLink id='S19' />: S
      </h3>
      <p>
        Xuri synergizes perfectly with Swarm’s natural unit spam. Cards like{' '}
        <CardLink id='S1' /> and other cheap cards are essential for every Xuri
        deck. His buffs over friendly units can easily outvalue your opponent
        and it is not hard to pull off early on. Additionally, vitality is very
        powerful in the lower ranks since +1 strength per turn is a large
        percentage increase compared to higher ranks. Like other dragon cards,
        Xuri can also synergize in dragon decks that use cards like{' '}
        <CardLink id='N6' /> and <CardLink id='S4' /> due to the powerful
        frontline of their abilities. Xuri is definitely worth trying out and
        can exceed in any Swarm deck.
      </p>

      <h3>
        <CardLink id='F21' />: S
      </h3>
      <p>
        Qordia is arguably the best legendary dragon. Her egg spawns allow her
        to apply serious pressure early game while also being able to generate
        crazy value in long games. Not all of her eggs need to survive either to
        find success. The eggs force the opponent to make uncomfortable plays,
        which is always a good thing for you. Even if all the eggs were
        destroyed or you managed to hatch only one, you still utilized 8
        strength for 6 mana. That is more than cards like <CardLink id='I21' />!
        Qordia’s sturdy 5 strength body also serves as a powerful tool for
        clearing enemies. Lastly, her synergies with dragon cards are
        phenomenal, especially with <CardLink id='N51' />. If you were lucky
        enough to pull Qordia from a book, you should definitely add her into
        your decks!
      </p>

      <Title>A-Tier</Title>

      <h3>
        <CardLink id='N58' />: A
      </h3>
      <p>
        Siren is used for two reasons: some enemy units need to be taken down,
        especially large ones, and to rush the enemy base from afar. Until
        higher levels, her ability, similar to that of <CardLink id='N9' />, is
        a little weak as it can only trigger two times out of the 3 movement
        (since she usually does not survive before reaching the 3rd tile), so
        use her as a long range heavy runner that penetrates any unit. Luckily,
        Siren gets a big power spike at level 2 since you can guarantee three
        triggers of her ability so don’t be afraid to invest in her, especially
        since she is one of the most powerful cards in the game when maxed.
        Otherwise, you may want to spend that hefty 9 mana elsewhere.
      </p>

      <h3>
        <CardLink id='I2' />: A
      </h3>
      <p>
        There is no other card that resembles her abilities and potential value
        generation. She is very good even at level 1 when built with the proper
        decks. Be careful of inserting too many structures in a level 1 Mia deck
        and you must learn how to properly setup your structures using bordering
        tiles and trigger orders (visit the{' '}
        <Link to='/guides/triggers'>Triggers Guide</Link>). With a massive power
        spike at level 2, it is worth investing in Mia for a couple more copies
        that will easily elevate her to S tier later down the road. And let’s
        not forget the insane power spike at level 4 that makes level 5
        completely unnecessary to reach her full potential as a powerful
        Ironclad legendary.
      </p>

      <h3>
        <CardLink id='I17' />: A
      </h3>
      <p>
        Eloth can provide a wide variety of valuable utility. These include
        instant frontline with flight for runners and other pressure cards as
        well as delaying large/high-threat enemy units. At level 1, he can hold
        his own against opponents with slightly higher levels. Unfortunately, he
        cannot defend horizontally at all so reserve some card slots for more
        dire defense. But with the relatively new change to Eloth’s ability
        which allows him to move forward after destroying a unit, he can still
        help clear from your baseline.
      </p>

      <h3>
        <CardLink id='I22' />: A
      </h3>
      <p>
        Phoenix has the potential to generate unlimited value as well as
        exponential snowballing when multiple are deployed on the board. His
        robust strength allows him to clear many units as well as become a
        nuisance for your opponent to deal with as he marches down the board
        while conserving frontline. Additionally, his movement can easily
        guarantee at least one respawn for good value. Most of all, being a
        construct, Phoenix is a reliable way to pull off perpetual construct
        synergies with his undying presence. Naturally, this relatively
        expensive card will require attentive decision making. And lastly,
        beware of <CardLink id='N38' /> and level 2+ <CardLink id='N63' />
        ...
      </p>

      <h3>
        <CardLink id='W8' />: A
      </h3>
      <p>
        Zhevana is hard-carried by <CardLink id='W1' />. When played together,
        an enemy unit is destroyed while placing a decent body on the board.
        Zhevana allows many free 4 mana combos such as <CardLink id='W7' /> and{' '}
        <CardLink id='N59' />. This ice dragon also drastically speeds up your
        deck cycle to allow you to play your value cards more often than usual
        (e.g. <CardLink id='N8' /> tokens and other mana gain cards). There is a
        small learning curve when figuring out how to reliably align/cycle your
        freeze cards for Zhevana but it is definitely worth the reward.
      </p>

      <h3>
        <CardLink id='W23' />: A
      </h3>
      <p>
        Olf’s powerful base healing ability is unmatched even when compared to{' '}
        <CardLink id='W24' />. On top of that, his heavy strength serves as a
        powerful baseline clearer and a heavy runner to secure long games. Olf
        is the perfect tool to extend your games and reach those abundant mana
        turns that Winterpact strives for. Keep in mind that all these benefits
        come at a considerable mana cost.
      </p>

      <h3>
        <CardLink id='F12' />: A
      </h3>
      <p>
        Tode can easily fit in many shadowfen decks. He provides decent value
        and utility for just 4 mana. The ability to jump around the board can
        prove very useful when stalling multiple enemy units as well as
        recovering lost frontline. Tode may also benefit from other synergies
        such as <CardLink id='N40' /> with toad spam decks. But with just 3
        strength, it may be difficult to survive a trade to trigger his ability,
        especially when facing higher level opponents. In many cases,{' '}
        <CardLink id='F14' /> is a very good second choice while also being
        common instead of legendary.
      </p>

      <Title>B-Tier</Title>

      <h3>
        <CardLink id='N35' />: B
      </h3>
      <p>
        Ubass is a tricky card to play in the lower levels. 1 damage for every
        unique primary unit type is not very impactful. Moreover, you cannot
        decide exactly how this damage is spread across the board due to its
        randomness. But Ubass’ strong strength and ability to chip away the
        enemy base makes him a decent consideration for a handful of control
        decks. Naturally, you would want to make a deck with multiple different
        unit types but it is not necessary since you are also taking advantage
        of the unit types your opponent brings. Watch out for players who run{' '}
        <CardLink id='N23' /> if you are running many unit types.
      </p>

      <h3>
        <CardLink id='N48' />: B
      </h3>
      <p>
        Until level 4, Earyn is not that impactful in the game since she can
        only cast up to one spell. But, you may combo her with high value single
        spells such as <CardLink id='N50' /> or other spells you happen to have
        at a high level. Otherwise, she is just not worth until level 4 but
        don’t be afraid to experiment with her! 7 strength on the board is
        pretty significant and provides frontline or soaking large enemies. It
        is also difficult to learn how to align her with the spell(s) you plan
        to combo so this makes her not a great legendary to use at the early
        levels.
      </p>

      <h3>
        <CardLink id='S21' />: B
      </h3>
      <p>
        Unlike <CardLink id='N48' />, Queen is still powerful when spawning only
        one satyr. It is crucial that you build your deck so that you only have
        one satyr, which is <CardLink id='S16' />. Satyr spawning cards such as{' '}
        <CardLink id='S24' /> and <CardLink id='S8' /> do not count as satyr
        cards so you are safe to bring those along. When you do play the Queen
        combo, you add up to 13 strength on the board with 4 separate units for
        only 7 mana! It is important to note that Queen only spawns a satyr in
        your deck, not your hand. If you have <CardLink id='S16' /> in your
        hand, she will not spawn it. Try to avoid cycling before playing Queen
        unless it is to cycle away that satyr.
      </p>

      <h3>
        <CardLink id='W10' />: B
      </h3>
      <p>
        Rime has the potential to stomp on long games but may lack in value due
        to the nature of low level mana gain cards. To find success with her,
        you must focus on building decks that have mana generation cards and are
        designed to stall games. <CardLink id='N9' /> is the most common hard
        counter to Rime but <CardLink id='N9' /> at lower levels is very weak so
        you may find her plowing through some games. A proper control deck is
        necessary for Rime to be worth playing.
      </p>

      <h3>
        <CardLink id='F23' />: B
      </h3>
      <p>
        Klaxi actually has some serious firepower in terms of generating value.
        She is definitely better than <CardLink id='N76' /> at level 1.
        Unfortunately, low level toad spam is not very effective since they do
        not spawn that many 1 strength units. It is still possible to keep
        certain 1 strength units, friend or foe, on the board so that you can
        play Klaxi for more value. But, her high mana cost as well as
        underwhelming low level setups make her difficult to fit outside of very
        specific decks.
      </p>

      <Title>C-Tier</Title>

      <h3>
        <CardLink id='N77' />: C
      </h3>
      <p>
        Sheep is undoubtedly the worst level 1 legendary in the game. Do not
        even consider using it unless for fun.There is a likely chance for the
        ability to do a grand total of zero damage! 6 mana too for only 2
        strength and no movement. Not even a pirate deck would justify using
        this card, especially since it shares the same mana slot as the beloved{' '}
        <CardLink id='N42' />. <span className='Highlight'>Disclaimer:</span>{' '}
        Rogue Sheep is confirmed to be reworked entirely very soon so this may
        be outdated at the time of reading.
      </p>

      <h3>
        <CardLink id='N76' />: C
      </h3>
      <p>
        Bragda is worse than <CardLink id='F23' /> at level 1. 5 strength is not
        much and you will have trouble triggering it. If you can set it up to
        buff its own strength it becomes much better but is a very unreliable
        game plan. Not to mention, low level toad spam is not great at
        capitalizing on Bragda’s power. Level 3 is good, and level 4+ is very
        powerful. Use Klaxi if you have her (and play Shadowfen) until you get
        Bragda at level 3+.
      </p>

      <h3>
        <CardLink id='S3' />: C
      </h3>
      <p>
        Despite Ahmi’s uncapped potential strength, it is incredibly difficult
        to ramp up quick enough at level 1 while finding the space on the board
        to do so. Most of the time, this card is simply not worth playing for 3
        mana because by the time you played Ahmi several times, you are already
        on a losing board state due to lack of strength and positional value
        over those turns. It is much better to play <CardLink id='N16' />, a
        common card, or other 3 mana Swarm or Neutral cards.
      </p>

      <h3>
        <CardLink id='I29' />: C
      </h3>
      <p>
        Although ToS can teleport units like no other card, which is actually
        very valuable in terms of winning the position game, it does not provide
        enough value and is hard to pull off favorable teleports (due to picking
        2 random units and finding the space on the board). For 3 mana, it only
        brings 3 strength on the board, especially since only one copy can exist
        on the board at a time. There are many other more viable 3 mana
        structures such as <CardLink id='I10' /> and <CardLink id='N13' />,
        which have way more value than ToS. Lastly, it is incredibly difficult
        to design a deck that properly takes advantage of its mechanic.
      </p>

      <Title>Afterword</Title>

      <p>
        It is important to understand that this guide is still based on opinion.
        Anyone is allowed to make their own decisions and evaluations for
        Stormbound’s amazing legendaries. This serves as a gentle guide to point
        players into the right direction using the combined experience of
        veteran players. Feel free to seek fun in any way you want with your
        lucky draws!
      </p>

      <p>
        Special thanks to <Link to='/members/derk'>Derk</Link> for helping with
        the tier list as well as a few of the entries and their polishing!
      </p>
    </>
  )
})
