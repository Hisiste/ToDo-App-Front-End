import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className='btn btn-outline-primary'
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className='btn btn-outline-primary'
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
