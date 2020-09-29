import React from 'react'
import Article from '../Article'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Sparkles from '../Sparkles'
import toSentence from '../../helpers/toSentence'
import './index.css'

const DONATORS = [
  'Arthis',
  'Blubby',
  'Freeloader',
  'Hadid',
  'Kepp',
  'MisterMonocle',
  'Oeni',
  'OneCurtis',
  'Shades',
  'Roman_NFP',
  'SHTE',
  'Stratadox',
  'Subaiku',
  'Sven',
  'the_mirc',
].map(donator => ' ⭐️ ' + donator)

export default React.memo(function Donate(props) {
  return (
    <Article title='Donate'>
      <p>
        Hey there! My name is Kitty. I created Stormbound-Kitty in March 2019
        (although it did not have a name yet at that point), wanting to do
        something with the beautiful artwork of the game.
      </p>
      <p>
        Thanks to the overwhelmingly positive support from the community (that’s
        you), I kept working on the site, adding more tools, solving more
        problems and all in all enhancing players’ experience outside of the
        game itself. I certainly did not expect the site to become what it had
        become over the last year or so. And if it is what it is today, it is
        essentially thanks to you, kind member of the Stormbound community.
      </p>

      <p>
        In June 2020, I also created a Discord bot for the official Stormbound
        Discord server, which is kind of an extension of the site for Discord,
        giving access to most of the tools directly from Discord, as well as a
        Stormbound trivia game.
      </p>

      <h2>Asking for support</h2>

      <p>
        Working on the website and the bot takes a lot of my time, time I cannot
        spend with family, friends or my cats. Don’t get me wrong, I love this
        project to bits, and I invest in it because I feel like it and want to.
        That being said, having financial support can allow me devote more time
        without feeling guilty and helps cover minor costs such as hosting and
        the domain name.
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
        </a>{' '}
        — a secure platform for online purchases. The amount is totally up to
        you, from $4 and up. Don’t ruin yourself, donate as little or as much as
        you feel like or can. You can visit my{' '}
        <a
          href='https://gumroad.com/l/stormbound-kitty'
          target='_blank'
          rel='noopener noreferrer'
        >
          Gumroad page
        </a>{' '}
        or click the “Support Stormbound-Kitty” link below.
      </p>

      <div className='Donate__container'>
        <Sparkles>
          <a
            className='Donate__CTA'
            href='https://gum.co/stormbound-kitty?wanted=true'
            target='_blank'
            rel='noopener noreferrer'
          >
            Support Stormbound-Kitty
          </a>
        </Sparkles>
      </div>

      <h2>Special thanks</h2>

      <p>
        I have been incredibly lucky to have been supported by wonderful people
        whom I cannot thank enough. My gratitude to, in no particular order,
        {toSentence(DONATORS.sort(), 'and')} — for their generous and kind
        donations.
      </p>

      <p style={{ fontStyle: 'italic' }}>
        Donations being anonymous, I might have missed some. If you have issued
        a donation but are not mentioned, please kindly let me know so I can fix
        that mistake. Along the same lines, if you would like <em>not</em> to
        figure in that list, also let me know.
      </p>

      <hr />

      <Notice>
        To everyone who has been supportive, kind and patient and helped making
        this site the main resource when it comes to the beautiful and whimsical
        game that is Stormbound, thank you.
      </Notice>

      <PageMeta
        title='Donate'
        description='Stormbound-Kitty is 100% free: no ads, no tracking, no paywall. If you can, consider donating!'
      />
    </Article>
  )
})
