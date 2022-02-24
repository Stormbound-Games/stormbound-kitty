import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import Card from '~/components/Card'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import Notice from '~/components/Notice'
import Row from '~/components/Row'
import PageEmbed from '~/components/PageEmbed'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function GuideBroodmotherQordia(props) {
  return (
    <>
      <p>
        Broodmother Qordia is a pretty under-appreciated card because she costs
        a lot of mana and is essentially random, which means hard to pull off.
        In this guide, I will show you ways to play this card with maximum
        value.
      </p>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('F21')} />
      </PageEmbed>

      <Title id='eggs'>It’s all in the eggs</Title>

      <Row isDesktopOnly>
        <Row.Column width='2/3'>
          <p>
            The main power and weakness of Qordia is her eggs. She lays 3 of
            them randomly around here (or fewer if there are not enough empty
            surrounding cells). Because of her high mana cost (6) and the random
            aspect of her ability, it is a “high risk, high reward” kind of
            card.
          </p>

          <p>
            Qordia’s eggs (or “nests” as they are called in the game) are
            considered structures before they hatch. That means they are granted
            immunity to poison, freezing, pushing and pulling, confusion, life
            drain and conversion. Eggs are also immune to some spells and cards’
            attack abilities such as <CardLink id='I7' />’ or{' '}
            <CardLink id='F18' />.
          </p>
          <p>
            At the same time, eggs only have 1 strength, so they can be
            destroyed pretty easily by cards like <CardLink id='N29' /> or{' '}
            <CardLink id='N47' />.
          </p>

          <p>
            This is all to say that there is some use to Broodmother Qordia.
          </p>
        </Row.Column>
        <Row.Column width='1/3' extend={{ justifyContent: 'center' }}>
          <Card
            {...getResolvedCardData({ id: 'T12', level: 1 })}
            rarity='common'
          />
        </Row.Column>
      </Row>

      <Title id='defensive-usage'>Defensive usage</Title>

      <p>
        Using Broodmother Qordia defensively is a really risky move, because the
        mana cost is so high that it is likely that playing several other cards
        might be better.
      </p>
      <p>
        If mana is not a concern, try to play her as a last card, so you get to
        play other cards effectively while there are no eggs lying around. This
        also enables you to leave some empty “pockets” for eggs to be laid
        there.
      </p>

      <p>
        Just like with <CardLink id='F8' />, eggs are a good way to prevent
        runners to rush through your baseline and into your base.{' '}
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCwsLCwsMVQxMkIxLCwsLCw1RjIxQjEsMVQxMkIxLCwxVDEyQjEsLDtSMTBOLUIxMEY7M00wOzs='
      />

      <Title id='offensive-usage'>Offensive usage</Title>

      <p>
        The best use of Broodmother Qordia has to be a super-offensive play on
        the enemy’s baseline. Her ability to lay eggs around her makes her one
        of the only 2 units in the game able to drop a structure on the enemy’s
        baseline (<CardLink id='W13' /> being the other one). This gives
        incredible opportunities to “baselock” the opponent, by filling all the
        available cells on their line to prevent them from defending.
      </p>

      <p>
        And because her eggs are considered structures, they cannot be frozen,
        poisoned, vitalized, confused, pushed or pull which makes them
        essentially impossible to clear without physical damage.
      </p>

      <p>
        Note that Qordia has 1 movement, which means she will attempt to move
        after having laid eggs, provided she is not blocked to do so. With a bit
        of luck, she lays eggs on the side, and moves forward.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='MVQxMkIxLDFUMTJCMSwsLCw1RjIxQjEsLCwxVDEyQjEsLCwsLCwsLCwsLDtSMTBOLUIxMEY7M00wOzs='
      />

      <Title id='alternative-usage'>Alternative usages</Title>

      <p>
        Qordia has some other interesting offensive uses, for instance alongside{' '}
        <CardLink id='N20' />. Eggs layed in front of the Emerald Towers will
        hatch <span className='Highlight'>before</span> the latter resolves,
        which grants an immediately buffed and moving unit. Beware of{' '}
        <CardLink id='N68' /> though as this card can be quite a threat to this
        combo.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCwsLCwsLDFUMTJCMSwsLCw1RjIxQjEsMVQxMkIxLCwxVDEyQjEsLDNOMjBCMTtSMTBOLUIxMEY7M00wOzs='
      />

      <p>
        Another interesting use of Broodmother Qordia is when paired with{' '}
        <CardLink id='N39' />. Because eggs are considered structures,
        Hearthguards’ ability works on them, which can be a powerful (albeit
        expensive) finisher.
      </p>

      <Notice>
        And now, go practice and explore your own Qordia strategies and builds!
      </Notice>
    </>
  )
})
