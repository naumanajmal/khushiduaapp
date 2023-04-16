
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './features/redux/store';
import { Provider } from "react-redux";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AppRoute from './AppRoute';

const Stack = createNativeStackNavigator();

export default function App() {

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#193687' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 11,
          
          color:'green'
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 11,
           
          color:'red'
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    )}
  return (
    <>
    <Provider store={store}>
   <AppRoute/>
    <Toast config={toastConfig} />
    </Provider>
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
