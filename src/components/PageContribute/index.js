import React from 'react'
import { useFela } from 'react-fela'
import Footnotes, { Footnote } from '~/components/Footnotes'
import HorizontalRule from '~/components/HorizontalRule'
import Link from '~/components/Link'
import Only from '~/components/Only'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Spacing from '~/components/Spacing'
import Sparkles from '~/components/Sparkles'
import useUser from '~/hooks/useUser'
import styles from './styles'

export default React.memo(function PageContribute(props) {
  const [user] = useUser()
  const { css } = useFela()

  return (
    <Page
      title='Contribute'
      description='Stormbound-Kitty is 100% free: no ads, no marketing tracking, no paywall. If you can, consider contributing!'
      isEditorialContent
      meta={
        <>
          {props.donators.length} donators · {props.contributors.length}{' '}
          contributors
        </>
      }
      action={{
        children: 'About Kitty',
        to: '/about',
      }}
    >
      <Page.Narrow>
        <p>
          Working on the website and the Discord bot takes a lot of my time,
          time I cannot spend with my family, friends or my cats. Don’t get me
          wrong, I love this project to bits, and I invest in it because I feel
          like it and want to. That being said, having support from the
          community allows me to:
        </p>
        <ul>
          <li>
            Devote more time to it without feeling guilty thanks to{' '}
            <Link href='#financial-support'>financial contributions</Link>.
          </li>
          <li>
            Spend less time doing maintenance work thanks to{' '}
            <Link href='#non-financial-support'>non-financial support</Link>.
          </li>
        </ul>

        <Spacing vertical='LARGEST'>
          <h2 id='financial-support'>Financial support</h2>

          <p>
            Financial contributions help cover minor costs such as hosting,
            privacy-oriented analytics and domain names, as well as generally
            allowing me to spend more time working on the site during my free
            time.
          </p>

          <p>
            If you would like to help, you can make one-time donations via
            credit card through{' '}
            <Link href='https://gumroad.com/l/stormbound-kitty'>Gumroad</Link>
            —a secure platform for online purchases (PayPal is unfortunately no
            longer supported, I’m sorry 😔). The amount is totally up to you,
            from $4 and up. Don’t ruin yourself, donate as little or as much as
            you feel like or can. You can visit my{' '}
            <Link href='https://gumroad.com/l/stormbound-kitty'>
              Gumroad page
            </Link>{' '}
            or click the “Support Stormbound-Kitty” link below.
          </p>

          <Spacing vertical='LARGER'>
            <div className={css({ textAlign: 'center' })}>
              <Sparkles>
                <Link
                  extend={styles.cta}
                  href='https://gum.co/stormbound-kitty?wanted=true'
                >
                  Support{' '}
                  <Only.Mobile>
                    <br />
                  </Only.Mobile>
                  Stormbound-Kitty
                </Link>
              </Sparkles>
            </div>
          </Spacing>

          <p>
            If you do donate, please do let me know on Discord so I can add a
            donation entry to{' '}
            <Link to={user ? `/members/${user.slug}` : '/members'}>
              your page on Stormbound-Kitty
            </Link>
            , or will create one if you don’t have one yet. Thank you so much!
            🙏
          </p>

          <p>
            Thank you so much to these{' '}
            <Footnote id='anonymous-donations'>generous donators</Footnote> (in
            alphabetical order):.
          </p>
          <ul className={css(styles.list)}>
            {props.donators.map(donator => (
              <li key={donator.slug}>
                <Link to={'/members/' + donator.slug}>{donator.name}</Link>
              </li>
            ))}
          </ul>
        </Spacing>

        <Spacing vertical='LARGEST'>
          <h2 id='non-financial-support'>Non-financial support</h2>

          <p>
            If you do not want or simply cannot afford a financial contribution
            to Stormbound-Kitty, fear not! There are plenty of ways for you to
            contribute without spending a cent:
          </p>

          <ul>
            <li>
              We have plenty <Link to='/deck/featured'>featured decks</Link>,
              but it’s sometimes hard to maintain that collection up to date
              with the meta. If you could point out which decks should be
              removed because no longer competitive, that would be helpful!
            </li>

            <li>
              <Link to='/guides'>Guides</Link> tend to be outdated as time goes
              by and the game gets updated. Having them reviewed every now and
              then ensures the information they contain remains valuable and
              helpful for people relying on these guides.
            </li>

            <li>
              People really like{' '}
              <Link to='/simulators/battle/puzzles'>Stormbound puzzles</Link>,
              but not many are being added. If you would like to suggest new
              puzzles, I’m sure that would make a lot of people happy!
            </li>

            <li>
              The <Link to='/list/equals'>Equals Tier List</Link> needs to be
              updated on a monthly basis to reflect balance changes. We tend to
              only update it every few months, which makes it less useful, so
              feel free to help improving it!
            </li>

            <li>
              The <Link to='/calculators/value'>value calculator</Link> is
              pretty experimental. Some cards have questionable results, and{' '}
              <Link to='/faq#value-calculator'>
                some cards are not implemented
              </Link>{' '}
              at all. It would be great to have help figuring out how to best
              compute the value of some cards.
            </li>
          </ul>

          <p>
            Thank you so much to these helpful contributors (in alphabetical
            order):
          </p>
          <ul className={css(styles.list)}>
            {props.contributors.map(contributor => (
              <li key={contributor.slug}>
                <Link to={'/members/' + contributor.slug}>
                  {contributor.name}
                </Link>
              </li>
            ))}
          </ul>
        </Spacing>

        <HorizontalRule />

        <Notice>
          To everyone who has been supportive, kind and patient and helped
          making this site the main resource when it comes to the beautiful and
          whimsical game that is Stormbound, thank you.
        </Notice>

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
