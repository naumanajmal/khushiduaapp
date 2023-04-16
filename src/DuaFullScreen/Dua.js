import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Sentences from './components/Sentences';
import Benefits from './components/Benefits';
const Dua = ({route}) => {
  const { sentenceData } = route.params;
    const [isDua, setDua] = useState(true)
    const [isMenu, setMenu] = useState(false)
    const [isBenefit, setBenefit] = useState(false)
    const [isLogo, setLogo] = useState(false)
    const allDuaPressed = () =>{
setDua(true)
setMenu(false)
setBenefit(false)
setLogo(false)
    }

    const benefitPressed = () =>{
        setDua(false)
        setMenu(false)
        setBenefit(true)
        setLogo(false)
            }
            const iconPressed = () =>{
                setDua(false)
                setMenu(false)
                setBenefit(false)
                setLogo(true)
                    }

    
  return (
    <SafeAreaView className = "pt-10 ">

      <ImageBackground className = "flex-row items-center justify-between px-4 ">
        {/* <View elevation={5}
            style={{
              backgroundColor: "#FFFFFF",
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 1
              },
              borderRadius: 20,
            }} className = " shadow-xl  h-10 w-10 items-center justify-center ">
      <Entypo name="menu" size={24} color="black" />
      </View> */}
      <View className = "flex-row w-full justify-around space-x-2">
      <TouchableOpacity  onPress = {allDuaPressed} className = {isDua?"bg-brightOrange   rounded-lg w-28 h-9 items-center justify-center":"bg-lightGray   rounded-lg w-28 h-9 items-center justify-center"}>
        <Text className = "text-white text-md ">All Dua's</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={benefitPressed} className = {isBenefit?"bg-brightOrange   rounded-lg w-28 h-9 items-center justify-center":"bg-lightGray   rounded-lg w-28 h-9 items-center justify-center"}  >
        <Text className = "text-white text-md ">Benefit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={iconPressed} elevation={5}
            style={{
              backgroundColor: "#FFFFFF",
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 1,
                width: 1
              },
              borderRadius: 20,
            }} className = " rounded-full h-10 w-10 items-center justify-center   shadow-md">
        <Image source = {require('../../assets/icons/wakeup.png')} className = "h-7 w-7"></Image>
      </TouchableOpacity> */}
      </View>
     
      
      </ImageBackground>
 
 {isDua?<Sentences sentenceData = {sentenceData}></Sentences>:<></>}
 {isBenefit?<Benefits benefitData = {sentenceData}></Benefits>:<></>}
 {/* {isLogo?<Image source={{ uri: sentenceData[0]["dua"].image }} className = "h-full w-full mt-4"></Image>:<></>} */}

    </SafeAreaView>
  )
}

export default Dua