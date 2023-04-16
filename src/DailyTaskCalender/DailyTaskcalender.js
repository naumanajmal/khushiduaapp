import { View, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Agenda } from "react-native-calendars";
import CoinsPage from './Components/CoinsPage';
import { useListenedDataMutation } from '../../services/dataApi';
import { getToken } from '../../services/asyncStorage';
import ActivityCircle from './Components/ActivityCircle';


const DailyTaskcalender = () => {
  const [ListenedDataApi] = useListenedDataMutation()
  const [DailyTaskCompleted, setDailyTaskCompleted] = useState()
  const [dailyCoins, setDailyCoins] = useState()
  const [calenderData, setCalenderData] = useState({})
  const [showActivityIndicator, setShowActivityIndicator] = useState(true)
  const todayDAate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0]
 const getListenedData = async()=>{
  const tok = await getToken()
  
  const response = await ListenedDataApi({"todayDate":todayDAate, token:tok.access
  });
  console.log(response.data[todayDAate])

  if (response.data[todayDAate])
  {
    setDailyTaskCompleted(response.data[todayDAate][0].total_sentences) 
    setDailyCoins(response.data[todayDAate][0].total_reward_coins) 
  }else{

    setDailyTaskCompleted(0)
    setDailyCoins(0)
  }
  setCalenderData(response.data)
  setShowActivityIndicator(false)
 }
  useEffect(()=>{
getListenedData()
    },[])
  return (
 
    <View className="h-full flex-column">
      {showActivityIndicator?  <View className="h-full items-center justify-center"><ActivityIndicator size="large" color="#243763"></ActivityIndicator></View>:
      
      <>

        <View style = {{height:110}} >
      <Agenda
  items={calenderData}
  loadItemsForMonth={month => {
  }}
  onCalendarToggled={calendarOpened => {
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    {calenderData[day.dateString]?setDailyTaskCompleted(calenderData[day.dateString][0].total_sentences):setDailyTaskCompleted(0)}
    {calenderData[day.dateString]?setDailyCoins(calenderData[day.dateString][0].total_reward_coins):setDailyCoins(0)}
  }} 
  onDayChange={day => {
  }}
  selected={todayDAate}
  renderEmptyData={() => {
    return <View className = "bg-red-500" />;
  }}
  renderDay={(day, item) => {
    return <View className = "bg-red-500 "/>;
  }}

  minDate={'2012-05-10'}
  maxDate={'2023-05-11'}
  pastScrollRange={1}
  futureScrollRange={1}
  renderKnob={() => {
    return <View />;
  }}
  markedDates={{
    '2012-05-16': {selected: true, marked: true},
    '2012-05-17': {marked: true},
    '2012-05-18': {disabled: true}
  }}
  disabledByDefault={true}
  theme={{
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    todayTextColor: '#193687',
    agendaKnobColor: 'red',
    selectedDayBackgroundColor:'#193687',
  }}
/>
</View>
<View className = "p-2">
    <View className = " ">  
<ActivityCircle value = {DailyTaskCompleted}/>
<CoinsPage coins = {dailyCoins}/>
    </View>

</View>
</> }
    </View> 
  )
}

export default DailyTaskcalender