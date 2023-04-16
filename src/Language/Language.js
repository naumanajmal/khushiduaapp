import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'
import React from 'react'
import CountryFlag from "react-native-country-flag";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import { setLanguage } from '../../features/redux/userSlice'
import { storeLanguage } from '../../services/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import { getLanguage } from '../../services/asyncStorage'
import { useDailyActivityMutation } from '../../services/dataApi'
import { getToken } from '../../services/asyncStorage'
import { store } from '../../features/redux/store'
 
import { useTranslation } from 'react-i18next';
const Language = () => {
    const {t, i18n} = useTranslation();
    const user = store.getState().user
    const [value, setValue] = useState('eng');
    const navigation  = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        i18n.changeLanguage(value);
      }, [value]);
    const languages = [["GB", "english",], ["FR", "french"], ["DE", "german"],["id", "indonesian"],
["jp", "japanese"], ["my", "malay"], ["ch", "mandrain"],["br", "portugese"], 
["ru", "russian"], ["ar", "spanish"],
 ["tr", "turkish"], ["BG", "bengali"],  ["pk", "urdu"],  ["IND", "hindi"], ["IND", "marathi"]
 ["IND", "telugu"], ["IND", "gujarati"], 
 ["IND", "tamil"] , ["IND", "punjabi"]]
const [selectedlanguage, setSelectLanguage] = useState(["GB", "english"])
const [dailyActivityApi] = useDailyActivityMutation()
 
 

const onSelectLang = async()=>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const tok = await getToken()
    const dailyActivityData = await dailyActivityApi({"token":tok.access, "todayDate":date})
    navigation.navigate('Home', {activityData:dailyActivityData.data})
}

 


const getLang = async()=>{
const lang = await getLanguage()
console.log(lang)
if (lang!=undefined){
    const flag = languages.find(item => item[1] === lang);
    setSelectLanguage(flag)
}
 

}

useEffect(()=>{
getLang()
}, [])
let fLCapital = s => s.replace(/./, c => c.toUpperCase())

const StoreLanguageAsync = async(response) =>{
    await(storeLanguage(response))
    dispatch(setLanguage(response))
}
  return (
    <ImageBackground source={require('../../assets/flower-bg.png')} className = "h-full justify-center items-center">
         <View className = "h-full w-full justify-center items-center p-10">
            <View className = "  w-full h-32 p-6 rounded-lg bg-white  "   style = {{elevation:5,
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 4,
          shadowOffset: {
              height: 1,
              width: 1
          }}}>
            <Text>{t('namespace.chooseYourLanguage')}</Text>
            <View>
            <SelectDropdown
                        data={languages}
                        onSelect={(selectedItem, index) => {    
                            setSelectLanguage(selectedItem);
                            setValue(selectedItem[1])
                            StoreLanguageAsync(selectedItem[1])
                            if (user.isLoggedIn){
                                onSelectLang()
                            }else{
                                console.log("user is not loged in")
                                navigation.navigate('Home', {"num_days_with_more_than_5_sentences":0, "todayActivityCount":0})
                            }
                            
                        }}
                        buttonStyle={styles.dropdown3BtnStyle}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            return (
                                <View className = "flex-row items-center justify-between px-4 py-2" style = {{elevation:4,
                                    shadowColor: "#000000",
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    shadowOffset: {
                                        height: 1,
                                        width: 1
                                    }}}>
                                    <View  className = "flex-row w-78 items-center space-x-4">
                                        {selectedItem ? (
                                            // <Icon name={selectedItem[0]} height="40" width="25" style={{ marginLeft: 15 }} />
                                            <CountryFlag isoCode={selectedItem[0]} size={25} className = "rounded-full h-6 w-6" />
                                        ) : (
                                            <CountryFlag isoCode={selectedlanguage[0]} size={25} className = "h-6 w-6 rounded-full"/>
                                        )}
                                        <Text   className = " text-lg text-transform: capitalize">{selectedItem ? selectedItem[1] :fLCapital(selectedlanguage[1])}</Text>
                                    </View>
                                    <FontAwesome name="chevron-down" color={'#444'} size={12} />
                                </View>
                            );
                        }}
                        dropdownStyle={{ borderRadius:5}}
                       
                        renderCustomizedRowChild={(item, selectedItem, defaultValue, index) => {
                            return (
                                <View className = "flex-row items-center justify-between px-4 py-6">
                                    <View  className = "flex-row w-32 items-center space-x-4">
                                        <CountryFlag isoCode={item[0]} size={25} className = "h-6 w-6 rounded-full"/>
                                        <Text className = "text-lg">{fLCapital(item[1])}</Text>
                                    </View>
                                    <View> 
                                        {item[1] === selectedlanguage[1] ?
                                            (
                                                <FontAwesome5 name="dot-circle" size={13} color="#193687" />
                                            ) :
                                            (
                                                <FontAwesome5 name="circle" size={13} color="#193687" />
                                            )
                                        }
                                    </View>
                                </View>
                            );
                        }}
                    />
            </View>
            </View>
         </View>
    </ImageBackground>
  )
}

export default Language

const styles = StyleSheet.create({

  btnView:{
      height:'13%',   
      marginTop:40,
       alignItems:'center'
  },
  btnTxt:{
      color:'white',
        fontSize:12},
  
  submitTouchable:{
      alignItems:'center',
      justifyContent:'center',
       backgroundColor:'#A044FF', 
       height:'100%',
       width:'80%',    
       borderRadius: 10, 
  },
  
      backgroundImage: {
          width: '100%',
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
      },
      container: {
          marginTop: 20,
          flexDirection: 'row',
          backgroundColor: 'white',
          
          elevation:5,
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 4,
          shadowOffset: {
              height: 1,
              width: 1
          }
      },
      dropdown3RowChildStyle: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 18,
      },
      dropdownRowImage: { width: 40, height: 40, resizeMode: 'cover' },
      dropdown3RowTxt: {
          color: '#1B1E23',
          textAlign: 'center',
          marginTop: 10,
          marginHorizontal: 12,
      },
      dropdown3BtnChildStyle: {
          width: '100%',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
  
      },
      dropdown3BtnStyle: {
          width: '100%',
          justifyContent:'center',
          alignItems:'center',
          height: '100%',
          backgroundColor: 'white',
          paddingHorizontal: 0,
  
      },
      dropdown3BtnTxt: {
          marginLeft: 15,
          marginTop: 9,
          color: '#767676',
          textAlign: 'center',
  
      },
      dropdown3RowStyle: {
          backgroundColor: 'white',
          borderBottomColor: 'white',
 
      },
      dropdown1BtnStyle: {
          width: '100%',
          backgroundColor:'white',
          borderColor: 'white',
          height: "100%",
          elevation:5,
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 4,
          shadowOffset: {
              height: 1,
              width: 1
          },
          
  
        },
        FullView:{
          width: '100%',
          backgroundColor:'white',
          borderColor: 'white',
          height: "12%",
          elevation:5,
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 4,
          shadowOffset: {
              height: 1,
              width: 1
          },
          
          marginTop:15,
        },
        dropdown1BtnTxtStyle: {color: '#767676', fontSize:15, position: 'absolute', right: 15 },
        dropdown1searchInputStyleStyle: {
          backgroundColor: 'white',
   
        },
        dropdown1RowStyle: {backgroundColor: 'white', borderBottomColor: 'white', height:35},
        
        dropdown1RowTxtStyle: {color: '#767676',  fontSize:11},
      
  })