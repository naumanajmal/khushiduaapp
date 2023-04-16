import { View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { store } from '../../features/redux/store';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

 
const ProfileSettings = () => {
  const {t, i18n} = useTranslation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: t('namespace.profileSettings')
        })
      },[]);
  const user = store.getState().user
  const [isFocused, setIsFocused] = React.useState(false);
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);

      // Clean up the effect when the component unmounts or loses focus
      return () => setIsFocused(false);
    }, [])
  );



  useEffect(() => {
    if (isFocused) {
      console.log("in profile setting  page")
    }
  }, [isFocused]);
  return (
    <ImageBackground className = "bg-white h-full   space-y-8 justify-between " source={require('../../assets/flower-bg.png')}>
        <View className = "p-8  space-y-40 ">
        <View className = "space-y-8">
      <View className = "items-center space-y-3">
      <View className = "bg-lightGray rounded-full h-24 w-24 justify-center items-center ">
        <AntDesign name="user" size={60} color="black" />
        </View>
        <Text className = "text-darkBlue text-2xl text-transform: capitalize">{user.name}</Text>
        <Text className = "text-black opacity-50 tex-md ">{user.email}</Text>
      </View>
      <View className = "space-y-4">
<View className = "h-px bg-lightGray "></View>
<TouchableOpacity className = "px-4 flex-row justify-between items-center" onPress={()=>{navigation.navigate("New Password")}}>
  <Text>{t('namespace.changeYourPassword')}</Text>
  <FontAwesome name="angle-right" size={20} color="black" />
</TouchableOpacity>
<View className = "h-px bg-lightGray "></View>
<TouchableOpacity className = "px-4 flex-row justify-between items-center" onPress={()=>{navigation.navigate("New Name")}} >
  <Text>{t('namespace.changeYourName')}</Text>
  <FontAwesome name="angle-right" size={20} color="black" />
</TouchableOpacity>
<View className = "h-px bg-lightGray "></View>
      </View>
      </View>
      </View>  
    </ImageBackground>
  )
}

export default ProfileSettings



{/* <TouchableOpacity className = "bg-brightOrange px-36 py-4 rounded-xl" >
<Text className = "text-white font-bold text-sm">Update</Text>
</TouchableOpacity> */}

