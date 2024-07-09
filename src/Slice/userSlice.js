import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
   fullName:"dsadas",
  },
  reducers: {
    increment: (state,action) => {

      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setAge: (state,action) => {
        state.age = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setAge } = userSlice.actions

export default userSlice.reducer