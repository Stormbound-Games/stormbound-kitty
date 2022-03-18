import React from 'react'
import { useFela } from 'react-fela'
import copy from 'copy-to-clipboard'
import { CardsContext } from '~/components/CardsProvider'
import CTA from '~/components/CTA'
import DiamondButton from '~/components/DiamondButton'
import Input from '~/components/Input'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import download from '~/helpers/download'
import track from '~/helpers/track'
import { convertToSbId } from '~/helpers/convertDeckId'

const exportAsImage = () => {
  const deck = document.querySelector('#deck')
  track('download_deck_as_image')

  // Scrolling back to the top of the page seems to help with having an accurate
  // visual representation of the deck.
  window.scrollTo(0, 0)

  import('html2canvas' /* webpackChunkName: 'html2canvas' */)
    .then(({ default: html2canvas }) => {
      return html2canvas(deck, {
        backgroundColor: null,
        ignoreElements: element => element.getAttribute('role') === 'dialog',
      })
    })
    .then(canvas =>
      download({
        content: canvas.toDataURL(),
        fileName: 'deck.png',
        mimeType: 'image/png',
        blob: false,
      })
    )
}

export default React.memo(function DeckShareButton(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const sbId = convertToSbId(cardsIndex, props.deck)
  const [hasCopied, setHasCopied] = React.useState(false)
  const copyToClipboard = React.useCallback(() => {
    if (copy(sbId)) {
      track('copy_stormbound_deck_id', { id: sbId })
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 3000)
    }
  }, [sbId])

  return (
    <ShareDialog
      label='Share deck'
      disabled={props.disabled}
      image='https://cdn.sanity.io/images/5hlpazgd/production/596e054dac114d033c4ceca539e4af9f00ff6f87-512x512.png'
    >
      <p>
        Your deck is automatically saved to the URL of the page as you work on
        it. You can safely reload the page, or bookmark it to come back to it
        later.
      </p>

      <p>
        If you would like to share your deck with others, you can easily do so
        by downloading it as an image, copying the Stormbound deck ID for the
        game, or by sharing the link directly.
      </p>

      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <div className={css({ flex: '1 1 auto', textAlign: 'left' })}>
          <Input readOnly value={sbId} label='Stormbound deck ID' />
        </div>

        <DiamondButton
          extend={{
            zIndex: 1,
            flexShrink: 0,
            marginTop: '1.25em',
            marginLeft: '1em',
            marginRight: '0.5em',
          }}
          onClick={copyToClipboard}
          icon={hasCopied ? 'checkmark' : 'copy'}
          label={hasCopied ? 'Copied!' : 'Copy'}
        />
      </div>

      <Spacing top='BASE'>
        <CTA type='button' onClick={exportAsImage}>
          Download as image
        </CTA>
      </Spacing>
    </ShareDialog>
  )
})
