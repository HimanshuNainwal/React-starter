import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Slice/counterSlice'
import userSlice from './Slice/userSlice'

export default configureStore({
  reducer: {
    counter:counterSlice,
    user:userSlice
  }
})