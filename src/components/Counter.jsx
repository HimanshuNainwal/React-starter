import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../Slice/counterSlice'
// import { decrement, increment } from '../Slice/counterSlice'


export default  function Counter() {
  const count = useSelector(state=>state.counter)
  const dispatch = useDispatch()



  return (
    <div>
      <div>
        <button
        className='bg-gray-900 text-white'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment   -- ---- 
        </button>
        <span>{count?.value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}