import { View, Text, ImageBackground, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

const PrayerTime = () => {
    const namazData = {nextNamaz:"Duhur"}
  return (
    <ImageBackground  source={require('../../assets/flower-bg.png')} className = "h-full bg-white  ">
        <View className = "p-6 pt-20 space-y-10 ">
         <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={['#193687', '#193687']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg  ">
  <View className = " flex-row  m-px rounded-lg bg-white py-2 px-4 static">
         <View className = "space-y-4">
<View className = "space-y-1">
    <Text className = "text-darkBlue text-md">Magrib Time</Text>
    <Text className = "text-lg font-bold">11:32 am</Text>
</View>
<View className = "space-y-1">
    <Text className = "text-darkBlue text-md">Remaining Time</Text>
    <Text className = "text-lg font-bold">11:32 am</Text>
</View>

</View>
<Image source={require('../../assets/namaz-position.png') } className = "absolute h-48 w-48 bottom-0   left-44"></Image>
    </View>
    </LinearGradient>


<View>
    <View>
    <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[namazData.nextNamaz=="Fajar"?'#193687':'#DADADA', namazData.nextNamaz=="Fajar"?'#193687':'#DADADA']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg ">
        <View className = "flex-row justify-between bg-white m-px rounded-lg py-3 px-5">
            <Text className = "font-bold text-md">Fajar</Text>
            <View className = "flex-row space-x-6 items-center">
                <Text className = " text-md">05:14</Text>
                <MaterialCommunityIcons name="bell-ring" size={18} color="black" />
            </View>
        </View>
        </LinearGradient>
    </View>

    <View>
    <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[namazData.nextNamaz=="Duhur"?'#193687':'#DADADA', namazData.nextNamaz=="Duhur"?'#193687':'#DADADA']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg ">
        <View className = "flex-row justify-between bg-white m-px rounded-lg py-3 px-5">
            <Text className = "font-bold text-md">Duhur</Text>
            <View className = "flex-row space-x-6 items-center">
                <Text className = " text-md">12:25</Text>
                <MaterialCommunityIcons name="bell-ring" size={18} color="black" />
            </View>
        </View>
        </LinearGradient>
    </View>

    <View>
    <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[namazData.nextNamaz=="Asr"?'#193687':'#DADADA', namazData.nextNamaz=="Asr"?'#193687':'#DADADA']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg ">
        <View className = "flex-row justify-between bg-white m-px rounded-lg py-3 px-5">
            <Text className = "font-bold text-md">Asr</Text>
            <View className = "flex-row space-x-6 items-center">
                <Text className = " text-md">15:46</Text>
                <MaterialCommunityIcons name="bell-ring" size={18} color="black" />
            </View>
        </View>
        </LinearGradient>
    </View>
    <View>
    <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[namazData.nextNamaz=="Magrib"?'#193687':'#DADADA', namazData.nextNamaz=="Magrib"?'#193687':'#DADADA']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg ">
        <View className = "flex-row justify-between bg-white m-px rounded-lg py-3 px-5">
            <Text className = "font-bold text-md">Magrib</Text>
            <View className = "flex-row space-x-6 items-center">
                <Text className = " text-md">18:18</Text>
                <MaterialCommunityIcons name="bell-ring" size={18} color="black" />
            </View>
        </View>
        </LinearGradient>
    </View>

    <View>
    <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={[namazData.nextNamaz=="Isha'a"?'#193687':'#DADADA', namazData.nextNamaz=="Isha'a"?'#193687':'#DADADA']}
                  style={{borderRadius: 5}}
                  className = "m-2 rounded-lg ">
        <View className = "flex-row justify-between bg-white m-px rounded-lg py-3 px-5">
            <Text className = "font-bold text-md">Isha'a</Text>
            <View className = "flex-row space-x-6 items-center">
                <Text className = " text-md">19:36</Text>
                <MaterialCommunityIcons name="bell-ring" size={18} color="black" />
            </View>
        </View>
        </LinearGradient>
    </View>

    </View>
    </View>
    </ImageBackground>
  )
}

export default PrayerTime