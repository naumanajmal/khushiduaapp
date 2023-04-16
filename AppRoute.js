
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DuaIllustration from './src/DuaScreen/DuaIllustration';
import Dua from './src/DuaFullScreen/Dua';
import DuaList from './src/DuaScreen/DuaList';
import Profile from './src/Profile/Profile';
import ProfileSettings from './src/Profile/ProfileSettings';
import PrayerTime from './src/PrayerTime/PrayerTime';
import Premium from './src/Premium/Premium';
import Language from './src/Language/Language';
import Register from './src/Register/Register';
import Login from './src/Login/Login';
import ForgetPassword from './src/ForgetPassword/ForgetPassword';
import Splash from './src/Splash/Splash';
import DailyTaskcalender from './src/DailyTaskCalender/DailyTaskcalender';
import AwardsPage from './src/awards/AwardsPage';
import CheckOut from './src/Premium/CheckOut';
import Memorization from './src/Memorization/Memorization';
import ChangePassword from './src/Profile/ChangePassword';
import ChangeName from './src/Profile/ChangeName';
import SuggestFeature from './src/Profile/SuggestFeature';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <>
    <NavigationContainer>
       <Stack.Navigator>
       <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
       <Stack.Screen name="Suggestion" component={SuggestFeature}  />
       <Stack.Screen name="Premium" component={Premium} options={{headerShown: false}} />
       <Stack.Screen name="New Name" component={ChangeName} />
       <Stack.Screen name="New Password" component={ChangePassword}  />
       <Stack.Screen name="CheckOut" component={CheckOut} />
       <Stack.Screen name="Profile" component={Profile}/>
       <Stack.Screen name="Memorization" component={Memorization}  />
       <Stack.Screen name="Summary" component={DailyTaskcalender} />
       <Stack.Screen name="Awards" component={AwardsPage}  /> 
       <Stack.Screen name="Language" component={Language} options={{headerShown: false}} />
       <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
       <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
       <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown: false}} />
       <Stack.Screen name="Prayer time" component={PrayerTime} />
       <Stack.Screen name="Profile Settings" component={ProfileSettings} />
       <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
       <Stack.Screen name="DuaList" component={DuaList}/>
       <Stack.Screen name="Dua" component={Dua} options={{headerShown: false}}/>
       <Stack.Screen name="DuaIllustration" component={DuaIllustration} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
