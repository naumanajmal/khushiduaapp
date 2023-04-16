import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { FlatList } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import AudioPlayer from './AudioPlayer';
import { store } from '../../../features/redux/store';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';
import { setCoinsModalTrue } from '../../../features/redux/userSlice';

const Sentences = ({ sentenceData}) => {
  const audioData = sentenceData[0]["sentences"]
  const remount = useRef(1);
  const user = store.getState().user
  const dispatch = useDispatch()



  const whichArabicAudio = ()=>{
 
    if (user.age_category=="littleKids"){
      return audioData.map(item => item.teacherChildArabicAudio)
    }
    if (user.age_category=="olderKids"){
      return  audioData.map(item => item.childArabicAudio)
    }
  
    if (user.age_category=="grownUps"){
      return  audioData.map(item => item.arabicAudio)
    }
    
  }



  const whichUserLanguageAudio = () =>{
    if (user.language=="urdu"){
      return audioData.map(item => item.urduAudio)
    } else{
      return  audioData.map(item => item.englishAudio)
    }
     
  }

  const [userLanguageAudio, setUserLanguageAudio] = useState(whichUserLanguageAudio())
  const [arabicData, setArabicData] = useState(whichArabicAudio())
  const [playingData, setPlayingData] = useState(arabicData)
 


//on age category arabic audio

 

//on user language audio

  const [playAudioOnMount, setPlayAudioOnMount] = useState(false)
 



  const handleNewAudioDataArabic = (received_item) =>{
    var arr2 = [];
    var arr1 = arabicData.slice();
    var given_item = ""
    if (user.age_category=='littleKids'){
      given_item = received_item.teacherChildArabicAudio
      }
  
    if (user.age_category=='grownUps'){
      given_item = received_item.arabicAudio
    }
    if (user.age_category=='olderKids'){
      given_item = received_item.childArabicAudio
    }
    var index_of_given =  arr1.indexOf(given_item)
    var selectedElement = arr1[index_of_given]; 
    arr2.push(selectedElement);
  
  arr1.splice(index_of_given, 1);
  arr2.push(...arr1);
  setPlayingData(arr2) 
  }


  const handleNewAudioDataTranslation = (received_item) =>{
    var arr2 = [];
    var arr1 = userLanguageAudio.slice();
    
    var arr3 = []
    var given_item = ""
    if (user.language=='urdu'){
      given_item =  received_item.arabicAudio
    }
   else {
    given_item =  received_item.englishAudio
    }
    var index_of_given =  arr1.indexOf(given_item)
    var selectedElement = arr1[index_of_given]; 
    arr2.push(selectedElement);
  
  arr1.splice(index_of_given, 1);
  arr2.push(...arr1);
 
  setPlayingData(arr2) 
  
  }
 useEffect(()=>{},[user.showModal])


    const language = store.getState().user.language
  
  return (
    <ImageBackground source={{ uri: sentenceData[0]["dua"].image }} blurRadius={5} className = " h-full w-full mt-4 bg-opacity-50">
      <FlatList
    data={sentenceData[0]["sentences"]}
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
        }}  key={index} className = " w-70   m-2 rounded-2xl  space-y-6 p-4 mx-4">
           <View className = "flex-row space-x-2 justify-between items-center">
            <View className = "flex-row justify-center items-center space-x-2">
            <TouchableOpacity className = "" onPress={()=>{handleNewAudioDataArabic(item);setPlayAudioOnMount(true); remount.current = remount.current+1; }}>
            <AntDesign name="play" size={30} color="#193687" />
   
            </TouchableOpacity>
            <View className = "w-0.5 bg-darkBlue h-6"></View>

            <Text className = "text-brightOrange text-sm">Arabic</Text>
            </View>
            <Text className = "text-darkBlue text-md   w-60 ">{item.arabicText}</Text>
            </View>
            <View className = "bg-lightGray h-px   "></View>
            <View className = "flex-row space-x-2 justify-between items-center">

            <View className = "p-1 bg-brightOrange rounded-md ">
            <Text className = "text-white text-xs">Transliteration</Text>
            </View>
            <Text className = "text-darkBlue text-md  w-60">{item.tranlitration}</Text>
            </View>
             <View className = "bg-lightGray h-px"></View>
            <View className = "flex-row space-x-2 justify-between items-center">
            <View className = "flex-row justify-center items-center space-x-2">
            <TouchableOpacity className = ""  onPress={()=>{handleNewAudioDataTranslation(item);  setPlayAudioOnMount(true);remount.current = remount.current+1;}}>
            <AntDesign name="play" size={30} color="#193687" />
            </TouchableOpacity>
            <View className = "w-0.5 bg-darkBlue h-6"></View>

            <Text className = "text-brightOrange text-sm  ">{language.charAt(0).toUpperCase() + language.slice(1)}</Text>
            </View>
            <Text className = "text-darkBlue text-md  w-60">{item.user_language}</Text>
            </View>
             

             
        </View>
       )}
        
  />
  <View className = "h-64 w-full pt-3"><AudioPlayer prop = {playingData} shouldPlayOnMount  = {playAudioOnMount}  key = {remount.current}/></View>
  
  
 
    </ImageBackground>
  )
}

export default Sentences