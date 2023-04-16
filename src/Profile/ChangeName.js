import { View, Text, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import { useUpdateUserNameMutation } from '../../services/dataApi';
import { getToken } from '../../services/asyncStorage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../features/redux/userSlice';
import { useTranslation } from 'react-i18next';



const ChangeName = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [updateNameApi] = useUpdateUserNameMutation()
    const {t, i18n} = useTranslation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: t('namespace.newName')
        })
      },[]);
    const formSubmit = async () => {
        const tok = await getToken()
        const token = tok.access
        const formData = { name, token}
        setIsLoading(true)
        const response = await updateNameApi(formData)
        setIsLoading(false)
        if (response.data) {
            Toast.show({
                type: 'success',
                text1: t('namespace.nameUpdated'),
              });     
        }
        if (response.error) {
          setIsLoading(false)
          if (response.error.data[Object.keys(response.error.data)[0]][0].includes("blank")) {
            var errormessage = t('namespace.fillAllFields')
          }
          else {
            var errormessage = response.error.data[Object.keys(response.error.data)[0]]   //res.error.data[Object.keys(res.error.data)[0]][0]
          }
          Toast.show({
            type: 'error',
            text1: errormessage,
          });
      }else {
         dispatch(setUserName({name:name}))
        Toast.show({
            type: 'success',
            text1: "Name Updated Successfully",
          });   
      }}
    

  return (
    <SafeAreaView className = "pt-20 space-y-4 px-4">
     <View className = "space-y-2">
            <Text className = "font-bold text-lg px-4">{t('namespace.newName')}</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder={t('namespace.newName')}  onChangeText={(text) => { setName(text)}}></TextInput>
            </View>
             
        </View>
        <TouchableOpacity className = "bg-brightOrange justify-center items-center h-12 rounded-full " onPress={() => {formSubmit()}}>
        {isLoading==true? <ActivityIndicator size="large" color="white" />:<Text className  = "text-white text-lg font-bold">{t('namespace.update')}</Text>}
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ChangeName