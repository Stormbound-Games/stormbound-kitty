import React from 'react'
import serialize from 'form-serialize'
import CTA from '../CTA'
import Notice from '../Notice'
import './index.css'

const TOURNAMENT_ID = 'test-pending'

const getFormData = form => {
  const formData = serialize(form, { hash: true })
  const body = new FormData()
  body.append('name', formData.name)
  body.append('stormbound-id', formData['stormbound-id'])
  body.append('discord-id', formData['discord-id'])
  return body
}

export default React.memo(function TornadoSignup(props) {
  const [status, setStatus] = React.useState('PRISTINE')
  const [error, setError] = React.useState(null)

  const onSubmit = async event => {
    event.preventDefault()

    const form = event.target
    const body = getFormData(form)
    const url = form.getAttribute('action')
    const method = form.getAttribute('method')
    const response = await window.fetch(url, { method, body })

    if (!response.ok) {
      setStatus('FAILURE')
      setError(
        'There was something wrong with the information you provided. Please contact Stratadox on Discord.'
      )
    } else {
      setStatus('SUCCESS')
    }
  }

  if (status === 'SUCCESS') {
    return (
      <Notice icon='trophy'>
        You are successfully registered for the Tornado tournament. You will
        receive more information on Discord when the tournament officially
        starts.
      </Notice>
    )
  }

  return (
    <form
      action={`http://tornado.stratadox.com/submit/${TOURNAMENT_ID}`}
      method='POST'
      onSubmit={onSubmit}
    >
      <div className='TornadoSignup__field'>
        <label htmlFor='name'>Your name</label>
        <input
          type='text'
          id='name'
          name='name'
          required
          placeholder='E.g. Name'
          aria-describedby='signup-errors'
          aria-invalid={Boolean(error)}
        />
      </div>

      <div className='TornadoSignup__field'>
        <label htmlFor='tag'>Your Discord tag</label>
        <input
          type='text'
          id='discord-id'
          name='discord-id'
          required
          pattern='[a-z_]+#[0-9]{4}'
          placeholder='E.g. name#1234'
          aria-describedby='signup-errors'
          aria-invalid={Boolean(error)}
        />
      </div>

      <div className='TornadoSignup__field'>
        <label htmlFor='id'>Your Stormbound ID</label>
        <input
          type='text'
          id='stormbound-id'
          name='stormbound-id'
          required
          pattern='[0-9]{10}'
          placeholder='E.g. 1234567890'
          aria-describedby='signup-errors'
          aria-invalid={Boolean(error)}
        />
      </div>

      <div id='signup-errors'>{error}</div>

      <div className='TornadoSignup__field'>
        <CTA type='submit'>Sign up</CTA>
      </div>
    </form>
  )
})
