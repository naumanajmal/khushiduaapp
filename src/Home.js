import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import ActivityIndicator from './components/ActivityIndicator';
import Category from './components/Category';
import Awards from './components/Awards';
import { store } from '../features/redux/store';
import React, {useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import '../locals/index';

const Home = ({route, navigation}) => {
  const {t} = useTranslation();
  const {activityData} = route.params;
  const user = store.getState().user
  const [isFocused, setIsFocused] = React.useState(false);

  function handleHomeScreenMount() {
    // Replace the splash screen with the home screen in the navigation stack
    navigation.dispatch(StackActions.replace('Home', {activityData:activityData}));
  }

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );


  useEffect(() => {
 
    if (isFocused) {
      console.log("in home page")
    }
  }, [isFocused]);
  return (
    <ImageBackground >
    <SafeAreaView className = "pt-6">
        <View className = " p-4 ">
        <View className = "flex-row items-center justify-between">
          {user.premium==true?<View></View>: <TouchableOpacity onPress={()=>{navigation.navigate("Premium")}}>
            <View className = "flex-row justify-center items-center space-x-2">
            <FontAwesome name="diamond" size={30} color="#193687" />
            <Text className = "font-bold text-sm font-poppins">{t(`namespace.upgradePremium`)}</Text>
            <FontAwesome name="angle-right" size={15} color="black" />
            </View>
            </TouchableOpacity>}
            <TouchableOpacity onPress={()=>{user.isLoggedIn==true?navigation.navigate("Profile"):navigation.navigate("Register")}} >
            <Ionicons name="settings-outline" size={25} color="#193687" />
            </TouchableOpacity>
        </View>
        <View className = "mb-2">          
 <ActivityIndicator todayActivity = {activityData.todayActivityCount}/>
        </View>
        <Category/>
        <Awards completeActivity = {activityData.num_days_with_more_than_5_sentences}/>
        </View>
    </SafeAreaView>
    </ImageBackground>
  )
}

export default Home