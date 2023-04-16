import { View, Text, Image } from 'react-native'
import React from 'react'

const CoinsPage = ({coins}) => {
  console.log(coins)
  return (
    <View className = " w-full p-4 my-2 rounded-lg">
        <View className = "px-2 py-1">
        <Text className = "font-bold text-lg ">Coins</Text>
        </View>
      
      <View className = "bg-lightGray p-4 rounded-lg flex-row justify-between items-center">
       <Text>You earned Total</Text>
       <View className = "flex-row items-center space-x-4">
        <Text className = "text-xl font-bold">{coins}</Text>
        <Image source={require('../../../assets/icons/coin.png')}  className = "h-8 w-8 "></Image>
       </View>
      </View>
    </View>
  )
}

export default CoinsPage