// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from './asyncStorage'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://khushiikids.herokuapp.com/', 
  }), 
  // http://10.0.2.2:8000/
  //https://khushiikids.herokuapp.com/
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
       return {
        url:'auth/users/',
        method:'POST',
        body:user,
        headers:{
             'Cotent-type':'application/json',
        }
       }
      }
    }),
    loginUser: builder.mutation({
        query: (user) => {
         return {
          url:'auth/jwt/create/',
          method:'POST',
          body:user,
          headers:{
               'Cotent-type':'application/json',
          }
         }
        }
      }),
      getLoggedUser: builder.mutation({
        query: (token) => {
         return {
          url:'me',
          method:'GET',
          headers:{
            'authorization':`Bearer ${token}`,
            'Cotent-type':'application/json',
          }
         }
        }
      }),
      submitCountryLanguage: builder.mutation({
        query:  (formData) => {
         return {
          url:'languagecountry/',
          method:'POST',
          body:formData,
          headers:{
            'authorization':`Bearer ${formData.token}`,
               'Cotent-type':'application/json',
          }
         }
        }
      }),
      refreshToken: builder.mutation({
        query:  (formData) => {
         return {
          url:'auth/jwt/refresh/',
          method:'POST',
          body:formData,
          headers:{
               'Cotent-type':'application/json',
          }
         }
        }
      }),

      AddFavorite: builder.mutation({
        query:  (formData) => {
         return {
          url:'addfavorite/',
          method:'POST',
          body:formData,
          headers:{
            'authorization':`Bearer ${formData.token}`,
               'Cotent-type':'application/json',
          }
         }
        }
      }),


      userFavorites: builder.mutation({
        query:  (formData) => {
         return {
          url:'userfavorites/',
          method:'POST',
          body:formData,
          headers:{
            'authorization':`Bearer ${formData.token}`,
               'Cotent-type':'application/json',
          }
         }
        }
      }),
      submitSuggestion: builder.mutation({
        query:  (formData) => {
         return {
          url:'submitsuggestion/',
          method:'POST',
          body:formData,
          headers:{
            'authorization':`Bearer ${formData.token}`,
               'Cotent-type':'application/json',
          }
         }
        }
      }),

      countrlist: builder.mutation({
        query:  () => {
         return {
          url:'countries',
          method:'GET',
         }
        }
      }),
      citieslist: builder.mutation({
        query: (formData) => {
         return {
          url:'cities/',
          method:'POST',
          body:formData,
          headers:{
               'Cotent-type':'application/json',
          }
         }
        }
      }),
      namaztime: builder.mutation({
        query:  (formData) => {
         return {
          url:'namaz_time/',
          method:'POST',
          body:formData,
         }
        }
      }),    
      prayerTimings: builder.mutation({
        query:  (formData) => {
         return {
          url:'prayerTimings/',
          method:'POST',
          body:formData,
         }
        }
      }),    
      
      categoryList: builder.mutation({
        query:  (formData) => {
         return {
          url:'category_list/',
          method:'POST',
          body:formData,
          
         }
        }
      }), 

      paymentSheet: builder.mutation({
        query:  () => {
         return {
          url:'paymentSheet/',
          method:'POST',
          body:{something:'somthing'},
          headers:{
        
               'Cotent-type':'application/json',
          }
         }
        }
      }), 

      dailyActivity: builder.mutation({
        query:  (formData) => {
         return {
          url:'totalActivity/',
          method:'POST',
          body:formData,
          headers:{
            'authorization':`Bearer ${formData.token}`,
               'Cotent-type':'application/json',
          }
         }
        }
      }), 
      sentenceListened:builder.mutation({
        query:(formData)=>{
          return{
           url:'sentenceListened/',
           method:'POST',
           body:formData,
           headers:{
            'authorization':`Bearer ${formData.token}`,
            'Content-type':'application/json',
           }
          }
        }
      }),
      setPassword:builder.mutation({
        query:(formData)=>{
          return{
           url:'auth/users/set_password/',
           method:'POST',
           body:formData,
           headers:{
            'authorization':`Bearer ${formData.token}`,
            'Content-type':'application/json',
           }
          }
        }
      }),
      listenedData:builder.mutation({
        query:(formData)=>{
          return{
            url:'listenedData/',
            method:'POST',
            body:formData,
            headers:{
              'authorization':`Bearer ${formData.token}`,
              'Content-type':'application/json',
            }
          }
        }
      }),

      updateUserName:builder.mutation({
        query:(formData)=>{
          return{
            url:'updateUserName/',
            method:'PUT',
            body:formData,
            headers:{
              'authorization':`Bearer ${formData.token}`,
              'Content-type':'application/json',
            }
          }
        }
      }),

      userInformation:builder.mutation({
        query:(formData)=>{
          return{
            url:'me/',
            method:'GET',
            headers:{
              'authorization':`Bearer ${formData.token}`,
              'Content-type':'application/json',
            }
          }
        }
      }),


      speechToText:builder.mutation({
        query:(formData)=>{
          console.log(formData)
          return{
            url:'speechToText/',
            method:'POST',
            body:formData.formData,
            headers:{
              'authorization':`Bearer ${formData.token}`,
              'Content-Type': 'audio/wav'
            }
          }
        }
      }),
      duaAndSentencByCategoryId: builder.mutation({
        query:  (formData) => {
         return {
          url:'sentenceAndDuaListByCategory/',
          method:'POST',
          body:formData,
          
         }
        }
      }),    
  }),
})

const baseQueryReAuth = async (args, api, extraOptions)=>{
let result  = await  baseQuery(args, api, extraOptions)
if (result?.error?.originalStatus===401){
  const tok = await getToken()
  const refreshResult = await  baseQuery('/refresh', api, extraOptions)
  if (refreshResult?.data){

  }
}
}
 
export const { useLoginUserMutation, useDuaAndSentencByCategoryIdMutation,useNamaztimeMutation, useCategoryListMutation,
  useGetLoggedUserMutation, useCitieslistMutation, useCountrlistMutation, useRegisterUserMutation, 
  useSubmitCountryLanguageMutation, useAddFavoriteMutation, useUserFavoritesMutation, useSubmitSuggestionMutation, 
  usePrayerTimingsMutation,useDailyActivityMutation,useSetPasswordMutation,useUpdateUserNameMutation, useUserInformationMutation, useSpeechToTextMutation,usePaymentSheetMutation , useListenedDataMutation, useSentenceListenedMutation, useRefreshTokenMutation } = userAuthApi