import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import Card from '~/components/Card'
import Info from '~/components/Info'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function GuideDrawing(props) {
  return (
    <>
      <p>
        Unlike other famous card games like Magic: the Gathering, Stormbound
        does not come with a rulebook explaining in excruciating details how the
        game mechanics work. We make do with the campaign and some practice
        battles, but the survive and death trigger resolution can still be a
        mystery even for experienced players. In this guide, we will attempt to
        demystify it.
      </p>

      <Title>Death Trigger Effects</Title>

      <p>
        “Death Trigger Effects” (or{' '}
        <abbr title='Death Trigger Effect'>DTE</abbr> for short, symbolised by
        the little skull icon in the game) are abilities that are resolved when
        the unit dies.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'F5', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'I12', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'S8', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'N6', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
      </PageEmbed>

      <Info icon='sword' title='Attacking bases and DTE'>
        <p>
          Units attacking a base always die right after the damage is done to
          the base, which triggers their DTE immediately after, unless they
          destroy the base in which case the game is obviously over.
        </p>
      </Info>

      <h3>Resolution order</h3>

      <p>
        The rule of thumb goes as follow: when two units with a “Death Trigger
        Effect” fight and both of them die, the{' '}
        <span className='Highlight'>attacked</span> unit will die and resolve
        its effect first, then the <span className='Highlight'>attacking</span>{' '}
        unit will. Same thing goes for{' '}
        <abbr title='Survive Trigger Effect'>STE</abbr>.
      </p>

      <p>
        For example if <CardLink id='N1' /> attack <CardLink id='I6' /> and both
        die, the latter will first spawn a construct then the Green Prototypes
        will boost it, if it spawns on a surrounding tile.
      </p>

      <Info icon='sword' title='Finite Loopers quirk'>
        <p>
          Interesting piece of trivia about the Green Prototypes / Finite
          Loopers situation: if the looper construct spawns on the tile where
          Green Prototypes died, it will not gain strength from the Green
          Prototypes because it is not technically a “surrounding tile”.
        </p>
      </Info>

      <p>
        Now what if multiple units with a DTE die simultaneously as the result
        of an area of damage? They will resolve following the same order as the
        attack pattern of the non-active player (i.e. from right to left then
        front to back if it is your turn and vice versa, if it’s the enemy
        turn).
      </p>

      <h3>Toxic Sacrifice</h3>

      <p>
        Consider the following example in which the player would sacrifice{' '}
        <CardLink id='N3' /> with <CardLink id='F4' />. The numbers are intended
        to represent both the order of DTE resolution and the effective strength
        as well.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCw1STIyUjEsLDRJNlIxLCwzTjI2QjEsMU4zQjEsLCwsMk42QjEsMU4xUjEsLCwsO1IxMEktQjEwRjszTTA7NUY0O0Y0 '
      />

      <p>
        The DTE are resolved right-to-left, front-to-back for the active player.
        That means:
      </p>
      <ol>
        <li>
          The damage is applied unilaterally and all units die as a result of
          the Toxic Sacrifice (level 5) damage.
        </li>
        <li>
          Green Prototypes resolve their DTE. Because Spare Dragonling died
          simultaneously, there is no enemy unit nearby to buff.
        </li>
        <li>Spare Dragonling resolves its DTE, buffing no dragon.</li>
        <li>Snowmasons resolve their DTE, buffing no nearby unit.</li>
        <li>
          Finite Loopers resolve their DTE, spawning a construct on a bordering
          tile.
        </li>
        <li>
          Projectves Ph03-nix resolves its DTE, respawning on the base line.
        </li>
      </ol>

      <h3>Crimson Sentry</h3>

      <p>
        Consider the following example in which the player would play{' '}
        <CardLink id='F5' /> right in the middle. The numbers are intended to
        represent both the order of DTE resolution and the effective strength as
        well.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCw0STIyUjEsLCwzTjQ2QjEsLDJOMVIxLCwsMU42QjEsLCwsLCw7UjEwSS1CMTBGOzNNMDs1RjU7RjU='
      />

      <p>The DTE are resolved right-to-left, front-to-back. That means:</p>
      <ol>
        <li>
          The damage is applied unilaterally and all units die as a result of
          Crimson Sentry’s DTE.
        </li>
        <li>
          Spare Dragonling resolves its death effect. However, since the damage
          is applied first, Tegor dies simultaneously and therefore there is no
          other friendly dragon to buff. The DTE goes to waste.
        </li>
        <li>
          Green Prototypes resolve their death effect. Since there are no nearby
          enemy unit, they do not buff anyone.
        </li>
        <li>
          Tegor the Vengeful resolves its death effect. Since the four units die
          simultaneously, there are no friendly units and no enemy units (since
          Project PH03-nix did not respawn yet), therefore the trigger is
          guaranteed to be a dragon spawn.
        </li>
        <li>
          Project PH03-nix resolves its death effect, respawning on the base
          line.
        </li>
      </ol>

      <h3>Toxic Sacrifice on Crimson Sentry</h3>

      <p>
        Now consider the same example, in which the player would play{' '}
        <CardLink id='F4' /> (level 5) on <CardLink id='F5' /> (level 3). The
        numbers are intended to represent both the order of DTE resolution and
        the effective strength as well.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCw0TjQ2QjEsLCwzSTIyUjEsMUY1QjMsMk4xUjEsLCwxTjZCMSwsLCwsLDtSMTBJLUIxMEY7M00wOzVGNDtGNA=='
      />

      <ol>
        <li>
          Crimson Sentry dies as a result of Toxic Sacrifice and resolves its
          DTE which kills Spare Dragonling, Green Prototypes and Project
          PH03-nix simultaneously, and puts Tegor down to 1 strength.
        </li>
        <li>
          Spare Dragonling (level 1) resolves its DTE and buffs Tegor with 3
          strength, making him 4 strength total.
        </li>
        <li>
          Green Prototypes (level 2) resolve their DTE and buff Tegor by 2
          strength, making him 6 strength total.
        </li>
        <li>Project PH03-nix resolves its DTE and respawns on the baseline.</li>
        <li>
          Toxic Sacrifice (level 5) damage is now resolved and bring Tegor down
          to 1 strength again.
        </li>
        <li>
          At the beginning of the player’s next turn, Tegor dies from poison
          (provided it did not get killed in the mean time).
        </li>
      </ol>

      <h3>Toxic Sacrifice on Dubious Hags</h3>

      <p>
        Consider the following example, in which the player would play{' '}
        <CardLink id='F4' /> on <CardLink id='F3' />. The numbers are intended
        to represent both the order of DTE resolution and the effective strength
        as well.
      </p>

      <BattleSimEmbed
        environment='shadowfen'
        id='LCwsLCwsLCwzUzJSNSwxRjNCMSwyTjFCMSwsLDFONkIxLCwsLCwsO1IxMFMtQjEwRjszTTA7NUY0O0Y0'
      />

      <p>
        In this example, because the sacrificed unit resolves its DTE first (as
        seen earlier with Crimson Sentry), the raven spawn for the enemy is
        guaranteed to happen on the top bordering tile.
      </p>

      <p>
        However, this newly spawned unit will not be damaged and killed by Toxic
        Sacrifice since it spawned after Toxic Sacrifice was played (even though
        before its damage get resolved).
      </p>

      <Title>Survive Trigger Effects</Title>

      <p>
        Elder units have effects happening upon surviving damage (“Survive
        Trigger Effect”, or <abbr title='Survive Trigger Effect'>STE</abbr> for
        short).
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'F28', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'I28', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'S28', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'W28', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>
        For the most part, their resolution pattern is pretty straightforward,
        but there are things to note:
      </p>

      <ul>
        <li>
          <CardLink id='N9' /> and <CardLink id='N58' /> do{' '}
          <span className='Highlight'>not</span> cause a STE. Elders can safely
          be confined without risking triggering their abilities.
        </li>
        <li>
          Pre-attack life drain from <CardLink id='F14' />,{' '}
          <CardLink id='F15' /> and <CardLink id='F16' />
          ’s cause an initial STE (provided the elder survives the drain). Then
          a second STE might occur if the elder survives the subsequent attack.
        </li>
        <li>
          <CardLink id='N47' />, <CardLink id='N55' /> and <CardLink id='I15' />
          ’s abilities cause an initial STE (provided the elder survives it).
          Then a second STE might occur if the elder survives the subsequent
          attack.
        </li>
        <li>
          <CardLink id='I17' />, <CardLink id='I20' />, <CardLink id='I18' />{' '}
          and <CardLink id='I23' />
          ’s abilities cause a STE that is resolved{' '}
          <span className='Highlight'>after</span> the push/pull.
        </li>
        <li>
          <CardLink id='N57' />
          ’s on-play ability causes a single STE per affected elder, and not a
          STE per bomb. Then a second STE might occur if the elder survives the
          subsequent attack.
        </li>
        <li>
          <CardLink id='I28' />
          ’s STE causes a STE.
        </li>
        <li>
          <CardLink id='W15' /> and <CardLink id='I12' />
          ’s DTE cause a STE.
        </li>
        <li>
          Forced attacks from <CardLink id='N61' /> or <CardLink id='N69' />{' '}
          cause a STE.
        </li>
        <li>
          Poison damage cause a STE. That is what makes <CardLink id='F28' /> so
          efficient.
        </li>
      </ul>
    </>
  )
})
