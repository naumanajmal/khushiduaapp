import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
 
import { useNavigation } from '@react-navigation/native';
import { getLanguage } from '../../services/asyncStorage';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../features/redux/userSlice';
import { store } from '../../features/redux/store';
import { getToken } from '../../services/asyncStorage';
import { setSignIn } from '../../features/redux/userSlice';
import { useDailyActivityMutation } from '../../services/dataApi';
import { useUserInformationMutation } from '../../services/dataApi';
import { setUserInfo } from '../../features/redux/userSlice';



const Splash = () => {
    const isLoggedIn = store.getState().user.isLoggedIn
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [dailyActivityApi] = useDailyActivityMutation()
    const [userInformationApi] = useUserInformationMutation()
    const categoryListCall = async(date)=>{
      var lang =  await getLanguage()
      var tok = await getToken()
      if(tok!=undefined){
        dispatch(setSignIn())
        const userInfo = await userInformationApi({token:tok.access})
        dispatch(setUserInfo({email:userInfo.data[0].email,
           premium:userInfo.data[0].has_purchased,
           name:userInfo.data[0].name,
          }))
        const dailyActivityData = await dailyActivityApi({"token":tok.access, "todayDate":date})
        dispatch(setLanguage(lang))
        navigation.navigate('Home', {activityData:dailyActivityData.data})
      }else{
        if (lang!=''){
           dispatch(setLanguage(lang))
           navigation.navigate('Home', {activityData:{"num_days_with_more_than_5_sentences":0, "todayActivityCount":0}})    
        } else{
            navigation.navigate('Language')
        }
      }
     
     }
    useEffect(() => {
        setTimeout(() => {
          let today = new Date();
          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          categoryListCall(date)
         }, 3000)
      }, []);
  return (
    <ImageBackground source={require("../../assets/splash2.png")} className = "h-full w-full" >
    </ImageBackground>
  )
}

export default Splash