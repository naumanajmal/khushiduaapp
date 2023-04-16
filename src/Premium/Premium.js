import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Premium = () => {
  const navigation = useNavigation()
 
  return (
    <View  className = "h-full flex-end bg-white">

                  <View style={{backgroundColor:  'white' }} className = "h-full justify-center items-center p-8">
                    <View className = "h-full justify-center items-center space-y-6">
                    <Image source = {require('../../assets/quran.png')}></Image>
                    <View className = "space-y-5">
                    <TouchableOpacity onPress={()=>{navigation.navigate("CheckOut")}} className = "bg-darkBlue px-16 py-3 rounded-lg items-center flex-row justify-between">
 <Text className = "text-white text-lg font-bold"> Premium Purchase</Text>
 <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                        <View className = "flex-row space-x-4">
                        <FontAwesome name="check-square-o" size={24} color="black" />
                            <Text className = "text-black text-center text-md">Your purchase will help us to fund projects of Quran and Hadith and books of Children</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("CheckOut")}} className = "bg-lightGreen px-12  py-3 rounded-lg items-center flex-row justify-between">
 <Text className = "text-white text-lg font-bold"> Gift to Friends And Family</Text>
 <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    </View>
                  </View>
    </View>
  )
}

export default Premium