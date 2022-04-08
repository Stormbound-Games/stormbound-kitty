import React from 'react'
import HorizontalRule from '~/components/HorizontalRule'
import Link from '~/components/Link'
import Info from '~/components/Info'
import Page from '~/components/Page'
import Footnotes, { Footnote } from '~/components/Footnotes'
import MemberList from '~/components/MemberList'
import Spacing from '~/components/Spacing'

export default React.memo(function PageAbout(props) {
  return (
    <Page
      title='About'
      description='Stormbound-Kitty is 100% free: no ads, no marketing tracking, no paywall. If you can, consider donating!'
      isEditorialContent
      author={{ name: 'Kitty', slug: 'kitty' }}
      meta={'Est. March 2019'}
      action={{
        icon: 'arrow-right',
        children: 'Contribute',
        to: '/contribute',
      }}
    >
      <Page.Narrow>
        <Spacing vertical='LARGEST'>
          <p>
            Hey there! I’m Kitty. I created Stormbound-Kitty in March 2019
            (although it did not have a name yet at that point), wanting to do
            something with the beautiful artwork of the game.
          </p>

          <p>
            Thanks to the overwhelmingly positive support from the community
            (that’s you), I kept working on the site, adding more tools, solving
            more problems and all in all enhancing players’ experience outside
            of the game itself. I certainly did not expect the site to become
            what it had become over the last years or so. And if it is what it
            is today, it is essentially thanks to you, kind member of the
            Stormbound community.
          </p>

          <p>
            In June 2020, I also created a Discord bot for the official{' '}
            <Link href='https://discord.gg/stormbound'>
              Stormbound Discord server
            </Link>
            , which is kind of an extension of the site for Discord, giving
            access to most of the tools directly from Discord, as well as a{' '}
            <Link to='/trivia'>Stormbound trivia game</Link>.
          </p>

          <p>
            As of July 2020, Stormbound-Kitty is also the official platform for{' '}
            <Link to='/releases'>release notes</Link> as well as some other
            Sheepyard-provided support.
          </p>

          <Info icon='bullhorn' title='3 years post'>
            <p>
              If you are interested in learning more about the history of the
              website, I recommend you read{' '}
              <Link to='/releases/stormbound-kitty-is-turning-3'>
                the post released for the third anniversary
              </Link>
              , in March 2022.
            </p>
          </Info>
        </Spacing>

        <Spacing vertical='LARGEST'>
          <h2>Contributing</h2>

          <p>
            If you would like to contribute, please read{' '}
            <Link href='/contribute'>how your can help</Link>, either
            financially or by improving the site with your Stormbound knowledge
            and contributions!
          </p>
        </Spacing>

        <Spacing vertical='LARGEST'>
          <h2>Special thanks</h2>

          <p>
            I have been incredibly lucky to have been supported by wonderful
            people whom I cannot thank enough.
          </p>
          <p>
            My gratitude to (in alphabetical order)
            <MemberList members={props.donators} /> for{' '}
            <Footnote id='anonymous-donations'>
              their generous and kind donations
            </Footnote>
            .
          </p>

          <p>
            Additionally, special thanks to the following contributors for
            issuing code updates, whether small or large:{' '}
            <MemberList members={props.contributors} />.
          </p>

          <p>
            To you all, welcome to the{' '}
            <abbr title='Kitty Appreciation Team'>KAT</abbr>. ✨
          </p>

          <p>
            And to everyone who has been supportive, kind and patient and helped
            making this site the main resource when it comes to the beautiful
            and whimsical game that is Stormbound, thank you.
          </p>
        </Spacing>

        <Footnotes>
          <p id='anonymous-donations'>
            (*) Donations being anonymous, I might have missed some. If you have
            issued a donation but are not mentioned, please kindly let me know
            so I can fix that mistake. Along the same lines, if you would like{' '}
            <em>not</em> to figure in that list, also do let me know.{' '}
            <Link href='#anonymous-donations-ref' aria-label='Back to content'>
              ↩
            </Link>
          </p>
        </Footnotes>
      </Page.Narrow>
    </Page>
  )
})
