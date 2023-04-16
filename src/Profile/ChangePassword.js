import { View, Text, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import { useSetPasswordMutation } from '../../services/dataApi';
import { getToken } from '../../services/asyncStorage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useTranslation } from 'react-i18next';


const ChangePassword = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [current_password, setCurrentPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [re_new_password, setConfirmPassword] = useState('')
    const [setPasswordApi] = useSetPasswordMutation()
    const {t, i18n} = useTranslation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: t('namespace.newPassword')
        })
      },[]);
    const formSubmit = async () => {
        const tok = await getToken()
        const token = tok.access
        const formData = { current_password, new_password, re_new_password, token}
        setIsLoading(true)
        const response = await setPasswordApi(formData)
        console.log(response)
        setIsLoading(false)
        if (response.data) {
            Toast.show({
                type: 'success',
                text1: t('namespace.passwordUpdated'),
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
        Toast.show({
            type: 'success',
            text1: t('namespace.passwordUpdated'),
          });   
      }}

  return (
    <SafeAreaView className = "pt-20 space-y-4 px-4">
     <View className = "space-y-2">
            <Text className = "font-bold text-lg px-4">{t('namespace.currentPassword')}</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder={t('namespace.enterPassword')} secureTextEntry =  {true} onChangeText={(text) => { setCurrentPassword(text)}}></TextInput>
            </View>
             
        </View>
        <View className = "space-y-2">
            <Text className = "font-bold text-lg px-4">{t('namespace.newPassword')}</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder={t('namespace.enterPassword')} secureTextEntry =  {true} onChangeText={(text) => { setNewPassword(text)}}></TextInput>
            </View>
        </View>
        <View className = "space-y-2">
            <Text className = "font-bold text-lg px-4">{t('namespace.confirmPassword')}</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder={t('namespace.enterPassword')} secureTextEntry =  {true} onChangeText={(text) => {setConfirmPassword(text) }}></TextInput>
            </View>
        </View>
        <TouchableOpacity className = "bg-brightOrange justify-center items-center h-12 rounded-full " onPress={() => {formSubmit()}}>
        {isLoading==true? <ActivityIndicator size="large" color="white" />:<Text className  = "text-white text-lg font-bold">{t('namespace.update')}</Text>}
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ChangePassword