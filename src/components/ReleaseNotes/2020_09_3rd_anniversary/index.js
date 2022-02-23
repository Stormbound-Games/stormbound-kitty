import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Image from '~/components/Image'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import ResourceIcon from '~/components/ResourceIcon'
import { Legendary, Coins, Crowns, Stones, Rubies } from '~/components/Resource'
import Row from '~/components/Row'
import Table from '~/components/Table'
import Title from '~/components/Title'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import getMilestoneCost from '~/helpers/getMilestoneCost'
import getResourceLabel from '~/helpers/getResourceLabel'

export default React.memo(function ReleaseNotes3rdAnniversary(props) {
  return (
    <>
      <Page.Narrow>
        <p>
          On September 18th, Stormbound is turning 3 years old. That’s
          incredible that a prototype issued from a game-jam turned into the
          game we all like and play daily! Happy anniversary Boundy!
        </p>

        <p>
          Going against the tradition, Stormbound is the one offering gifts on
          that special occasion. On the menu, four different things, enough to
          please everyone, whether paying or non-paying player.
        </p>

        <p>
          To begin with, every player will receive a one-time bundle containing{' '}
          <Coins amount={330} />, <Rubies amount={30} /> and{' '}
          <Stones amount={3} /> as well as <Legendary amount={1} /> at random
          upon login.
        </p>

        <Title id='brawl'>Brawl</Title>

        <p>
          All matches for the{' '}
          <Link to='/brawl/feline-strength'>
            Brawl following the 18th of September
          </Link>{' '}
          will{' '}
          <span className='Highlight'>
            cost a third of their original price
          </span>{' '}
          (rounded to the closest multiple of 5).
          <Only.Desktop>
            {' '}
            Here are the adjust values for every milestone:
          </Only.Desktop>
        </p>
      </Page.Narrow>

      <Only.Desktop>
        <Page.Embed>
          <Table>
            <thead>
              <tr>
                <th>Required crowns</th>
                <th>Cost per match</th>
                <th>Reward once reached</th>
              </tr>
            </thead>
            <tbody>
              {BRAWL_MILESTONES.LEGACY.map(milestone => {
                const cost = getMilestoneCost(milestone, 1 / 3)

                return (
                  <tr key={milestone.crowns}>
                    <td>
                      <Crowns amount={milestone.crowns} />
                    </td>
                    <td>
                      <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
                    </td>
                    <td>{getResourceLabel(milestone, true)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Page.Embed>
      </Only.Desktop>

      <Page.Narrow>
        <Info icon='crown' title='Oeni’s Gazette'>
          <p>
            Be sure to read{' '}
            <Link to='/guides/noble-coalition'>Oeni’s Gazette</Link> to learn
            more about the Noble Coalition Brawl, especially in regard to this
            anniversary event.
          </p>
        </Info>

        <Title>Boosted books</Title>

        <p>
          If you were waiting for an appealing sale to spend all your rubies,
          now is the time. Because between September 17th and September 20th,{' '}
          <span className='Highlight'>
            all books will contain 33% more cards
          </span>
          . As a result:{' '}
        </p>

        <ul>
          <li>
            Mythic, Heroic and Classic Tomes will yield 8 cards instead of 6.
          </li>
          <li>Noble books will yield 4 cards instead of 3.</li>
          <li>Humble books will still contain a single card.</li>
        </ul>

        <Title>Limited Offers</Title>

        <p>
          For players who can afford or are willing to spend some money into the
          game, this 3rd anniversary brings exciting new limited one-time offers
          between September 17th and September 24th:
        </p>

        <ul>
          <li>
            At $4.99: 1 Mythic Tome + <Coins amount={100} />
          </li>
          <li>
            At $19.99: 4 Mythic Tomes + 4 Heroic Tomes + <Coins amount={500} />
          </li>
          <li>
            At $49.99: 10 Mythic Tomes + 10 Heroic Tomes + 10 Classic Tomes +{' '}
            <Coins amount={1500} />
          </li>
          <li>
            At $99.99: 20 Mythic Tomes + 20 Heroic Tomes + 20 Classic Tomes +{' '}
            <Coins amount={5000} /> + <Stones amount={50} />
          </li>
        </ul>
      </Page.Narrow>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ margin: 'auto' }}
              src='/assets/images/releases/birthday_pack_1.png'
              alt='$4.99 promotion: 1 Mythic Tome + 100 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ margin: 'auto' }}
              src='/assets/images/releases/birthday_pack_2.png'
              alt='$10.99 promotion: 4 Mythic Tomes + 4 Heroic Tomes + 500 coins'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              extend={{ margin: 'auto' }}
              src='/assets/images/releases/birthday_pack_3.png'
              alt='$49.99 promotion: 10 Mythic Tomes + 10 Heroic Tomes + 10 Classic Tomes + 1500 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              extend={{ margin: 'auto' }}
              src='/assets/images/releases/birthday_pack_4.png'
              alt='$99.99 promotion: 20 Mythic Tomes + 20 Heroic Tomes + 20 Classic Tomes + 5000 coins + 50 fusion stones'
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <Page.Narrow>
        <p>
          Additionally, <ResourceIcon resource='RUBY' /> rubies and{' '}
          <ResourceIcon resource='COIN' /> coins offers in the shop will yield
          33% more resources. The $9.99 offer for instance will yield{' '}
          <Rubies amount={170} /> instead of 130. Similarly, the coins pack for{' '}
          <Rubies amount={50} /> will yield <Coins amount={600} /> instead of
          450.
        </p>

        <Title id='wallpapers'>Wallpapers</Title>

        <p>
          Last but not least, the Sheepyard design team has put up a collection
          of desktop and home screen wallpapers that you can find in exclusivity
          in the <Link to='/fan-kit/wallpapers'>wallpapers section</Link>. Enjoy
          them!
        </p>
      </Page.Narrow>

      <Page.Embed>
        <Image
          extend={{ margin: 'auto' }}
          src='https://cdn.sanity.io/images/5hlpazgd/production/956987cec4057771037db8e77411abbf30a44228-1920x1080.png?auto=format&w=1200'
          alt='Stormbound Wallpaper'
          withAvif
        />
      </Page.Embed>

      <Notice>
        <span className='Highlight'>Meow</span> and happy fighting, fellow
        Stormbounders!
      </Notice>
    </>
  )
})
