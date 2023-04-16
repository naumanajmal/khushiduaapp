import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: [],

};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryData: (state, action) => {
      
      state.data = action.payload;
    },
   
  },
});


export const {setCategoryData} = categorySlice.actions;

// export const selectIsLoggedIn = state => state.userSlice.isLoggedIn;
// export const selectEmail = state => state.userSlice.email;
// export const selectPassword = state => state.userSlice.password;

export default categorySlice.reducer;