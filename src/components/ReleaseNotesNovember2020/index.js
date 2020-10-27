import React from 'react'
import CardLink from '../CardLink'
import FAQSection from '../FAQSection'
import Info from '../Info'
import Notice from '../Notice'
import Title from '../Title'
import ReleaseNotes from '../ReleaseNotes'
import { Coins, Stones } from '../Resource'
import Article from '../Article'

export default React.memo(function ReleaseNotesNovember2020(props) {
  return (
    <ReleaseNotes id='11_2020'>
      <Article.Narrow>
        <p>
          It’s spooky season, and Sheepyard is releasing a small update.
          Unfortunately, there is a bit of an unforeseen situation, and the full
          changelog will have to be delayed. Find below the balance tweaks, and
          come back soon for more!
        </p>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          Continuing with their pledge to balance cards regularly, Sheepyard
          makes no exception of this release. On the menu today: some love for
          forgotten cards, and a nerf of Rain of Frogs.
        </p>

        <ul>
          <li>
            <CardLink id='F8' /> now costs 2 mana at level 5. As a result, the
            amount of spawned toads is adjusted 4/4/4-5/5/6 (from 4/5/5/6/6).
          </li>
          <li>
            <CardLink id='N77' /> now costs 6 mana at all levels (down from 7).
          </li>
          <li>
            <CardLink id='F21' /> now costs 6 mana at all levels (down from 7).
          </li>
          <li>
            <CardLink id='I17' /> now moves forward if it kills the pushed unit.
          </li>
          <li>
            <CardLink id='N24' /> now cost 3 mana at all levels (down from 4).
            As a result, their strength is reduced by 1 (from 2/2/3/3/4 to
            1/2/2/3/3) and their ability is adjusted (from 2/3/3/4/4 to
            2/2/3/3/4).
          </li>
        </ul>

        <Info icon='heart' title='Nerf compensation'>
          Owners of Rain of Frogs will be compensated proportionally to the
          level of the card: <Coins amount='0/15/40/120/250' /> and{' '}
          <Stones amount='0/2/5/10/20' />.
        </Info>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'full-content',
              question: 'What happened to the rest of the release?',
              answer: (
                <>
                  <p>
                    We are currently experiencing an unforeseen issue with
                    publishing the release on the Apple app store. We are
                    working hard towards having it resolved shortly, but we do
                    not have an estimated date/time for that.
                  </p>
                  <p>
                    When the build eventually lands, the Stoic Protectors card,
                    exclusive promotional packs and the rework of the freeze
                    mechanic (including the Icicle Burst tweak) will be
                    released.
                  </p>
                </>
              ),
            },
            {
              id: 'release-date',
              question: 'When will the release be available?',
              answer: (
                <>
                  The balance tweaks will be available from November 1st with
                  the new season regardless, since they are applied from the
                  server and do not need an app update. The release date for the
                  full release and the rest of its features is unconfirmed so
                  far.
                </>
              ),
            },
          ]}
        />

        <hr />

        <Notice icon='heart'>
          Come back soon to get the full extent of the changelog!
        </Notice>
      </Article.Narrow>
    </ReleaseNotes>
  )
})
