import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect, useRef} from 'react'
import { store } from '../../features/redux/store'
import {  useDispatch } from 'react-redux'
import { setAgeCategory } from '../../features/redux/userSlice';
import { Entypo } from '@expo/vector-icons'; 
import { useTranslation } from 'react-i18next';
 


const Category = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const user = store.getState().user
    const [ageCategory, setMyAgeCategory] = useState(user.age_category)
    const categories = [

         {
          "animation": null,
          "id": 2,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/1.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/praying-beads2.png",
          "user_language": t('namespace.rememberenceOfAllah'),
        },
         {
          "animation": null,
          "id": 3,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/sleep2.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/sleep2.png",
          "user_language": t('namespace.sleepAndWakingUp'),
        },
         {
          "animation": null,
          "id": 4,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Dressing_Up.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/wearing-comfortable-clothes2.png",
          "user_language": t('namespace.dressing'),
        },
         {
          "animation": null,
          "id": 5,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Going_to_Toilet_32_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/toilet2.png",
          "user_language": t('namespace.toilet'),
        },
         {
          "animation": null,
          "id": 6,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Dua_after_Wudu_1_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/washing-hands2.png",
          "user_language": t('namespace.wudu'),
        },
         {
          "animation": null,
          "id": 7,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Coming_out_of__the_House_24_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/entry2.png",
          "user_language": t('namespace.inAndOutOfHouse'),
        },
         {
          "animation": null,
          "id": 8,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Adhan_1_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/adhan2.png",
          "user_language": t('namespace.masjidAndAzan'),
        },
         {
          "animation": null,
          "id": 9,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Dua_in_Ruku_8_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/free2.png",
          "user_language": t('namespace.salah'),
        },
         {
          "animation": null,
          "id": 10,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Ending_Prayer_13_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/praying2.png",
          "user_language": t('namespace.zikrAfterSalah'),
        },
         {
          "animation": null,
          "id": 11,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Morning_and_Evening_Adkar_50_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/a-man-praying2.png",
          "user_language": t('namespace.morningAndEveningAdkar'),
        },
         {
          "animation": null,
          "id": 12,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Eating_at_someones_place_12.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/eating-noodles2.png",
          "user_language": t('namespace.eating'),
        },
         {
          "animation": null,
          "id": 13,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/At_the_start_of_Travelling_15_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/traveling2.png",
          "user_language": t('namespace.traveling'),
        },
         {
          "animation": null,
          "id": 14,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Dua_on_Shaking_hands_10_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/greeting2.png",
          "user_language": t('namespace.meetingAndGreeting'),
        },
         {
          "animation": null,
          "id": 15,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Dua_for_Studying_5_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/knowledge2.png",
          "user_language": t('namespace.forKnowledge'),
        },
         {
          "animation": null,
          "id": 16,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Experience_doubt_in_faith_20_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/emotions-cycle2.png",
          "user_language": t('namespace.emotions'),
        },
         {
          "animation": null,
          "id": 17,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/For_someone_who_treated_well_27_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/greeting33.png",
          "user_language": t('namespace.thanking'),
        },
         {
          "animation": null,
          "id": 18,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/More_Dua_on_sneezing_49_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/sneezing2.png",
          "user_language": t('namespace.sneezing'),
        },
         {
          "animation": null,
          "id": 19,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Losing_something_or_someone_46_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/sadness2.png",
          "user_language": t('namespace.worrying'),
        },
         {
          "animation": null,
          "id": 20,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Raining_62_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/raining2.png",
          "user_language": t('namespace.naturalEvents'),
        },
         {
          "animation": null,
          "id": 21,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/When_Ill_or_in_Pain_in_body_93_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/pain2.png",
          "user_language": t('namespace.pain'),
        },
         {
          "animation": null,
          "id": 22,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Protection_from_ill_manner_57_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/manners-of-courtesy2.png",
          "user_language": t('namespace.manners'),
        },
         {
          "animation": null,
          "id": 23,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Protection_and_Comfort_55_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/comfort2.png",
          "user_language": t('namespace.protectionAndComfort'),
        },
         {
          "animation": null,
          "id": 24,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Breaking_fast_22_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/fasting-time2.png",
          "user_language": t('namespace.fasting'),
        },
         {
          "animation": null,
          "id": 25,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/When_Ill_or_in_Pain_in_body_93_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/illness2.png",
          "user_language": t('namespace.illness'),
        },
         {
          "animation": null,
          "id": 26,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Repentance_65_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/muslim-prayer2.png",
          "user_language": t('namespace.repentance'),
        },
         {
          "animation": null,
          "id": 27,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Seeing_someone_in__trouble_69_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/difficulty2.png",
          "user_language": t('namespace.difficulty'),
        },
         {
          "animation": null,
          "id": 28,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Slaughtering_Animal_72_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/book2.png",
          "user_language": t('namespace.general'),
        },
         {
          "animation": "https://duaapp-bucket.s3.amazonaws.com/image/Pre-dawn_meal_1.json",
          "id": 29,
          "image": "https://duaapp-bucket.s3.amazonaws.com/images/Very_young__Boy_s__Funeral_prayer_85_11zon.png",
          "logo": "https://duaapp-bucket.s3.amazonaws.com/images/funeral2.png",
          "user_language": t('namespace.funeralAndDeath'),
        },
      ]
 
  
 
     
   
      
 
  return (

    <View   className = "h-96" >
        <View  className = "flex-row justify-between">
        <TouchableOpacity onPress={()=>{setMyAgeCategory('littleKids'); dispatch(setAgeCategory({age_category:'littleKids'}))}}
        className = {ageCategory=="littleKids"? "p-2 bg-brightOrange  px-7 rounded-lg":"p-2 bg-lightGray  px-7 rounded-lg"}>
        <Text className = {ageCategory=='littleKids'?"font-bold text-xs text-white":"font-bold text-xs "}>
        {t('namespace.littleKids')}
          </Text>
          </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{setMyAgeCategory('olderKids');  dispatch(setAgeCategory({age_category:'olderKids'}))}}
        className = {ageCategory=="olderKids"? "p-2 bg-brightOrange  px-7 rounded-lg":"p-2 bg-lightGray  px-7 rounded-lg"}>
          <Text className = {ageCategory=='olderKids'?"font-bold text-xs text-white":"font-bold text-xs "}>
          {t('namespace.olderKids')}
            </Text>
            </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setMyAgeCategory('grownUps'); dispatch(setAgeCategory({age_category:'grownUps'}))}}
        className = {ageCategory=="grownUps"? "p-2 bg-brightOrange  px-7 rounded-lg":"p-2 bg-lightGray  px-7 rounded-lg"}>
          <Text className = {ageCategory=='grownUps'?"font-bold text-xs text-white":"font-bold text-xs "}>
          {t('namespace.grownUp')}
            </Text>
            </TouchableOpacity>
        </View>
        <View className = "flex-row ">

  <FlatList
    data={categories}
    numColumns = {3}
    showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}

    
    renderItem = {({item, index})=>(
        <TouchableOpacity onPress={()=>{user.premium==false&&item.id>4?navigation.navigate('Premium') :
        navigation.navigate('DuaList',{title:item.user_language,
          id: item.id,
          ageCategory: ageCategory,
        }) }}  key={index} className = "justify-center  h-28 w-28 bg-lightGray m-2 rounded-2xl items-center space-y-3 relative">
            <Image  source={{uri: item.logo}} className = "h-10 w-10"></Image>
            <Text className = "text-xs text-center">{item.user_language}</Text>
            {item.id>4&&user.premium==false?
            <View className = "absolute bg-red-500 bg-opacity-25 h-full w-full rounded-2xl items-center justify-center" style={{
              backgroundColor: 'rgba(52, 52, 52, 0.5)'
              }}>
                <View className ="p-1 bg-white rounded-full">
<Entypo name="lock" size={24} color="black" />
</View>
              </View>:<></>}
            

        </TouchableOpacity>
       )}
        
  />
 
       

 
      
       </View>
      
    </View>
  )
}

export default Category