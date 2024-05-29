import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/modules/user.tsx'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
