import { View, Text} from 'react-native'
import React, {useLayoutEffect} from 'react'
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

const AwardsPage = ({route, navigation}) => {
  const {t, i18n} = useTranslation();
  useLayoutEffect(()=>{
    navigation.setOptions({
        title: t('namespace.awards')
    })
  },[]);
  return (
    <View className = " h-full p-4 justify-around ">
      <View className = "h-3/4 p-4 ">
      <Lottie source={route.params.animation} autoPlay loop />
      </View>
      <View className = "text-center justify-center">
      <Text className = "text-center text-lg">{t('namespace.learned')}</Text>
      <Text className = "text-center text-md text-bold">{route.params.statement}</Text>
      </View>
    </View>
  )
}

export default AwardsPage