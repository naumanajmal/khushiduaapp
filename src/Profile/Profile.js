import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useEffect, useState, useLayoutEffect} from 'react'
import { Fontisto } from '@expo/vector-icons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../services/asyncStorage';
import { setSignOut } from '../../features/redux/userSlice';
import { store } from '../../features/redux/store';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const Profile = () => {
    const {t, i18n} = useTranslation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: t('namespace.profile')
        })
      },[]);
    const user = store.getState().user
    const [isFocused, setIsFocused] = React.useState(false);
    console.log(user)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const logoutfun = async()=>{
        await removeToken();
        dispatch(setSignOut())
navigation.navigate('Home', {activityData: {"num_days_with_more_than_5_sentences":0, "todayActivityCount":0}})
    }

    useFocusEffect(
        React.useCallback(() => {
          setIsFocused(true);
    
          // Clean up the effect when the component unmounts or loses focus
          return () => setIsFocused(false);
        }, [])
      );



      useEffect(() => {
        if (isFocused) {
          console.log("in profile page")
        }
      }, [isFocused]);
  return (
    <ImageBackground className = "h-full " source = {require('../../assets/flower-bg.png')}>
    <View className = " h-full p-6 space-y-6">
        <View className="flex-row space-x-8 ">
        <View className = "bg-lightGray rounded-full h-20 w-20 justify-center items-center ">
        <AntDesign name="user" size={45} color="black" />
        </View>
        <View className = "space-y-2 flex-column justify-center">
            <Text className = " text-2xl text-darkBlue 	text-transform: capitalize">{user.name}</Text>
            <Text className = "text-sm text-black opacity-50">{user.email}</Text>
        </View>

        </View>

        {/* account */}

        <View className = "justify-between space-y-4">
            <Text className = "text-darkBlue text-lg ">{t('namespace.account')}</Text>
            <TouchableOpacity className= "flex-row items-center space-x-6 px-2" onPress={()=>{navigation.navigate("Profile Settings")}}>
            <View className = "w-8">
            <AntDesign name="user" size={25} color="#AD8E70" /> 
            </View>
            <Text className = "text-md">{t('namespace.profileSettings')}</Text>
            </TouchableOpacity>
        </View>

        {/* Language */}

        <View className = "justify-between space-y-4">
            <Text className = "text-darkBlue text-lg ">{t('namespace.languages')}</Text>
            <TouchableOpacity className= "flex-row items-center space-x-6 px-2 justify-between" onPress={()=>{navigation.navigate("Language")}}>
                <View className = "flex-row items-center space-x-6  ">
                    <View className = "w-8">
                <Fontisto name="world-o" size={24} color="#AD8E70"  />
                </View>
            <Text className = "text-md">English (UK)</Text>
            </View>
            <AntDesign name="down" size={12} color="black" />
            </TouchableOpacity>
        </View>

         {/* premium */}

         <View className = "justify-between space-y-4">
            <Text className = "text-darkBlue text-lg ">{t('namespace.premium')}</Text>
            <TouchableOpacity className= "flex-row items-center space-x-6 px-2" onPress={()=>{navigation.navigate("Premium")}}>
            <View className = "w-8">
            <FontAwesome  name="diamond" size={24} color="#AD8E70" />
            </View>
            <Text className = "text-md">{t('namespace.upgradePremium')}</Text>
            </TouchableOpacity>
        </View>

         {/* about */}

         <View className = "justify-between space-y-4">
            <Text className = "text-darkBlue text-lg ">{t('namespace.about')}</Text>
            <View className = "space-y-6">

            <TouchableOpacity className= "flex-row items-center space-x-6 px-2">
            <View className = "w-8">
            <AntDesign name="sharealt" size={24} color="#AD8E70" />
            </View>
            <Text className = "text-md">{t('namespace.shareToFriends')}</Text>
            </TouchableOpacity>



            <TouchableOpacity className= "flex-row items-center justify-between  px-2">
                <View className = " flex-row items-center space-x-6">
            <View className = "w-8">
            <AntDesign name="staro" size={24} color="#AD8E70" />
                </View>
            <Text className = "text-md">{t('namespace.rateUs')}</Text>
            </View>
            <FontAwesome name="angle-right" size={15} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className= "flex-row items-center justify-between  px-2" onPress={()=>{navigation.navigate("Suggestion")}}>
                <View className = " flex-row items-center space-x-6">
            <View className = "w-8">
            <AntDesign name="message1" size={24} color="#AD8E70" />
                </View>
            <Text className = "text-md">{t('namespace.suggestNewFeatures')}</Text>
            </View>
            <FontAwesome name="angle-right" size={15} color="black" />
            </TouchableOpacity>



            {/* <TouchableOpacity className= "flex-row items-center justify-between  px-2">
                <View className = " flex-row items-center space-x-6">
            <View className = "w-8">
            <MaterialCommunityIcons
                  name="shield-lock-outline"
                  size={30}
                  color="#AD8E70"
                />
                </View>
            <Text className = "text-md">Privacy Policy</Text>
            </View>
            <FontAwesome name="angle-right" size={15} color="black" />
            </TouchableOpacity> */}



            <TouchableOpacity className= "flex-row items-center space-x-6 px-2">
                <View className = "w-8">
            <Octicons name="versions" size={30} color="#AD8E70" />
            </View>
            <Text className = "text-md">{t('namespace.version')}</Text>
            </TouchableOpacity>


            <TouchableOpacity className= "flex-row items-center space-x-6 px-2" onPress={ ()=>{logoutfun()}}>
                <View className = "w-8">
            <AntDesign name="logout" size={24} color="#AD8E70" />
            </View>
            <Text className = "text-md">{t('namespace.logout')}</Text>
            </TouchableOpacity>
            
            </View>
        </View>
        
    </View>
    </ImageBackground>
  )
}

export default Profile