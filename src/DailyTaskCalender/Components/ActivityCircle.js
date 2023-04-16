import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

const ActivityCircle = ({value}) => {
  return (
    <View className = "h-2/3 items-center p-10 space-y-5  ">
    
     
    <CircularProgress
  value={value>5?5:value}
  strokeLinecap = {'round'}
  radius={100}
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
  inActiveStrokeWidth={45}
  activeStrokeWidth={17}
  progressValueStyle={{ fontWeight: '50'}}
/>
{value>5?<Text>Hurray! You Learnt {value} duas</Text>:
<Text>You Learnt {value} out of 5 duas</Text>
}

    </View>
  )
}

export default ActivityCircle