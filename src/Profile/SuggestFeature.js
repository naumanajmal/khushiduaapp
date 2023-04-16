import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import Checkbox from "expo-checkbox";
import { useSubmitSuggestionMutation } from '../../services/dataApi';
import { getToken } from '../../services/asyncStorage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SuggestFeature = () => {
    const [isChecked, setChecked] = useState(false);
    const [secChecked, setSecChecked] = useState(false);
    const [thirdCheck, setThirdCheck] = useState(false);
    const [forthCheck, setForthCheck] = useState(false);
    const [fifthCheck, setFifthCheck] = useState(false);
    const [Description, setDesciption] = useState("");
    const [submitSuggestionApi] = useSubmitSuggestionMutation();
    const navigation = useNavigation()

    const {t, i18n} = useTranslation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: t('namespace.suggestion')
        })
      },[]);

    const submitPressHandle = async ()=>{
        if (Description==""){
          Toast.show({
            type: 'error',
            // And I can pass any custom props I want
            text1: "Please type your suggestions",
          });
        }else{
          const tok = await getToken();
    
          const res = await submitSuggestionApi({"token":tok.access, "type":"general", "description":Description});
          setDesciption("")
          Toast.show({
            type: 'success',
            text1: "Suggestions submitted successfuly",
          });  
          navigation.goBack()
    
        }
      }
  return (
    <View className = "p-8 bg-white h-full space-y-6">
      <Text className = "font-bold text-md">{t('namespace.selectFeedback')}</Text>
      <View className = "space-y-4">
  
          <TouchableOpacity onPress={() => setChecked(!isChecked)} className = "items-center  flex-row   space-x-4">
            <Checkbox
               className = "border-2   h-4 w-4"
 
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked == true ? "#193687" : "#F4F4F4"}
            />
             <Text className = "">{t('namespace.readingProblem')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSecChecked(!secChecked)} className = "items-center  flex-row   space-x-4">
            <Checkbox
               className = "border-2   h-4 w-4"
 
               value={secChecked}
               onValueChange={setSecChecked}
              color={secChecked == true ? "#193687" : "#F4F4F4"}
            />
             <Text className = "">{t('namespace.overallService')}</Text>
          </TouchableOpacity>

           <TouchableOpacity onPress={() => setThirdCheck(!thirdCheck)} className = "items-center  flex-row   space-x-4">
            <Checkbox
               className = "border-2   h-4 w-4"
 
               value={thirdCheck}
               onValueChange={setThirdCheck}
              color={thirdCheck == true ? "#193687" : "#F4F4F4"}
            />
             <Text className = "">{t('namespace.qualityRelated')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setForthCheck(!forthCheck)} className = "items-center  flex-row   space-x-4">
            <Checkbox
               className = "border-2   h-4 w-4"
 
               value={forthCheck}
               onValueChange={setForthCheck}
              color={forthCheck == true ? "#193687" : "#F4F4F4"}
            />
             <Text className = "">{t('namespace.appCrash')}</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => setFifthCheck(!fifthCheck)} className = "items-center  flex-row   space-x-4">
            <Checkbox
               className = "border-2   h-4 w-4"
 
               value={fifthCheck}
               onValueChange={setFifthCheck}
              color={fifthCheck == true ? "#193687" : "#F4F4F4"}
            />
             <Text className = "">{t('namespace.otherIssues')}</Text>
          </TouchableOpacity>
      </View>
      <TextInput
      style = {{ textAlignVertical:'top'}}
      className = "bg-gray-200 p-2 "
          placeholder={t('namespace.typeSuggestions')}
          placeholderTextColor={"#B1B1B1"}
          numberOfLines={12}
          multiline={true}
          onChangeText={(text) => { setDesciption(text) }}
        />
        <View className = "flex-row space-x-8 justify-end">
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Text className = "text-middleGray">{t('namespace.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{submitPressHandle()}}>
                <Text className = "text-brightOrange" >{t('namespace.submit')}</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default SuggestFeature