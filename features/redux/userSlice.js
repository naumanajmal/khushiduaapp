import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  name:'',
  isLoggedIn: false,
  email: null,
  language:'',
  age_category:'littleKids',
  premium:false,

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      
      state.isLoggedIn = true;
    },
    setLanguage: (state, action) => {
      
      state.language = action.payload;
    },
    setAgeCategory: (state, action) => {
      state.age_category = action.payload.age_category;
    },
    setSignOut: state => {
      state.isLoggedIn = false;
    },
    setLocationTime: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.time = action.payload.time;
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.date = action.payload.date;

    },
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.language = action.payload.language;
      state.premium = action.payload.premium;

    },
    setUserName: (state, action) => {
      state.name = action.payload.name;

    },
    setCoinsModalTrue: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSignIn, setSignOut, setLanguage, setAgeCategory,setUserName, setLocationTime, setCoinsModalTrue, setUserInfo} = userSlice.actions;

// export const selectIsLoggedIn = state => state.userSlice.isLoggedIn;
// export const selectEmail = state => state.userSlice.email;
// export const selectPassword = state => state.userSlice.password;

export default userSlice.reducer;