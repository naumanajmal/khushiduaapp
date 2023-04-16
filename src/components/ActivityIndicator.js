import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { store } from '../../features/redux/store';
import { getLocationCoordinates } from './Coordinates2';
import {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    SunnahTimes,
    Prayer,
    Qibla,
  } from 'adhan';
  import moment from 'moment-timezone';
import '../../locals/index';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
const ActivityIndicator = ({todayActivity}) => {
  const {t, i18n} = useTranslation();
  const [Namaz, setNamaz] = useState({})
  const [showNamaz, setShowNamaz] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('eng');
  const [items, setItems] = useState([
    {label: 'English', value: 'eng'},
    {label: 'Bengali', value: 'bengali'},
    {label: 'Gujrati', value: 'gujrati'},
  ]);

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);
  useEffect(()=>{

    getLocationCoordinates()
    .then((location) => {
      // console.log(`Latitude: ${location.latitude}`);
      // console.log(`Longitude: ${location.longitude}`);
      // console.log(`Timestamp: ${location.timestamp}`);
      const coordinates = new Coordinates(25.299937, 55.379453);
      const params = CalculationMethod.MoonsightingCommittee();
      const date = new Date();
      const prayerTimes = new PrayerTimes(coordinates, date, params);
     
      const timezone = moment.tz.guess();
      console.log(moment(prayerTimes.isha).tz(timezone).format('h:mm A'))
      var current = prayerTimes.currentPrayer();
      var next = prayerTimes.nextPrayer();
      console.log("current")
    console.log(current)
    console.log("next")
    if (current=="none"){
      setNamaz({namaz:next, time:moment(prayerTimes[next]).tz(timezone).format('h:mm A')})
    }else{
      setNamaz({namaz:current, next:moment(prayerTimes[current]).tz(timezone).format('h:mm A')})
    }
    console.log(Namaz)
    setShowNamaz(true)
 
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
    
  },[])
  
// const coordinates = new Coordinates(25.296896, 55.368090);
// const params = CalculationMethod.MoonsightingCommittee();
// const date = new Date();
// const prayerTimes = new PrayerTimes(coordinates, date, params);
// const sunnahTimes = new SunnahTimes(prayerTimes)
// console.log(moment(prayerTimes.isha).format('h:mm A'))
// console.log(prayerTimes)
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation()
    const user = store.getState().user
  return (
    <View className = " space-y-1">
      <View>
        <Text className = "font-bold text-lg px-4">{t('namespace.activity')}</Text>
        {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      /> */}
        </View>
             <ImageBackground source={require('../../assets/images/activity-background.png')} className="h-32 w-full flex-row justify-between  ">
                <View className="flex-column  justify-between p-3">
                    {user.isLoggedIn==true?

                    <View>
                    <Text className="font-bold text-xs text-brightOrange">{t('namespace.dailyTasks')}</Text>
                    <Text className="font-bold text-sm">{todayActivity}/5</Text>
                    </View>:
                    <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                    <Text className="font-bold text-xs text-brightOrange">Log In</Text>
                    <Text className="font-bold text-sm">To see your daily activity</Text>
                    </TouchableOpacity>
                    }
                     {showNamaz?<View>
                     <Text className="font-bold text-xs text-brightOrange  ">{t(`namespace.${Object.values(Namaz)[0]}`)} </Text>
                         <Text className="font-bold text-sm ">{Object.values(Namaz)[1]}</Text>
                     </View>:<></>}
                </View>
                <View className = "mx-3 my-2">
                    <TouchableOpacity onPress={()=>{{user.premium==true?navigation.navigate("Summary"):navigation.navigate("Premium")}}}>
                <CircularProgress
  value={todayActivity>5?5:todayActivity}
  strokeLinecap = {'round'}
  radius={55}
  maxValue={5}
  duration={1000}
  progressValueColor={'black'}
  activeStrokeColor={'#FFFFFF'}
  activeStrokeSecondaryColor={'#D9D9D9'}
  inActiveStrokeColor={'#193687'}
  titleColor = {'#C25AFF'}
  showProgressValue = {false}
  titleStyle = {{ fontWeight: 'bold', color: 'black' }}
  inActiveStrokeOpacity={0.8}
  inActiveStrokeWidth={25}
  activeStrokeWidth={10}
  progressValueStyle={{ fontWeight: '50'}}
/>
</TouchableOpacity>
                </View>
 
            </ImageBackground>
 
        </View>
  )
}

export default ActivityIndicator