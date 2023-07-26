import React,{Component} from 'react';
import {Text,View} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import TabNav from './TabNavigator';
import PostScreen from '../screens/postScreen';
const Stack = createStackNavigator();
export default class StackNav extends Component{
    render(){
        return(
           <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Home'>
           <Stack.Screen name='Home' component={TabNav}/>
           <Stack.Screen name='PostScreen' component={PostScreen}/>
           </Stack.Navigator>
        )
    }
} 