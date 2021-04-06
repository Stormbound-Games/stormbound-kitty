import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import MemberList from '../MemberList'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Sparkles from '../Sparkles'
import contributions from '../../data/contributions'
import donations from '../../data/donations'
import './index.css'

export default React.memo(function About(props) {
  return (
    <Article title='About'>
      <Article.Narrow>
        <p>
          Hey there! My name is Kitty. I created Stormbound-Kitty in March 2019
          (although it did not have a name yet at that point), wanting to do
          something with the beautiful artwork of the game.
        </p>
        <p>
          Thanks to the overwhelmingly positive support from the community
          (that’s you), I kept working on the site, adding more tools, solving
          more problems and all in all enhancing players’ experience outside of
          the game itself. I certainly did not expect the site to become what it
          had become over the last year or so. And if it is what it is today, it
          is essentially thanks to you, kind member of the Stormbound community.
        </p>

        <p>
          In June 2020, I also created a Discord bot for the official Stormbound
          Discord server, which is kind of an extension of the site for Discord,
          giving access to most of the tools directly from Discord, as well as a
          Stormbound trivia game.
        </p>

        <p>
          As of July 2020, Stormbound-Kitty is also the official platform for{' '}
          <Link to='/releases'>release notes</Link> as well as some other
          Sheepyard-provided support.
        </p>

        <h2>Financial support</h2>

        <p>
          Working on the website and the bot takes a lot of my time, time I
          cannot spend with family, friends or my cats. Don’t get me wrong, I
          love this project to bits, and I invest in it because I feel like it
          and want to. That being said, having financial support can allow me
          devote more time without feeling guilty and helps cover minor costs
          such as hosting and the domain name.
        </p>

        <p>
          If you would like to help, you can make one-time donations with PayPal
          or credit card through{' '}
          <a
            href='https://gumroad.com/l/stormbound-kitty'
            target='_blank'
            rel='noopener noreferrer'
          >
            Gumroad
          </a>
          —a secure platform for online purchases. The amount is totally up to
          you, from $4 and up. Don’t ruin yourself, donate as little or as much
          as you feel like or can. You can visit my{' '}
          <a
            href='https://gumroad.com/l/stormbound-kitty'
            target='_blank'
            rel='noopener noreferrer'
          >
            Gumroad page
          </a>{' '}
          or click the “Support Stormbound-Kitty” link below.
        </p>

        <div className='About__container'>
          <Sparkles>
            <a
              className='About__CTA'
              href='https://gum.co/stormbound-kitty?wanted=true'
              target='_blank'
              rel='noopener noreferrer'
            >
              Support Stormbound-Kitty
            </a>
          </Sparkles>
        </div>

        <p>
          If you do donate, please do let me know on Discord so I can add a
          donation entry to{' '}
          <Link to='/members'>your page on Stormbound-Kitty</Link>, or will
          create one if you don’t have one yet. Thank you so much! 🙏
        </p>

        <h2>Non-financial support</h2>

        <p>
          If you do not want or simply cannot afford to provide a financial
          contribution to Stormbound-Kitty, fear not! There are plenty of ways
          for you to contribute without spending a cent:
        </p>

        <ul>
          <li>
            We have plenty <Link to='/deck/suggestions'>suggested decks</Link>,
            but it’s sometimes hard to maintain that collection up to date with
            the meta. If you could point out which decks should be removed
            because no longer competitive, that would be helpful!
          </li>

          <li>
            The <Link to='/calculators/value'>value calculator</Link> is pretty
            experimental. Some cards have questionable results, and{' '}
            <Link to='/faq#value-calculator'>
              some cards are not implemented
            </Link>{' '}
            at all. It would be great to have help figuring out how to best
            compute the value of some cards.
          </li>

          <li>
            People really like <Link to='/sim/puzzles'>Stormbound puzzles</Link>
            , but not many are being added. If you would like to suggest new
            puzzles, I’m sure that would make a lot of people happy!
          </li>
        </ul>

        <h2>Special thanks</h2>

        <p>
          I have been incredibly lucky to have been supported by wonderful
          people whom I cannot thank enough.
        </p>
        <p>
          My gratitude to (in alphabetical order)
          <MemberList
            members={[...new Set(donations.map(donation => donation.author))]}
          />{' '}
          for their generous and kind donations.
        </p>

        <p>
          Additionally, special thanks to the following contributors for issuing
          code updates, whether small or large:{' '}
          <MemberList
            members={[
              ...new Set(
                contributions.map(contribution => contribution.author).sort()
              ),
            ]}
          />
          .
        </p>

        <p>
          To you all, welcome to the{' '}
          <abbr title='Kitty Appreciation Team'>KAT</abbr>. ✨
        </p>

        <p style={{ fontStyle: 'italic' }}>
          Donations being anonymous, I might have missed some. If you have
          issued a donation but are not mentioned, please kindly let me know so
          I can fix that mistake. Along the same lines, if you would like{' '}
          <em>not</em> to figure in that list, also let me know.
        </p>

        <hr />

        <Notice>
          To everyone who has been supportive, kind and patient and helped
          making this site the main resource when it comes to the beautiful and
          whimsical game that is Stormbound, thank you.
        </Notice>
      </Article.Narrow>

      <PageMeta
        title='About'
        description='Stormbound-Kitty is 100% free: no ads, no tracking, no paywall. If you can, consider donating!'
      />
    </Article>
  )
})
