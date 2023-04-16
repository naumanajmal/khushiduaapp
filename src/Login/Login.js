import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Touchable, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLoginUserMutation } from '../../services/dataApi';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { storeToken } from '../../services/asyncStorage';
import {useDispatch} from 'react-redux';
import { setSignIn } from '../../features/redux/userSlice';
import { useDailyActivityMutation } from '../../services/dataApi';
import { useUserInformationMutation } from '../../services/dataApi';
import { setUserInfo } from '../../features/redux/userSlice';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [LoginUser] = useLoginUserMutation()
  const navigation= useNavigation()
  const [dailyActivityApi] = useDailyActivityMutation()
  const [userInformationApi] = useUserInformationMutation()
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formSubmit = async () => {
    
      const formData = { email, password }
      setIsLoading(true)
      const res  = await LoginUser(formData);
      

 
      if (res.data) {
          Toast.show({
              type: 'success',
              text1: "Logged In Successfuly",
            });     
            dispatch(setSignIn())
            await storeToken(res.data);
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const dailyActivityData = await dailyActivityApi({"token":res.data.access, "todayDate":date})
            const userInfo = await userInformationApi({token:res.data.access})
            dispatch(setUserInfo({email:userInfo.data[0].email,
              premium:userInfo.data[0].has_purchased,
              name:userInfo.data[0].name,
             }))
            setIsLoading(false)
            navigation.navigate("Home", {activityData:dailyActivityData.data});
      }
      if (res.error) {
        setIsLoading(false)
        if (res.error.data[Object.keys(res.error.data)[0]][0].includes("blank")) {
          var errormessage = "Please fill all required fields"
        }
        else {
          var errormessage = res.error.data[Object.keys(res.error.data)[0]]   //res.error.data[Object.keys(res.error.data)[0]][0]
        }
        Toast.show({
          type: 'error',
          text1: errormessage,
        });
    }}
 
  return (
    <SafeAreaView className = "pt-10 space-y-2">
      <View className = "bg-brightOrange h-16 justify-center items-center">
        <Text className = "text-white font-bold  text-lg">Login</Text>
      </View>
      <View className = "p-6 px-10 space-y-4">
      
        <View className = "  space-y-2">
            <Text className = "font-bold text-lg px-4">Email</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder='Enter email' onChangeText={(text) => { setEmail(text) }}></TextInput>
            </View>
        </View>

        <View className = "space-y-2">
            <Text className = "font-bold text-lg px-4">Password</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder='Enter Password' secureTextEntry =  {true} onChangeText={(text) => { setPassword(text) }}></TextInput>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('ForgetPassword')}}>
            <Text className = "text-right px-4">Forget Password?</Text>
            </TouchableOpacity>
        </View>
        
    
        <TouchableOpacity className = "bg-brightOrange justify-center items-center h-12 rounded-full " onPress={() => { formSubmit() }}>
        {isLoading==true? <ActivityIndicator size="large" color="white" />:<Text className  = "text-white text-lg font-bold">Log in</Text>}
        </TouchableOpacity>
       
      </View>
      <View className = "space-y-5">
      <TouchableOpacity onPress={() => { navigation.navigate('Register')}}>
        <Text className = "text-center font-bold">Need To Create An Account?</Text>
        </TouchableOpacity>
        <View className = "flex-row justify-center items-center space-x-6">
        <View className = "h-px bg-brightOrange w-32"></View>
        <Text className = "font-bold">OR</Text>
        <View className = "h-px bg-brightOrange w-32"></View>
        </View>
        <View className = "flex-row justify-center  items-center space-x-8 ">
       <TouchableOpacity><AntDesign name="google" size={32} color="#193687" /></TouchableOpacity>
       <TouchableOpacity><AntDesign name="apple1" size={32} color="#193687" /></TouchableOpacity>
      </View>
      </View>

       

    </SafeAreaView>
  )
}

export default Login