import { View, Text } from 'react-native'
import { FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

const Benefits = ({ benefitData}) => {
 
  const filteredData = benefitData[0]["benefits"].filter((item, index, self) =>
  index === self.findIndex((t) => t.id === item.id)
);
 
 return (
   <ImageBackground source={{ uri: benefitData[0]["dua"].image }} className = "h-full w-full mt-4 " blurRadius={5}>
     <FlatList
   data={filteredData}
   showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}

   
   renderItem = {({item, index})=>(
       <View elevation={5}
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
       }}  key={index} className = "w-70 bg-red-600 m-4 rounded-2xl  space-y-6 p-4   justify-center mx-4">
 <Text className = "text-darkBrown text-center font-bold">{item.arabicText}</Text>
 <View className = "h-px w-30 bg-lightGray"></View>
 <Text className = "text-darkBlue text-center font-bold">{item.user_language}</Text>    
       </View>
      )}
       
 />
   </ImageBackground>
 )
}

export default Benefits