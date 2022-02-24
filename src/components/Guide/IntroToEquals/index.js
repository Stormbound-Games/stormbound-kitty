import React from 'react'
import Link from '~/components/Link'
import CardLink from '~/components/CardLink'
import FeaturedDeck from '~/components/FeaturedDeck'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

export default React.memo(function GuideEqualsIntro(props) {
  return (
    <>
      <TableOfContents>
        <li>
          <Link href='#what-to-expect'>What to expect</Link>
        </li>
        <li>
          <Link href='#differences-from-ranked'>Differences from Ranked</Link>
        </li>
        <li>
          <Link href='#deck-building'>Deck building</Link>
        </li>
        <li>
          <Link href='#tournaments-and-deck-flexibility'>
            Tournaments and deck flexibility
          </Link>
        </li>
        <li>
          <Link href='#tips-and-tricks'>Tips and Tricks</Link>
        </li>
      </TableOfContents>

      <Title id='what-to-expect'>What to expect</Title>

      <p>
        <span className='Highlight'>Equals</span> refers to the game mode in
        which both players have only 10 base health and all their cards are
        level 1—regardless of their quality.
      </p>

      <p>
        Equals format is not just Ranked with lower card levels and base health.
        The meta, playstyle, match length and deck building are all completely
        different.
      </p>

      <p>
        This mostly has to do with the fact that a lot if not all cards and card
        combos which are being used in Ranked aren’t very good at level 1 (and
        vice versa). For example: <CardLink id='N3' /> is one the most used
        cards in Ranked while it rarely sees play in Equals.
      </p>

      <Title id='differences-from-ranked'>Differences from Ranked</Title>

      <p>
        Possibly the biggest difference between Ranked and Equals is that decks
        are far less combo-reliant in Equals. The majority of cards in a good
        Equals deck have nothing in common and no synergy whatsoever.
      </p>

      <p>
        Of course there are some combos or synergies being used but usually not
        more than 3 cards that work well together. For instance, very popular
        combo in Equals decks is <CardLink id='N6' /> + 1 or 2 other dragons
        (like <CardLink id='F9' /> and <CardLink id='F21' /> if you’re playing
        Shadowfen).
      </p>

      <p>
        So if combos and synergy aren’t very important, then what is? The answer
        is <span className='Highlight'>value</span>. Value is (nearly)
        everything in Equals. If you take a look at the{' '}
        <Link to='/list/equals'>Equals tier list</Link>, you will see that most
        of the cards in the “Auto-Include” tier generate a lot of value.
      </p>

      <Title id='deck-building'>Deck building</Title>

      <p>
        So to make a good Equals deck, you need to look at the cards that can
        generate the most value. For example: combined with another dragon,{' '}
        <CardLink id='N6' /> gives a total of 4 strength for only 2 mana! Now
        let’s say your other dragon is <CardLink id='F9' /> or{' '}
        <CardLink id='S4' />, you will get another 6 strength for only 3 mana as
        well. 10 strength for only 5 mana at level 1? Doesn’t get any better
        than that.
      </p>

      <p>
        But value isn’t <em>everything</em> you need to look at when creating a
        deck. Your mana curve is also very important. Equals matches are often
        way slower than Ranked matches because you’d rather have some more
        expensive cards with lots of value than some cheaper cards with low
        amounts of value.
      </p>

      <Info icon='compass' title='Mana Curve Guide'>
        <p>
          If you are unfamiliar with the concept of{' '}
          <span className='Highlight'>mana curve</span>, refer to the{' '}
          <Link to='/guides/mana-curve'>dedicated guide</Link> by{' '}
          <Link to='/members/kitty'>Kitty</Link>. It covers the basics of mana
          curve, how to analyze it and features some cute graphs. ✨
        </p>
      </Info>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='1xn1f3n6f7f9n25f12n60n69f21n46n68'
              author='Derk'
              name='Shadowfen Equals'
              showUpgrade={false}
              tags={['EQUALS']}
            />
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='1xn1w1w2n6w5w7n25w8n60n69n46w18'
              author='Derk'
              name='Winter Equals'
              showUpgrade={false}
              tags={['EQUALS']}
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='1xn1i1n6i5n67i8i9i13i27n25i12n39'
              author='Derk'
              name='Ironclad Equals'
              showUpgrade={false}
              tags={['EQUALS']}
            />
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='1xn1s24n6s4s8n18n25n60s18n46n68n57'
              author='Derk'
              name='Swarm Equals'
              showUpgrade={false}
              tags={['EQUALS']}
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>
        As you can see, decks generally have only 2 or 3 cards that cost 2 mana
        (with the Ironclad rush deck as an exception). Ranked decks often have
        <span className='Highlight'>at least</span> 4 cards that cost 2 mana and
        don’t have any cards more expensive than 5 or sometimes even 4 mana.
      </p>

      <p>
        Going further into the deck, you’ll see there are often 2 cards of each
        mana-cost up to 6 mana (except for 1 mana since{' '}
        <Link to='/guides/green-prototypes'>
          Green Prototypes is the only good
        </Link>{' '}
        1-cost neutral card). I’ve found 2 cards of each cost up to 6 mana to be
        the ideal amount, if you don’t make any mistakes in cycling cards, you
        can almost always use up all mana every turn. Being mana-efficient is
        key, using all mana each turn means you generate the most value
        possible.
      </p>

      <Title id='tournaments-and-deck-flexibility'>
        Tournaments and deck flexibility
      </Title>

      <p>
        The Equals format is almost exclusively used in tournaments. This format
        can only be played in friendly matches currently, this is also how
        Tournament matches are organized (add your next opponent as friend
        in-game and then select level 1 cards and 10 base health when
        challenging them for a friendly match).
      </p>

      <p>
        Every tournament has a unique set of rules and often a list of banned
        cards. This gives players the opportunity to make very different decks
        each time, meaning you will never see the same deck twice in any event.
      </p>

      <p>
        These rules and banned cards allow for strategies to be used that would
        normally never even be considered! For example: <CardLink id='N39' />{' '}
        Shadowfen with <CardLink id='N13' /> was possibly the best deck at some
        point in Faction Wars. If you look at the winning decks in{' '}
        <Link to='/tournaments/hall-of-fame'>Tournaments</Link>, you will see
        how much the decks vary.
      </p>

      <Title id='tips-and-tricks'>Tips and Tricks</Title>

      <ul>
        <li>
          It’s usually not worth making risky or ambitious plays, slow and
          steady is the way to go. Playing a card 1 or even 2 rows back is
          sometimes better to maintain board presence.
        </li>
        <li>
          Spells are often not worth using, units are better. Only a handful of
          decks in the <Link to='/tournaments/hall-of-fame'>Hall of Fame</Link>{' '}
          contain 2 spells, all other decks contain either 0 or 1.
        </li>
        <li>
          Make sure you have enough units with 1 movement, since you won’t have
          (m)any spells, you need units to contest for board presence and units
          with no movement aren’t good for that while units with 2+ movement
          don’t have enough strength.
        </li>
        <li>
          Make sure you have enough 4 strength units, the 4 mana turn is usually
          when the match <em>really</em> starts which means 4 mana units (with 4
          strength) are very popular.
        </li>
      </ul>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        That’s it friends, short and sweet! Nevertheless, I hope this helps.
        <br /> See you on the battlefield!
      </Notice>
    </>
  )
})
