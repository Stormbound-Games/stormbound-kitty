import React from 'react'
import Column from '../Column'
import Row from '../Row'

export default React.memo(function BrawlCalculatorDiscount(props) {
  return (
    <>
      <Row>
        <Column>
          <label htmlFor='discount'>Cost Discount (%)</label>
          <input
            id='discount'
            name='discount'
            type='number'
            value={props.discount}
            onChange={event => props.setDiscount(+event.target.value)}
            min={0}
            max={100}
            placeholder='e.g. 50'
            onBlur={event => {
              if (+event.target.value < 0) props.setDiscount(0)
              if (+event.target.value > 100) props.setDiscount(100)
            }}
          />
        </Column>
        <Column />
      </Row>
    </>
  )
})
