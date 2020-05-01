import React from 'react'
import CTA from '../CTA'
import Image from '../Image'
import PageMeta from '../PageMeta'
import Title from '../Title'
import './index.css'

export default React.memo(function Error(props) {
  return (
    <>
      <div className='Error'>
        {!props.noTitle && (
          <Title element='h1' className='Error__title'>
            An error occurred
          </Title>
        )}

        {!props.noImage && (
          <Image src='/assets/images/cards/sweetcap_kittens.png' alt='' />
        )}

        {props.error === 'ChunkLoadError' ? (
          <p>
            You must have changed page during a re-deployment of the site. Very
            sorry about this! Please refresh the page or press “Retry”.
          </p>
        ) : (
          <>
            <p>
              It looks like something went wrong… It’s definitely not your fault
              though, don’t worry!
            </p>
            <p>
              What you can do is report it to Kitty#1909 on the{' '}
              <a
                href='https://discord.gg/stormbound'
                target='_blank'
                rel='noopener noreferrer'
              >
                Stormbound Discord
              </a>
              , along with the URL of this page and the following error:
            </p>

            <pre className='Error__pre'>{props.error}</pre>
          </>
        )}

        {props.retry && <CTA onClick={props.retry}>Retry</CTA>}
      </div>

      <PageMeta
        title='Error'
        description='An error occurred, sorry about this!'
        noIndex
      />
    </>
  )
})
