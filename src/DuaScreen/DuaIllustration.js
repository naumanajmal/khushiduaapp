import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { useLayoutEffect, useEffect, useState } from 'react';
 
import React from 'react'

const DuaIllustration = ({ route, navigation }) => {
    const [active, setActive] = useState(false)
 

    const { data, duaId  } = route.params;
    const sentenceData = data.filter(item => item["dua"]["id"] === duaId)
 
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params.title
        })
    },[]);

   
  return (
    <ImageBackground source={{ uri: sentenceData[0]["dua"].image }}  className = "h-full justify-center items-center">
        <View></View>
        <TouchableOpacity onPress = {()=>{navigation.navigate('Dua', {sentenceData:sentenceData})}} className = "bg-darkBlue mt-auto px-16 py-2 rounded-lg mb-6">
            <Text className = "text-white font-bold text-2xl">Go To Dua</Text>
        </TouchableOpacity>
    </ImageBackground>
  )
}

export default DuaIllustration