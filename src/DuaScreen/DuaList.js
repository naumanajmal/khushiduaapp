import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useLayoutEffect}from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDuaAndSentencByCategoryIdMutation } from '../../services/dataApi';
import { store } from '../../features/redux/store';
// import Lottie from 'lottie-react-native';
const DuaList = ({ route, navigation }) => {
 
  const user = store.getState().user
  const [dataReceived, setDataReceived] = useState(false);
  const [sentenceApi] = useDuaAndSentencByCategoryIdMutation()
  const [duaAndSentenceData, SetDuaAndSentenceData] = useState([]);
  const [userLanguages, setUserLanguage] = useState()
  const { id  } = route.params;
  const DuaAndSentenceCall = async()=>{
    console.log(user.language)
    const response = await sentenceApi({'category_id':id, 'user_language':user.language, 'age_category':user.age_category})
    console.log(response)
    SetDuaAndSentenceData(response["data"])
    setDataReceived(true)
  
    setUserLanguage(response.data.map(item => {
      return { 
        dua_id: item.dua.id,
        user_language: item.dua.user_language 
      };
    }))
 }

 useLayoutEffect(()=>{
  navigation.setOptions({
      title:route.params.title
  })
},[]);
     

     
    useEffect(() => {
      DuaAndSentenceCall()
    },[])

  return (
    <>
    {dataReceived==true?
      <View className = " bg-white h-full">
      <FlatList
   data={userLanguages}
   showsVerticalScrollIndicator={false}
 showsHorizontalScrollIndicator={false}
   renderItem = {({item, index})=>(
       <View>
       <TouchableOpacity onPress={()=>{navigation.navigate('DuaIllustration', {data:duaAndSentenceData, duaId:item.dua_id, title:item.user_language });   }} 
       key={index} className = "m-4 flex-row justify-between">
           <Text>{item.user_language}</Text>
           <FontAwesome name="angle-right" size={20} color="black" />
       </TouchableOpacity>
       <View className = "h-px bg-lightGray"></View>
       </View>
      )}
       
 />
   </View>:
   <>
   <View style = {{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 
    backgroundColor: '#ecf0f1',
  }}>
 <ActivityIndicator size="large" color="#243763" />
{/*
 
   <Lottie source={{uri:'https://duaapp-bucket.s3.amazonaws.com/image/Pre-dawn_meal_1.json'}} autoPlay loop /> */}
   </View>
   </>
    }

</>
  )
}

export default DuaList