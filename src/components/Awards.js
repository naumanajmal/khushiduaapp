import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { store } from '../../features/redux/store';
import { useTranslation } from 'react-i18next';

const Awards = ({completeActivity}) => {
  const navigation = useNavigation()
  const {t, i18n} = useTranslation();
  const awardsData = [{id:1, title:t('namespace.dailyTask'), image:require('../../assets/awards/bronze-badge.png'),
  statement:t('namespace.completedDailyTask'), total:Math.floor(completeActivity), animation:require("../../assets/animations/badgeAnmiation/bronze-badge.json")} ,
  {id:2, title:t('namespace.days3Streak'), image:require('../../assets/awards/emberal-badge.png'),
  statement:t('namespace.made3DaysStreak'),total:Math.floor(completeActivity/3), animation:require("../../assets/animations/badgeAnmiation/emerald-badge.json")},
  {id:3, title:t('namespace.days7Streak'), image:require('../../assets/awards/Gold-badge.png'), 
  statement:t('namespace.made7DaysStreak'),total:Math.floor(completeActivity/7), animation:require("../../assets/animations/badgeAnmiation/gold-badge.json")}]

  return (
    <View className = "mt-10  ">
        <View className ="justify-between items-center flex-row px-6">
            <Text className = "font-bold text-lg">{t('namespace.awards')}</Text>
            </View>
      <View className = "flex-row justify-between bg-lightGray rounded-lg p-2 px-6">
        {awardsData.map((post, i)=>{
          return (
            <TouchableOpacity key={i} className = "justify-center rounded-2xl items-center " disabled={post.total>0?false:true} onPress={()=>{  
 
               navigation.navigate('Awards', {"animation":post.animation, "statement":post.statement}) }}>
            <Image source={post.image} className = "h-28 w-20"></Image>
            <View className = "items-center">
            <Text className = "text-sm font-bold">{post.title}</Text>
            <View className = "bg-slate-500 h-4 w-5    justify-center items-center rounded-full">
            <Text className = "text-xs  text-center text-white">{Math.floor(post.total) }</Text>
            </View>
            </View>
           
        </TouchableOpacity>
          )
        })}
      
      </View>
    </View>
  )
}

export default Awards