import React from 'react'
import Guide from '../Guide'
import Title from '../Title'
import CardLink from '../CardLink'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('LEGENDARIES_GUIDE')

export default React.memo(function GuideLegendaries(props) {
  return (
    <Guide {...guide}>
      <p>
        Legendaries are shiny, very rare and may often look good at first sight.
        Most new players tend to automatically include their legendary cards in
        their deck. Sadly, most of them have better, similar, less rare
        substitutes at low levels.
      </p>

      <p>
        This guide aims to give a definite answer to the question:{' '}
        <span className='Highlight'>should I use this level 1 legendary?</span>{' '}
        We’ll also see when some legendary cards can be used for maximum
        potential.
      </p>

      <Title>Neutral</Title>
      <p>
        <CardLink id='N8' />: <span className='Highlight'>maybe</span>.
        Collector Mirz is hard to use. In rush decks, you end up sacrificing 3
        mana for an eventual 0-mana unit. In control decks, mana cost becomes
        less relevant as the game drags on. A 0 mana, 5 strength unit is still
        good. If you are getting close to Platinum, I wouldn’t recommend it,
        otherwise maybe if you like it.
      </p>
      <p>
        <CardLink id='N59' />: <span className='Highlight'>maybe</span>. At
        lower leagues, it works well at level 1, but as you go up the leagues it
        loses effectiveness fast if you can’t keep up with the level. Good
        enough at level 1 up until Gold, probably.
      </p>
      <p>
        <CardLink id='N69' />:{' '}
        <span className='Highlight'>maybe, leaning towards yes</span>. Good in
        lower to mid leagues where 4 strength units are more common. As you rank
        up, they’re going to be more scarce and it will lose its power fast.{' '}
        <CardLink id='N63' /> is a cheaper, better choice if you like the
        effect.
      </p>
      <p>
        <CardLink id='N35' />: <span className='Highlight'>no</span>. Too
        expensive for the effect, not to mention hard to trigger. It is going to
        be an overpriced unit with underwhelming effects most of the time.{' '}
        <CardLink id='N23' /> is somewhat similar, but with a side effect and
        can’t attack the base. I wouldn’t bother with Ubass before level 4, or
        even 5.
      </p>
      <p>
        <CardLink id='N76' />:{' '}
        <span className='Highlight'>small yes, maybe</span>. It is worse than
        High-Priestess Klaxi (see below) at level 1. 5 strength is not too much
        past Gold and you will have trouble triggering it. If you can set it up
        to buff its own strength it becomes much better. Level 3 is good, and
        level 4+ is very powerful. Use High-Priestess Klaxi if you have her (and
        play Shadowfen) until you get Bragda at level 3+.
      </p>
      <p>
        <CardLink id='N46' />:{' '}
        <span className='Highlight'>small yes, maybe</span>. It can be good, but
        it is inherently random. Having it trigger its 5 damage on a 1 strength
        unit is not a good outcome overall. If your average card level is less
        than 3, it can have some value. Past that, other cards will be better.
      </p>
      <p>
        <CardLink id='N48' />: maybe not—especially since it can no longer play{' '}
        <CardLink id='W19' />. Perhaps if you plan to trigger{' '}
        <CardLink id='N44' /> instead. With Gift of the Wise, you can use it one
        turn earlier and get a free 7 strength unit, so no reason not to use it
        in this case. With Needle Blast, you get less value, but it remains
        alright. If planning on using <CardLink id='N29' /> instead, then it
        gets weaker.
      </p>
      <p>
        <CardLink id='N77' />: <span className='Highlight'>no</span>. 7 mana for
        1, potentially 2, damage to all enemy units and structures? Nah.{' '}
        <CardLink id='N29' /> is a better choice. I wouldn’t bother with this
        before level 3 or 4, and only within a pirate deck anyway.
      </p>
      <p>
        <CardLink id='N58' />: <span className='Highlight'>maybe</span>. Siren
        is used for one of two reasons: either because some units need to be
        taken down, or to rush the base from afar. Until higher levels, the
        Confinement-like effect is a little weak as it can only trigger 2 times
        out of the 3 movement (since she’d be dead before reaching the 3rd
        tile), so use her as a long-range decent runner.
      </p>

      <Title>Swarm</Title>
      <p>
        <CardLink id='S3' />: <span className='Highlight'>no</span>, unless you
        have it at a higher level than (or equal to) <CardLink id='N16' />.
        Otherwise it is basically an expensive unit that will clutter your hand.
        Most likely, Westwind Sailors will be at a higher level and therefore a
        better call.
      </p>
      <p>
        <CardLink id='S19' />: <span className='Highlight'>maybe</span>. If you
        can trigger it on 2 or 3 units then the strength/mana ratio is alright
        (albeit still not amazing). But having 3 units in a line is not an easy
        formation. It can be enough to trigger on <CardLink id='S1' />. Use it
        for fun, but if you want distributed strength you should prefer{' '}
        <CardLink id='S14' />.
      </p>
      <p>
        <CardLink id='S21' />: <span className='Highlight'>yes</span>,
        especially when combined with <CardLink id='S16' />. Dreadfauns on the
        5- or 6-mana turn followed by Queen of Herds spawning another Dreadfauns
        is pretty good. At level 1, with level 3 Dreadfauns, it’s a 2.3
        strength/mana ratio, which is pretty good.
      </p>

      <Title>Ironclad</Title>
      <p>
        <CardLink id='I2' />: <span className='Highlight'>yes</span>. There is
        no other card with similar effects and it is very good even at level 1.
        It obviously gets better at level 2 and 4, but level 1 is good enough if
        you build a deck around it.
      </p>
      <p>
        <CardLink id='I17' />: <span className='Highlight'>no</span>, stay away
        from it, even at higher levels. Use <CardLink id='I20' /> (which is a
        better choice at virtually any level), <CardLink id='I18' /> or{' '}
        <CardLink id='I4' /> instead.
      </p>
      <p>
        <CardLink id='I22' />: <span className='Highlight'>no</span>. At level
        2, provided it respawns once, you get a 2 strength/mana ratio, which is
        equivalent to which of level 3
        <CardLink id='I1' />, level 4 <CardLink id='N3' />, level 5{' '}
        <CardLink id='N16' />… But unless your enemy actually allows you to
        exploit the respawned unit strength, it’s just gonna be an expensive
        unit that will not be a threat. <CardLink id='I21' /> and{' '}
        <CardLink id='I16' /> are better cards with similar mana cost.
      </p>

      <Title>Winter</Title>
      <p>
        <CardLink id='W8' />: <span className='Highlight'>no</span>. Anything is
        a better choice unfortunately. Her ability is hard to trigger, hard to
        set up, and the effect is not even amazing. Not a good card at any level
        in her current state.
      </p>
      <p>
        <CardLink id='W10' />: <span className='Highlight'>maybe</span>. At
        lower leagues, games tend to drag on so it can work. If your average
        card level is getting close to 3, drop it until it’s level 3+. From
        there, she becomes quite good.
      </p>
      <p>
        <CardLink id='W23' />: <span className='Highlight'>maybe</span>, but
        just because the best substitute is an epic—
        <CardLink id='N39' />. The latter may not heal your base, but fill the
        same defensive role better and can attack the enemy base too if you have
        a building or <CardLink id='W13' />. Epics are easier to level up, but
        not easy. Use whichever has the higher level. Olf the Hammer is not the
        best level 1 legendary, but it’s not bad either.
      </p>

      <Title>Shadowfen</Title>
      <p>
        <CardLink id='F12' />: <span className='Highlight'>maybe</span>. It’s
        only good if it survives after attacking and making a 3 strength unit
        survive an attack is not always easy, especially as one progresses
        through the leagues. It may work on in low leagues, but I would not
        heavily rely on it. It gets pretty good at level 3+. No other card is
        similar, but ultimately it’s an offensive card. Prefer 2 cards that cost
        2 mana instead, like <CardLink id='N3' /> and <CardLink id='F3' />.
      </p>
      <p>
        <CardLink id='F21' />: <span className='Highlight'>no</span>. Use it for
        fun at lower leagues, but it’s a very expensive card and a gamble.
        Keeping the 1 strength eggs alive is a challenge at higher leagues and
        the benefits are not always worth the risks. I wouldn’t bother even at
        higher levels but it can be fun.
      </p>
      <p>
        <CardLink id='F23' />: <span className='Highlight'>yes</span>. She has a
        kind of infinite potential albeit a little hard to setup. As long as you
        can get your 1 strength frogs out and use it, it’s quite strong. She is
        better than Prime-Oracle Bragda (see above) at lower levels but gets
        outclassed later on. Still a good level 1 legendary.
      </p>
    </Guide>
  )
})
