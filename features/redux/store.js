import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/userSlice'
import { userAuthApi } from '../../services/dataApi'
import categorySlice from './categorySlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    category:categorySlice,
    

    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware().concat(userAuthApi.middleware),
})