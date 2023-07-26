import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './navigation/DrawerNavigator';
import PostScreen from './screens/postScreen';
import Login from './screens/loginScreen';
import Register from './screens/register';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="Dashboard" component={DrawerNav} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
