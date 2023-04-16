import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRegisterUserMutation } from '../../services/dataApi';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import { useLoginUserMutation } from '../../services/dataApi';
import { useUserInformationMutation } from '../../services/dataApi';
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../features/redux/userSlice';
import { storeToken } from '../../services/asyncStorage';
import { setUserInfo } from '../../features/redux/userSlice';
// import Toast from 'react-native-simple-toast';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation()
    const [LoginUser] = useLoginUserMutation()
    const [userInformationApi] = useUserInformationMutation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')


    const formSubmit = async() => {
        const formData = { name, email, password, re_password }
        setIsLoading(true)
        const res = await registerUser(formData)
        if (res.data) {
          Toast.show({
              type: 'success',
              text1: "Registered Successfuly",
            });
            const formData1 = { email, password }
            console.log(formData1)
            const res1  = await LoginUser(formData1);
            console.log(res1)
            dispatch(setSignIn())
            await storeToken(res1.data);
            const userInfo = await userInformationApi({token:res1.data.access})
            console.log(userInfo)
            dispatch(setUserInfo({email:userInfo.data[0].email,
              premium:userInfo.data[0].has_purchased,
              name:userInfo.data[0].name,
             }))
             setIsLoading(false)
             navigation.navigate("Home", {activityData:{num_days_with_more_than_5_sentences:0,todayActivityCount:0}});

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
          // And I can pass any custom props I want
          text1: errormessage,
        });
    }}
  return (
    <SafeAreaView className = "pt-10 space-y-2">
      <View className = "bg-brightOrange h-16 justify-center items-center">
        <Text className = "text-white font-bold  text-lg">Create An Account</Text>
      </View>
      <View className = "p-6 px-10 space-y-4">
        <View className = "  space-y-2">
            <Text className = "font-bold text-lg px-4">Name</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder='Enter Name' onChangeText={(text) => { setName(text) }}></TextInput>
            </View>
        </View>
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
        </View>
        <View className = "  space-y-2">
            <Text className = "font-bold text-lg px-4">Confirm Password</Text>
            <View className = "border border-middleGray rounded-full p-2 px-4">
                <TextInput className = "" placeholder='Enter Password' secureTextEntry =  {true} onChangeText={(text) => { setRePassword(text) }}></TextInput>
            </View>
        </View>
    
        <TouchableOpacity className = "bg-brightOrange justify-center items-center h-12 rounded-full " onPress={() => { formSubmit()} }>
        {isLoading==true? <ActivityIndicator size="large" color="white" />:
<Text className  = "text-white text-lg font-bold">Create an account</Text>}
        </TouchableOpacity>
       
      </View>
      <View className = "space-y-5">
      <TouchableOpacity onPress={() => { navigation.navigate('Login')}}>
        <Text className = "text-center font-bold">Already Have An Account?</Text>
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

export default Register